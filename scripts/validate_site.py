#!/usr/bin/env python3
"""Validate local references and baseline accessibility semantics in the static portfolio.

This is a lightweight source-level check, not a WCAG conformance checker.
Manual keyboard, screen-reader, zoom, responsive and contrast testing is still required.
"""

# KOMMENTOINTIOHJE / CODE MAP
# Tiedoston tarkoitus: Portfoliosivuston automaattinen rakenteen ja saavutettavuuden validointiskripti.
# Etene ylhäältä alas: asetukset ja apufunktiot ensin, testit tai tarkistukset seuraavaksi.

from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import sys

ROOT = Path(__file__).resolve().parents[1]
FORM_CONTROLS = {"input", "select", "textarea"}
IDREF_ATTRIBUTES = {"aria-labelledby", "aria-describedby", "aria-controls", "aria-owns", "aria-activedescendant"}


class SiteParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids, self.duplicates, self.references = set(), [], []
        self.lang = None
        self.main_count = 0
        self.headings, self.images_missing_alt, self.iframes_missing_title = [], [], []
        self.form_controls, self.label_targets, self.idrefs = [], set(), []
        self.positive_tabindex, self.unnamed_buttons, self.skip_links = [], [], []
        self._button_stack = []
        self._label_stack = []

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        element_id = attributes.get("id")
        if tag == "html":
            self.lang = attributes.get("lang")
        if tag == "main":
            self.main_count += 1
        if tag in {"h1", "h2", "h3", "h4", "h5", "h6"}:
            self.headings.append((int(tag[1]), element_id))
        if tag == "img" and "alt" not in attributes:
            self.images_missing_alt.append(attributes.get("src", "(image without src)"))
        if tag == "iframe" and not attributes.get("title", "").strip():
            self.iframes_missing_title.append(attributes.get("src", "(iframe without src)"))
        if tag == "label":
            self._label_stack.append(attributes.get("for", ""))
            if attributes.get("for"):
                self.label_targets.add(attributes["for"])
        if tag in FORM_CONTROLS:
            self.form_controls.append((tag, attributes, bool(self._label_stack)))
        if tag == "button":
            self._button_stack.append({"attributes": attributes, "text": ""})
        for attribute in IDREF_ATTRIBUTES:
            if attributes.get(attribute):
                self.idrefs.extend((attribute, token) for token in attributes[attribute].split())
        tabindex = attributes.get("tabindex")
        if tabindex:
            try:
                if int(tabindex) > 0:
                    self.positive_tabindex.append((tag, tabindex))
            except ValueError:
                pass
        if tag == "a" and "skip-link" in attributes.get("class", "").split():
            self.skip_links.append(attributes.get("href", ""))
        if tag == "a" and attributes.get("target", "").lower() == "_blank":
            rel = set(attributes.get("rel", "").lower().split())
            if not ({"noopener", "noreferrer"} & rel):
                self.references.append(("unsafe_blank_link", attributes.get("href", "(missing href)")))
        if element_id:
            if element_id in self.ids:
                self.duplicates.append(element_id)
            self.ids.add(element_id)
        for attribute in ("href", "src"):
            if attributes.get(attribute):
                self.references.append((attribute, attributes[attribute]))

    def handle_data(self, data):
        for button in self._button_stack:
            button["text"] += data

    def handle_endtag(self, tag):
        if tag == "label" and self._label_stack:
            self._label_stack.pop()
        if tag == "button" and self._button_stack:
            button = self._button_stack.pop()
            attrs = button["attributes"]
            has_name = any(attrs.get(name, "").strip() for name in ("aria-label", "aria-labelledby", "title"))
            if not has_name and not button["text"].strip():
                self.unnamed_buttons.append(attrs.get("id", "(button without id)"))


# FUNKTIO-OSIO ALKAA: resolve_local_reference.
# LUOKKA-OSIO PÄÄTTYY: SiteParser. Seuraava osio alkaa seuraavasta määrittelystä tai tiedoston lopusta.
def resolve_local_reference(source, value):
    parsed = urlsplit(value)
    if parsed.scheme or parsed.netloc:
        return None
    path = unquote(parsed.path)
    target = source if not path else (ROOT / path.lstrip("/") if path.startswith("/") else source.parent / path)
    if target.is_dir():
        target = target / "index.html"
    return target.resolve()


