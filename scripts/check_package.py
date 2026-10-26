"""Validate local reference links and portable package hygiene, without writes."""
from __future__ import annotations
import argparse
import json
from pathlib import Path
import re
from html.parser import HTMLParser
from urllib.parse import unquote, urlsplit


def inspect(root: Path) -> dict:
    root = root.resolve()
    errors = []
    checked = 0
    files = [p for p in root.rglob("*") if p.is_file() and "__pycache__" not in p.parts]
    required = ["SKILL.md", "agents/openai.yaml", "references/sources-and-reuse.md",
                "scripts/start_project.py", "scripts/audit_page.js", "assets/workbench/index.html"]
    for relative in required:
        if not (root / relative).is_file():
            errors.append(f"Missing required file: {relative}")
    for path in files:
        if path.suffix not in {".md", ".html", ".yaml", ".js", ".py", ".json", ".css"}:
            continue
        text = path.read_text(encoding="utf-8")
        if path.suffix == ".md":
            # Markdown links, not inline code or shell examples.
            for match in re.finditer(r"\[[^\]\n]*\]\(([^)]+)\)", text):
                target = match.group(1).strip().strip("<>")
                url = urlsplit(target)
                if url.scheme or target.startswith("#"):
                    continue
                linked = (path.parent / unquote(url.path)).resolve()
                checked += 1
                if not linked.is_relative_to(root):
                    errors.append(f"Link leaves package: {path.relative_to(root)} -> {target}")
                elif not linked.exists():
                    errors.append(f"Broken local link: {path.relative_to(root)} -> {target}")
        if path.suffix == ".html":
            class Resources(HTMLParser):
                def handle_starttag(self, tag, attrs):
                    nonlocal checked
                    for key, value in attrs:
                        if key not in {"src", "href"} or not value or value.startswith("#"):
                            continue
                        url = urlsplit(value)
                        if url.scheme or url.netloc:
                            continue
                        linked = (path.parent / unquote(url.path)).resolve()
                        checked += 1
                        if not linked.is_relative_to(root) or not linked.exists():
                            errors.append(f"Broken local HTML resource: {path.relative_to(root)} -> {value}")
            Resources().feed(text)
        if path.name in {".env", ".env.local"}:
            errors.append(f"Environment file in portable package: {path.relative_to(root)}")
    skill = root / "SKILL.md"
    if skill.is_file():
        text = skill.read_text(encoding="utf-8")
        lines = text.splitlines()
        if len(lines) > 500:
            errors.append(f"SKILL.md has {len(lines)} lines; keep it at or under 500 and move detail to references")
        meta = {}
        if lines and lines[0].strip() == "---" and "---" in (l.strip() for l in lines[1:]):
            end = next(i for i, l in enumerate(lines[1:], 1) if l.strip() == "---")
            key = None
            for line in lines[1:end]:
                m = re.match(r"([A-Za-z][\w-]*):\s*(.*)$", line)
                if m:
                    key = m.group(1)
                    meta[key] = m.group(2).strip()
                elif key and line.startswith((" ", "\t")):
                    meta[key] = (meta[key] + " " + line.strip()).strip()
            meta = {k: v.strip("'\"") if v not in {">", "|", ">-", "|-"} else "" for k, v in meta.items()}
        else:
            errors.append("SKILL.md lacks YAML frontmatter")
        if meta.get("name") != root.name:
            errors.append(f"Frontmatter name {meta.get('name')!r} must match folder {root.name!r}")
        description = meta.get("description", "")
        if not description or len(description) > 1024:
            errors.append(f"Frontmatter description must be 1-1024 characters (found {len(description)})")
        # Every reference document must be reachable from SKILL.md through Markdown links.
        seen, stack = set(), [skill.resolve()]
        while stack:
            current = stack.pop()
            if current in seen or not current.is_file():
                continue
            seen.add(current)
            for match in re.finditer(r"\[[^\]\n]*\]\(([^)]+)\)", current.read_text(encoding="utf-8")):
                target = urlsplit(match.group(1).strip().strip("<>"))
                if not target.scheme and target.path.endswith(".md"):
                    stack.append((current.parent / unquote(target.path)).resolve())
        for reference in sorted((root / "references").glob("*.md")):
            if reference.resolve() not in seen:
                errors.append(f"Orphan reference (not reachable from SKILL.md): references/{reference.name}")
    for path in files:
        if path.suffix == ".json" or path.name.endswith(".json.example"):
            try:
                json.loads(path.read_text(encoding="utf-8"))
            except ValueError as error:
                errors.append(f"Invalid JSON: {path.relative_to(root)} ({error})")
    warnings = [str(p.relative_to(root)) for p in root.rglob("__pycache__")]
    for path in files:
        if path.name in {".env", ".env.local"} or path.suffix in {".pem", ".key"}:
            errors.append(f"Credential-bearing file type: {path.relative_to(root)}")
    return {"root": str(root), "files": len(files), "local_links_checked": checked,
            "errors": errors, "warnings": [f"Bytecode cache in package: {w}" for w in warnings], "limits": ["Static hygiene check, not malware or secret certification",
                                         "Does not verify remote links or design behavior"]}


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("root", type=Path)
    args = parser.parse_args()
    result = inspect(args.root)
    print(json.dumps(result, indent=2))
    return 1 if result["errors"] else 0


if __name__ == "__main__":
    raise SystemExit(main())
