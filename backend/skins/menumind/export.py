"""Fail-closed MenuMind catalog export."""
from __future__ import annotations


def escape_cell(value):
    """Neutralize spreadsheet formula prefixes without changing JSON structure."""
    if isinstance(value, str) and value[:1] in "=+-@":
        return "'" + value
    return value


def catalog_export(items: list[dict]) -> dict:
    rows = []
    for item in items:
        allergens = [a if a in {"unknown", "gluten", "crustaceans", "eggs", "fish", "peanuts", "soybeans", "milk", "nuts", "celery", "mustard", "sesame", "sulphites", "lupin", "molluscs"} else "unknown" for a in item.get("allergens", [])]
        info = bool(item.get("allergen_info_present", False))
        if not info and not allergens:
            allergens = ["unknown"]
        rows.append({"name": escape_cell(str(item.get("name", ""))), "price_cents": item.get("price_cents"), "allergens": allergens, "allergen_info_present": info, "diet": item.get("diet", "unknown"), "publishable": False})
    return {"catalog_status": "queue", "items": rows}
