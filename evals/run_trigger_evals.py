"""Windows-safe trigger-eval runner for zero-draft (README part A).

No select(): each `claude -p` child is read line by line in its own worker thread, and a
watchdog kills the process tree on timeout. A run stops at the first Skill call, after
--max-tools non-ToolSearch tool calls (default 3), or at the CLI's result event.

The CLI login must be fresh: a desktop or nested session's auth is not inherited, and an
expired OAuth login fails every prompt. Desktop-app environment variables are stripped so
the child behaves like a plain terminal session. The CLI default model is recorded per run
and may differ from the model that builds sites.

Usage:
  python -I run_trigger_evals.py <trigger-evals.json> <out-dir>
      [--workers N] [--runs N] [--only i,j] [--max-tools N] [--model M] [--stub-for i,j]

--stub-for seeds those prompts' temp folders with a minimal static site (index.html,
styles.css, script.js), for prompts about an existing site; report stubbed and unstubbed
results separately.
"""
import hashlib
import json
import os
import pathlib
import shutil
import subprocess
import sys
import tempfile
import threading
import time
from concurrent.futures import ThreadPoolExecutor

SKILL = "zero-draft"
TIMEOUT_S = 180
DISALLOWED = ["Bash", "PowerShell", "Write", "Edit", "Agent"]
UNCOUNTED = {"ToolSearch"}  # loading deferred tool schemas is not a decision to skip the skill

# Desktop-app variables that would make the child behave like a nested app session.
STRIP_PREFIXES = ("CLAUDECODE", "CLAUDE_CODE_", "CLAUDE_AGENT_SDK", "CLAUDE_PREVIEW", "CLAUDE_PID", "CLAUDE_EFFORT", "MCP_")

STUB = {
    "index.html": '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n'
                  '<meta name="viewport" content="width=device-width, initial-scale=1">\n'
                  '<title>Site</title>\n<link rel="stylesheet" href="styles.css">\n</head>\n<body>\n'
                  '<header><nav><a href="/">Home</a> <a href="#about">About</a> <a href="#contact">Contact</a></nav></header>\n'
                  '<main><h1>Welcome</h1><p>Placeholder content.</p></main>\n'
                  '<footer>Contact</footer>\n<script src="script.js"></script>\n</body>\n</html>\n',
    "styles.css": "body { margin: 0; font-family: system-ui, sans-serif; }\n"
                  "nav a { padding: 8px 12px; }\nnav a:hover { border-bottom: 1px solid; }\n",
    "script.js": "document.documentElement.classList.add('js');\n",
}


def arg(name, default=None, cast=str):
    return cast(sys.argv[sys.argv.index(name) + 1]) if name in sys.argv else default


def child_env():
    return {k: v for k, v in os.environ.items() if not k.startswith(STRIP_PREFIXES)}


def kill_tree(proc):
    if proc.poll() is None:
        subprocess.run(["taskkill", "/PID", str(proc.pid), "/T", "/F"], capture_output=True)


def is_trigger(name, inp):
    if name == "Skill":
        # Match the skill field only: another skill's args may mention this one.
        name_field = str(inp.get("skill") or inp.get("command") or "")
        return name_field.split(":")[-1] == SKILL
    if name == "Read":
        p = str(inp.get("file_path", "")).replace("\\", "/").lower()
        return SKILL in p and p.endswith("skill.md")
    return False


