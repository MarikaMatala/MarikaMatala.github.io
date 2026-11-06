#!/usr/bin/env python3
"""Validate local HTML references and duplicate IDs in the static portfolio."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import sys

ROOT = Path(__file__).resolve().parents[1]


class SiteParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids = set()
        self.duplicates = []
        self.references = []

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        element_id = attributes.get("id")
        if element_id:
            if element_id in self.ids:
                self.duplicates.append(element_id)
            self.ids.add(element_id)
        for attribute in ("href", "src"):
            value = attributes.get(attribute)
            if value:
                self.references.append((attribute, value))


def resolve_local_reference(source, value):
    parsed = urlsplit(value)
    if parsed.scheme or parsed.netloc:
        return None
    path = unquote(parsed.path)
    if not path:
        target = source
    elif path.startswith("/"):
        target = ROOT / path.lstrip("/")
    else:
        target = source.parent / path
    if target.is_dir():
        target = target / "index.html"
    return target.resolve()


def main():
    pages = sorted(ROOT.glob("*.html"))
    if not pages:
        print("No HTML pages found.")
        return 1

    errors = []
    checked_references = 0
    checked_fragments = 0
    parsed_pages = {}

    for page in pages:
        parser = SiteParser()
        parser.feed(page.read_text(encoding="utf-8"))
        parser.close()
        parsed_pages[page.resolve()] = parser

        for duplicate in sorted(set(parser.duplicates)):
            errors.append(f"{page.relative_to(ROOT)}: duplicate id '{duplicate}'")

    for page in pages:
        parser = parsed_pages[page.resolve()]
        for attribute, reference in parser.references:
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
                target = target.resolve()
                target_parser = parsed_pages.get(target)
                if target_parser is None:
                    target_parser = SiteParser()
                    target_parser.feed(target.read_text(encoding="utf-8"))
                    target_parser.close()
                    parsed_pages[target] = target_parser

                fragment = unquote(parsed_reference.fragment)
                checked_fragments += 1
                if fragment not in target_parser.ids:
                    errors.append(
                        f"{page.relative_to(ROOT)}: missing HTML anchor #{fragment} "
                        f"in {target.relative_to(ROOT)} ({attribute}={reference})"
                    )

    if errors:
        print("Site validation failed:")
        for error in errors:
            print(f" - {error}")
        return 1

    print(f"Site validation passed: {len(pages)} HTML pages, {checked_references} local references and {checked_fragments} HTML anchors checked.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
