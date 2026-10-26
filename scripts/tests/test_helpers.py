"""Behavioral tests for non-destructive scaffolding and broken-link detection."""
import importlib.util
import sys
from pathlib import Path
import tempfile
import unittest
import shutil
import subprocess

ROOT = Path(__file__).resolve().parents[1]
sys.dont_write_bytecode = True


def module(name):
    spec = importlib.util.spec_from_file_location(name, ROOT / (name + ".py"))
    result = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(result)
    return result


starter = module("start_project")
checker = module("check_package")


class PacketTests(unittest.TestCase):
    def test_packet_preserves_existing_files_and_has_no_server_side_effect(self):
        with tempfile.TemporaryDirectory() as tmp:
            dest = Path(tmp) / "packet"
            written = starter.create_packet(dest, "Clinic — care", False)
            self.assertEqual(len(written), 4)
            self.assertIn("Clinic — care", (dest / "brief.md").read_text(encoding="utf-8"))
            self.assertFalse((dest / "workbench").exists())
            (dest / "decisions.md").write_text("user-owned", encoding="utf-8")
            with self.assertRaises(FileExistsError):
                starter.create_packet(dest, "Different", True)
            self.assertEqual((dest / "decisions.md").read_text(encoding="utf-8"), "user-owned")
            self.assertFalse((dest / "workbench").exists())

    def test_optional_workbench_is_complete(self):
        with tempfile.TemporaryDirectory() as tmp:
            dest = Path(tmp) / "packet"
            starter.create_packet(dest, "Retail", True)
            for filename in ["index.html", "workbench.js", "workbench.css", "config.js", "demo.html"]:
                self.assertTrue((dest / "workbench" / filename).is_file())

    def test_bad_name_and_non_directory_fail(self):
        with tempfile.TemporaryDirectory() as tmp:
            with self.assertRaises(ValueError):
                starter.create_packet(Path(tmp) / "new", "\n", False)
            dest = Path(tmp) / "file"
            dest.write_text("keep", encoding="utf-8")
            with self.assertRaises(ValueError):
                starter.create_packet(dest, "Example", False)
            self.assertEqual(dest.read_text(encoding="utf-8"), "keep")

    def test_checker_finds_broken_and_escaping_links(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            (root / "SKILL.md").write_text("[bad](missing.md)\n[out](../outside.md)", encoding="utf-8")
            errors = checker.inspect(root)["errors"]
            self.assertTrue(any("Broken local link" in e for e in errors))
            self.assertTrue(any("leaves package" in e for e in errors))

    def test_checker_enforces_frontmatter_size_and_orphans(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp) / "demo-skill"
            (root / "references").mkdir(parents=True)
            (root / "SKILL.md").write_text("---\nname: other\ndescription: x\n---\n" + "line\n" * 501, encoding="utf-8")
            (root / "references" / "lonely.md").write_text("# Lonely", encoding="utf-8")
            (root / "bad.json").write_text("{", encoding="utf-8")
            errors = " | ".join(checker.inspect(root)["errors"])
            for expected in ["must match folder", "500", "Orphan reference", "Invalid JSON"]:
                self.assertIn(expected, errors)
            (root / "SKILL.md").write_text("---\nname: demo-skill\ndescription: Short.\n---\n[l](references/lonely.md)", encoding="utf-8")
            (root / "bad.json").unlink()
            errors = checker.inspect(root)["errors"]
            self.assertFalse([e for e in errors if "Orphan" in e or "Frontmatter" in e or "lines" in e], errors)

    def test_parent_file_conflict_is_detected_before_any_write(self):
        with tempfile.TemporaryDirectory() as tmp:
            dest = Path(tmp)
            (dest / "workbench").write_text("keep", encoding="utf-8")
            with self.assertRaises(ValueError):
                starter.create_packet(dest, "Example", True)
            self.assertFalse((dest / "brief.md").exists())
            self.assertEqual((dest / "workbench").read_text(encoding="utf-8"), "keep")


class BrowserHelperTests(unittest.TestCase):
    def test_browser_helper_fixtures(self):
        node = shutil.which("node")
        if not node:
            self.skipTest("Node unavailable; browser helper fixtures not executed")
        result = subprocess.run([node, str(ROOT / "tests/test_browser_helpers.cjs")], capture_output=True, text=True, timeout=20)
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)


if __name__ == "__main__":
    unittest.main()