# FUNKTIO-OSIO ALKAA: audit_page.
# FUNKTIO-OSIO PÄÄTTYY: resolve_local_reference. Seuraava osio alkaa seuraavasta määrittelystä tai tiedoston lopusta.
def audit_page(page, parser):
    errors = []
    relative = page.relative_to(ROOT)
    if not parser.lang or not parser.lang.strip():
        errors.append(f"{relative}: <html> is missing a valid lang attribute")
    if parser.main_count != 1:
        errors.append(f"{relative}: expected exactly one <main> landmark, found {parser.main_count}")
    if not parser.headings or sum(level == 1 for level, _ in parser.headings) != 1:
        errors.append(f"{relative}: expected exactly one <h1> heading")
    previous = 0
    for level, _ in parser.headings:
        if previous and level > previous + 1:
            errors.append(f"{relative}: heading level jumps from h{previous} to h{level}")
        previous = level
    for image in parser.images_missing_alt:
        errors.append(f"{relative}: image is missing alt text: {image}")
    for frame in parser.iframes_missing_title:
        errors.append(f"{relative}: iframe is missing a descriptive title: {frame}")
    for button in parser.unnamed_buttons:
        errors.append(f"{relative}: button has no accessible name: {button}")
    for tag, attrs, wrapped_label in parser.form_controls:
        labelled = bool(wrapped_label or attrs.get("aria-label", "").strip() or attrs.get("aria-labelledby", "").strip()
                        or attrs.get("title", "").strip() or attrs.get("id") in parser.label_targets)
        if not labelled:
            errors.append(f"{relative}: <{tag}> has no programmatic label")
    for attribute, token in parser.idrefs:
        if token not in parser.ids:
            errors.append(f"{relative}: {attribute} references missing id '{token}'")
    for tag, tabindex in parser.positive_tabindex:
        errors.append(f"{relative}: positive tabindex={tabindex} on <{tag}> should be avoided")
    if not parser.skip_links:
        errors.append(f"{relative}: missing keyboard skip link")
    for target in parser.skip_links:
        if not target.startswith("#") or target[1:] not in parser.ids:
            errors.append(f"{relative}: skip link does not target an existing page landmark: {target}")
    return errors


# FUNKTIO-OSIO ALKAA: main.
# FUNKTIO-OSIO PÄÄTTYY: audit_page. Seuraava osio alkaa seuraavasta määrittelystä tai tiedoston lopusta.
def main():
    pages = sorted(ROOT.glob("*.html"))
    if not pages:
        print("No HTML pages found.")
        return 1
    errors, checked_references, checked_fragments, parsed_pages = [], 0, 0, {}
    for page in pages:
        parser = SiteParser()
        parser.feed(page.read_text(encoding="utf-8"))
        parser.close()
        parsed_pages[page.resolve()] = parser
        errors.extend(audit_page(page, parser))
        for duplicate in sorted(set(parser.duplicates)):
            errors.append(f"{page.relative_to(ROOT)}: duplicate id '{duplicate}'")
    for page in pages:
        parser = parsed_pages[page.resolve()]
        for attribute, reference in parser.references:
            if attribute == "unsafe_blank_link":
                errors.append(f"{page.relative_to(ROOT)}: target=_blank link needs rel=noopener or rel=noreferrer: {reference}")
                continue
            target = resolve_local_reference(page, reference)
            if target is None:
                continue
            try:
                target.relative_to(ROOT.resolve())
            except ValueError:
                errors.append(f"{page.relative_to(ROOT)}: reference escapes site root: {reference}")
                continue
            checked_references += 1
            if not target.is_file():
                errors.append(f"{page.relative_to(ROOT)}: missing local file: {reference}")
                continue
            parsed_reference = urlsplit(reference)
            if parsed_reference.fragment and target.suffix.lower() in {".html", ".htm"}:
                target_parser = parsed_pages.get(target.resolve())
                if target_parser is None:
                    target_parser = SiteParser()
                    target_parser.feed(target.read_text(encoding="utf-8"))
                    target_parser.close()
                    parsed_pages[target.resolve()] = target_parser
                fragment = unquote(parsed_reference.fragment)
                checked_fragments += 1
                if fragment not in target_parser.ids:
                    errors.append(f"{page.relative_to(ROOT)}: missing HTML anchor #{fragment} in {target.relative_to(ROOT)} ({attribute}={reference})")
    if errors:
        print("Site validation failed:")
        for error in errors:
            print(f" - {error}")
        return 1
    print(f"Site validation passed: {len(pages)} HTML pages, {checked_references} local references, {checked_fragments} HTML anchors, and baseline accessibility semantics checked.")
    return 0


if __name__ == "__main__":
    sys.exit(main())

# FUNKTIO-OSIO PÄÄTTYY: main. Seuraava osio alkaa seuraavasta määrittelystä tai tiedoston lopusta.