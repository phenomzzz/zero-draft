"""Create a project decision packet and optional local workbench, without overwrite."""
from __future__ import annotations

import argparse
import json
from pathlib import Path
import shutil
import sys

SKILL_ROOT = Path(__file__).resolve().parents[1]


def create_packet(destination: Path, name: str, workbench: bool = False) -> list[Path]:
    if not name.strip() or len(name) > 200 or any(ord(c) < 32 for c in name):
        raise ValueError("Name must be 1-200 printable characters")
    # Reject symlink components instead of silently redirecting writes elsewhere.
    destination = destination.absolute()
    if any(p.is_symlink() or (hasattr(p, "is_junction") and p.is_junction()) for p in (destination, *destination.parents)):
        raise ValueError("Destination must not traverse a symlink")
    if destination.exists() and not destination.is_dir():
        raise ValueError("Destination is not a directory")
    sources = [(p, Path(p.name)) for p in sorted((SKILL_ROOT / "assets/project-packet").glob("*.md"))]
    if workbench:
        sources.extend((p, Path("workbench") / p.relative_to(SKILL_ROOT / "assets/workbench"))
                       for p in sorted((SKILL_ROOT / "assets/workbench").rglob("*")) if p.is_file())
    # Preflight all files before writing; failures never replace existing work.
    occupied = [str(rel) for _, rel in sources if (destination / rel).exists()]
    if occupied:
        raise FileExistsError("Refusing to replace: " + ", ".join(occupied))
    if not sources:
        raise RuntimeError("Skill assets are missing")
    for _, rel in sources:
        target = destination / rel
        if any(p.is_symlink() or (hasattr(p, "is_junction") and p.is_junction()) for p in (target, *target.parents)):
            raise ValueError("Output must not traverse a symlink")
        if any(p.exists() and not p.is_dir() for p in target.parents):
            raise ValueError("An output parent is not a directory")
    destination.mkdir(parents=True, exist_ok=True)
    written = []
    for source, relative in sources:
        target = destination / relative
        target.parent.mkdir(parents=True, exist_ok=True)
        if relative == Path("brief.md"):
            content = source.read_text(encoding="utf-8").replace(
                "# Project brief and direction", "# " + name.strip() + " — brief and direction", 1)
            with target.open("x", encoding="utf-8", newline="\n") as output:
                output.write(content)
        else:
            with source.open("rb") as inp, target.open("xb") as output:
                shutil.copyfileobj(inp, output)
        written.append(target)
    return written


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--destination", required=True, type=Path)
    parser.add_argument("--name", required=True)
    parser.add_argument("--workbench", action="store_true")
    args = parser.parse_args()
    try:
        written = create_packet(args.destination, args.name, args.workbench)
    except (OSError, ValueError, RuntimeError) as error:
        print(str(error), file=sys.stderr)
        return 1
    print(json.dumps({"created": [str(p) for p in written], "server_started": False}, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
