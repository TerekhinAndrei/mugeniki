"""Перенос базы поставщиков и экономики Mugeniki в Google Таблицы.

Таблица: 1QNREy9Vn1rvflQAxK7Zmyxgng1iSSlzqFGCT2H6eDqw
Источники: mugeniki-suppliers.xlsx, mugeniki-ekonomika-vse.xlsx, mugeniki-toa-gabarity.xlsx
"""
import json
import subprocess
import sys
from pathlib import Path

from openpyxl import load_workbook

GWS = "/opt/lifeos-tenant-migrations/agents/google/bin/gws"
SHEET_ID = "1QNREy9Vn1rvflQAxK7Zmyxgng1iSSlzqFGCT2H6eDqw"
WS = Path(__file__).resolve().parents[2]

PLAN = [
    ("mugeniki-suppliers.xlsx", "Поставщики", "Поставщики"),
    ("mugeniki-suppliers.xlsx", "Товары", "Товары"),
    ("mugeniki-suppliers.xlsx", "Переписка", "Переписка"),
    ("mugeniki-suppliers.xlsx", "Справочник", "Справочник"),
    ("mugeniki-ekonomika-vse.xlsx", "Sheet", "Экономика (44 позиции)"),
    ("mugeniki-ekonomika-vse.xlsx", "По мастерским", "Экономика по мастерским"),
    ("mugeniki-ekonomika-vse.xlsx", "Модель", "Модель расчёта"),
    ("mugeniki-toa-gabarity.xlsx", "Упаковка (факт)", "Упаковка по факту"),
    ("mugeniki-toa-gabarity.xlsx", "Партии", "Партии"),
    ("mugeniki-toa-gabarity.xlsx", "Экономика по факту", "Экономика по факту"),
]


def gws(*args):
    r = subprocess.run([GWS, *args], capture_output=True, text=True, timeout=300)
    out = (r.stdout or "") + (r.stderr or "")
    if r.returncode != 0:
        raise RuntimeError(f"{' '.join(args[:4])} → код {r.returncode}: {out[:400]}")
    return json.loads(r.stdout)


def add_tabs(titles):
    reqs = [{"addSheet": {"properties": {"title": t}}} for t in titles]
    return gws("sheets", "spreadsheets", "batchUpdate",
               "--params", json.dumps({"spreadsheetId": SHEET_ID}),
               "--json", json.dumps({"requests": reqs}))


def write_tab(title, rows):
    return gws("sheets", "spreadsheets", "values", "update",
               "--params", json.dumps({"spreadsheetId": SHEET_ID,
                                       "range": f"'{title}'!A1",
                                       "valueInputOption": "USER_ENTERED"}),
               "--json", json.dumps({"majorDimension": "ROWS", "values": rows}))


def main():
    meta = gws("sheets", "spreadsheets", "get", "--params", json.dumps({"spreadsheetId": SHEET_ID}))
    have = [s["properties"]["title"] for s in meta.get("sheets", [])]
    print("уже в таблице:", have)

    need = [t for t in (p[2] for p in PLAN) if t not in have]
    if need:
        add_tabs(need)
        print("добавлены вкладки:", need)

    for fname, src_sheet, title in PLAN:
        wb = load_workbook(WS / fname, read_only=True, data_only=True)
        ws = wb[src_sheet]
        rows = []
        for row in ws.iter_rows(values_only=True):
            if all(c is None or str(c).strip() == "" for c in row):
                continue
            rows.append(["" if c is None else c for c in row])
        write_tab(title, rows)
        print(f"{title}: строк {len(rows)} (из {fname} / {src_sheet})")

    # убрать пустую первую вкладку, если она осталась
    left = gws("sheets", "spreadsheets", "get", "--params", json.dumps({"spreadsheetId": SHEET_ID}))
    keep = {p[2] for p in PLAN}
    for s in left.get("sheets", []):
        t = s["properties"]["title"]
        if t in ("Sheet1", "Лист1") and t not in keep:
            gws("sheets", "spreadsheets", "batchUpdate",
                "--params", json.dumps({"spreadsheetId": SHEET_ID}),
                "--json", json.dumps({"requests": [{"deleteSheet": {"sheetId": s["properties"]["sheetId"]}}]}))
            print("удалена пустая вкладка:", t)


if __name__ == "__main__":
    main()
