# CODE MAP / COMMENTING GUIDE
# File purpose: Portfoliosivuston saavutettavuuden ja HTML-rakenteen automaattiset testit.
# Read from top to bottom: settings and helper functions come first, followed by tests or checks.

import tempfile
import unittest
from pathlib import Path
from scripts.validate_site import ROOT, SiteParser, audit_page, discover_html_pages


class AccessibilityValidatorTests(unittest.TestCase):
    def parse(self, markup):
        parser = SiteParser()
        parser.feed(markup)
        parser.close()
        return parser

    def test_valid_semantic_page_passes(self):
        parser = self.parse(
            '<html lang="fi"><body>'
            '<a class="skip-link" href="#main">Siirry sisältöön</a>'
            '<main id="main"><h1>Otsikko</h1>'
            '<label for="search">Haku</label><input id="search">'
            '<button type="button">Avaa</button>'
            '<img src="sample.png" alt="Esimerkkikuva">'
            '<iframe src="sample.pdf" title="Esimerkkidokumentti"></iframe>'
            '</main></body></html>'
        )
        self.assertEqual(audit_page(ROOT / "fixture.html", parser), [])

    def test_missing_accessible_names_and_semantics_are_reported(self):
        parser = self.parse(
            '<html><body><a class="skip-link" href="#missing">Skip</a>'
            '<main><h1>Title</h1><h3>Skipped level</h3>'
            '<button></button><input id="query">'
            '<img src="sample.png"><iframe src="sample.pdf"></iframe>'
            '<div aria-controls="not-here"></div>'
            '</main></body></html>'
        )
        errors = audit_page(ROOT / "fixture.html", parser)
        joined = "\n".join(errors)
        for expected in (
            "lang attribute", "heading level jumps", "button has no accessible name",
            "has no programmatic label", "image is missing alt text",
            "iframe is missing a descriptive title", "aria-controls references missing id",
            "skip link does not target",
        ):
            self.assertIn(expected, joined)

    def test_nested_label_is_recognized_as_a_programmatic_label(self):
        parser = self.parse(
            '<html lang="en"><body><a class="skip-link" href="#main">Skip</a>'
            '<main id="main"><h1>Title</h1>'
            '<label>Search<input id="search"></label>'
            '</main></body></html>'
        )
        self.assertEqual(audit_page(ROOT / "fixture.html", parser), [])

    def test_noreferrer_is_valid_for_new_tab_links(self):
        parser = self.parse(
            '<html lang="en"><body><a class="skip-link" href="#main">Skip</a>'
            '<main id="main"><h1>Title</h1>'
            '<a href="https://example.com" target="_blank" rel="noreferrer">External</a>'
            '</main></body></html>'
        )
        self.assertEqual(audit_page(ROOT / "fixture.html", parser), [])

    def test_html_page_discovery_includes_public_subdirectories(self):
        with tempfile.TemporaryDirectory() as temporary_directory:
            root = Path(temporary_directory)
            expected = sorted([
                root / "index.html",
                root / "The-Cultured-Vault-demo" / "index.html",
            ])
            for page in expected:
                page.parent.mkdir(parents=True, exist_ok=True)
                page.write_text("<html></html>", encoding="utf-8")

            excluded = [
                root / ".github" / "example.html",
                root / "node_modules" / "package" / "example.html",
                root / "tests" / "fixture.html",
            ]
            for page in excluded:
                page.parent.mkdir(parents=True, exist_ok=True)
                page.write_text("<html></html>", encoding="utf-8")

            self.assertEqual(discover_html_pages(root), expected)


if __name__ == "__main__":
    unittest.main()

# CLASS SECTION END: AccessibilityValidatorTests. The next section starts at the next definition or at the end of the file.
