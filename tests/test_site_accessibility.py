import unittest
from scripts.validate_site import ROOT, SiteParser, audit_page


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
        joined = "\\n".join(errors)
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


if __name__ == "__main__":
    unittest.main()