def run_one(idx, item, run_no, claude, max_tools, model, stub):
    work = tempfile.mkdtemp(prefix=f"cwtrig{idx:02d}_")
    if stub:
        for name, text in STUB.items():
            pathlib.Path(work, name).write_text(text, encoding="utf-8")
    cmd = [claude, "-p", item["query"], "--output-format", "stream-json", "--verbose",
           "--no-session-persistence", "--strict-mcp-config", "--disallowedTools", *DISALLOWED]
    if model:
        cmd += ["--model", model]
    t0 = time.time()
    proc = subprocess.Popen(cmd, cwd=work, env=child_env(), stdin=subprocess.DEVNULL,
                            stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True,
                            encoding="utf-8", errors="replace")
    timer = threading.Timer(TIMEOUT_S, kill_tree, [proc])
    timer.start()
    stderr_buf = []
    threading.Thread(target=lambda: stderr_buf.append(proc.stderr.read()), daemon=True).start()

    rec = {"idx": idx, "run": run_no, "query": item["query"], "should_trigger": item["should_trigger"],
           "note": item.get("note", ""), "stub": stub, "triggered": False, "tool_calls": [], "model": None,
           "skills_listed": None, "first_text": "", "stop_reason": None}
    counted = 0
    try:
        for line in proc.stdout:
            line = line.strip()
            if not line.startswith("{"):
                continue
            try:
                ev = json.loads(line)
            except json.JSONDecodeError:
                continue
            if ev.get("type") == "system" and ev.get("subtype") == "init":
                rec["model"] = ev.get("model")
                skills = ev.get("skills") or ev.get("slash_commands") or []
                rec["skills_listed"] = SKILL in json.dumps(skills)
            elif ev.get("type") == "assistant":
                for c in ev.get("message", {}).get("content", []):
                    if c.get("type") == "text" and not rec["first_text"]:
                        rec["first_text"] = c.get("text", "")[:240]
                    if c.get("type") == "tool_use":
                        name, inp = c.get("name"), c.get("input", {})
                        rec["tool_calls"].append({"name": name, "input": json.dumps(inp, ensure_ascii=False)[:200]})
                        counted += name not in UNCOUNTED
                        if is_trigger(name, inp):
                            rec["triggered"] = True
                        if name == "Skill" or rec["triggered"]:
                            rec["stop_reason"] = "skill_call" if name == "Skill" else "skill_read"
                        elif counted >= max_tools:
                            rec["stop_reason"] = "max_tool_calls"
                if rec["stop_reason"]:
                    break
            elif ev.get("type") == "result":
                rec["stop_reason"] = rec["stop_reason"] or "result"
                rec["cost_usd"] = ev.get("total_cost_usd")
                break
    finally:
        timer.cancel()
        kill_tree(proc)
        try:
            proc.wait(timeout=10)
        except subprocess.TimeoutExpired:
            pass
        shutil.rmtree(work, ignore_errors=True)
    rec["seconds"] = round(time.time() - t0, 1)
    if not rec["stop_reason"]:
        rec["stop_reason"] = "timeout_or_exit"
        rec["stderr_tail"] = "".join(stderr_buf)[-400:]
    return rec


def main():
    src, out_dir = sys.argv[1], sys.argv[2]
    workers = arg("--workers", 4, int)
    runs = arg("--runs", 1, int)
    max_tools = arg("--max-tools", 3, int)
    model = arg("--model")
    stub_for = {int(x) for x in arg("--stub-for", "").split(",") if x}
    items = json.load(open(src, encoding="utf-8"))
    order = [int(x) for x in arg("--only").split(",")] if "--only" in sys.argv else list(range(len(items)))
    os.makedirs(out_dir, exist_ok=True)
    claude = shutil.which("claude")
    skill_md = pathlib.Path(__file__).resolve().parent.parent / "SKILL.md"
    meta = {"skill_md_sha256": hashlib.sha256(skill_md.read_bytes()).hexdigest() if skill_md.is_file() else None,
            "max_tools": max_tools, "uncounted": sorted(UNCOUNTED), "model_arg": model, "runs": runs,
            "stub_for": sorted(stub_for), "started": time.strftime("%Y-%m-%dT%H:%M:%S%z")}
    jobs = [(i, items[i], r) for r in range(runs) for i in order]
    results = []
    with ThreadPoolExecutor(max_workers=workers) as ex:
        futs = [ex.submit(run_one, i, it, r, claude, max_tools, model, i in stub_for) for i, it, r in jobs]
        for f in futs:
            rec = f.result()
            results.append(rec)
            print(f"[{rec['idx']:02d}] expect={rec['should_trigger']!s:5} got={rec['triggered']!s:5} "
                  f"{rec['stop_reason']:15} {rec['seconds']:6}s {rec['note']}", flush=True)
    results.sort(key=lambda r: (r["idx"], r["run"]))
    json.dump({"meta": meta, "results": results},
              open(os.path.join(out_dir, "trigger-results.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    pos = [r for r in results if r["should_trigger"]]
    neg = [r for r in results if not r["should_trigger"]]
    print(f"should-trigger fired: {sum(r['triggered'] for r in pos)}/{len(pos)}; "
          f"should-not fired: {sum(r['triggered'] for r in neg)}/{len(neg)}; models: {sorted({str(r['model']) for r in results})}")


if __name__ == "__main__":
    main()
