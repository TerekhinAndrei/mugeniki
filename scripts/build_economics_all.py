#!/usr/bin/env python3
"""Юнит-экономика по всем 44 позициям каталога Mugeniki, на одной модели.

Базы цены, по убыванию достоверности:
  1. «EXW мастерской»       — мастерская прислала прайс EXW (東亜シーザ, 24.11.2026).
  2. «коэффициент мастерской» — мастерская сама назвала долю ex-works от розницы
                              (佐治陶器: 掛け率45 %, письмо 24.11.2026).
  3. «диапазон по рознице»   — известна только японская розница; считаем коридор
                              при EXW = 40 % и 60 % розницы. Это допущение, не факт.

Модель landed: EXW + фрахт (180 €/м³ × объём упаковки) + фиксированные расходы
отправки (450 € origin + 350 € destination на партию) + упаковка 2,20 €/шт,
затем +2 % бой и +1,5 % финансирование. Оптовая = landed / 0,625.
Полка = оптовая × 2. Пошлины ЕС на керамику и ножевые изделия — 0 % по текущему
тарифу, требуют проверки по коду ТН ВЭД перед первой поставкой.
"""
from pathlib import Path
from statistics import median

from openpyxl import Workbook
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side

JPY_EUR = 0.005702
FREIGHT_M3 = 180.0
ORIGIN_FIXED = 450.0
DEST_FIXED = 350.0
PACKAGING = 2.20
BREAKAGE, FINANCE = 0.02, 0.015
GROSS_WHOLESALE = 0.625
VOLUME_BY_CATEGORY = {  # м³ на позицию в коробке, допущение
    "Tableware": 0.0040, "Tea": 0.0020, "Lacquerware": 0.0015,
    "Blades": 0.0010, "Gifting": 0.0030,
}
SAJI_SHARE = 0.45  # 掛け率, названа мастерской 24.11.2026

HEAD_FILL = PatternFill("solid", fgColor="1F1B17")
HEAD_FONT = Font(color="FFFFFF", bold=True, size=10)
SIDE = Side(style="thin", color="D9D2C7")
BORDER = Border(left=SIDE, right=SIDE, top=SIDE, bottom=SIDE)
MONEY = '#,##0.00 "€"'
YEN = '#,##0 "¥"'


def landed(exw_eur: float, volume_m3: float, qty: int) -> float:
    value = exw_eur + FREIGHT_M3 * volume_m3 + (ORIGIN_FIXED + DEST_FIXED) / qty + PACKAGING
    return value * (1 + BREAKAGE + FINANCE)


def chain(exw_eur: float, volume_m3: float, qty: int = 600, multiplier: float = 2.0):
    land = landed(exw_eur, volume_m3, qty)
    wholesale = land / GROSS_WHOLESALE
    return land, wholesale, wholesale * multiplier


def basis_of(product) -> str:
    note = (product.get("priceNote") or "")
    if note.startswith("EXW"):
        return "EXW мастерской"
    if product["maker"] == "Saji Tōki" and product["priceJpy"]:
        return "коэффициент мастерской"
    if product["priceJpy"]:
        return "диапазон по рознице"
    return "нет цены"


def rows_for_all(catalog):
    out = []
    for p in catalog:
        basis = basis_of(p)
        volume = VOLUME_BY_CATEGORY.get(p["category"], 0.003)
        price = p["priceJpy"]
        if basis == "EXW мастерской":
            exw_eur = price * JPY_EUR
            land, ws, shelf = chain(exw_eur, volume)
            out.append(dict(p, basis=basis, exwYen=price, exw=exw_eur, landed=land,
                            wholesale=ws, shelf=shelf, wholesaleLow=None, wholesaleHigh=None))
        elif basis == "коэффициент мастерской":
            exw_eur = price * SAJI_SHARE * JPY_EUR
            land, ws, shelf = chain(exw_eur, volume)
            out.append(dict(p, basis=basis, exwYen=round(price * SAJI_SHARE), exw=exw_eur,
                            landed=land, wholesale=ws, shelf=shelf,
                            wholesaleLow=None, wholesaleHigh=None))
        elif basis == "диапазон по рознице":
            lo = chain(price * 0.40 * JPY_EUR, volume)[1]
            hi = chain(price * 0.60 * JPY_EUR, volume)[1]
            out.append(dict(p, basis=basis, exwYen=None, exw=None, landed=None,
                            wholesale=None, shelf=None, wholesaleLow=lo, wholesaleHigh=hi))
        else:
            out.append(dict(p, basis=basis, exwYen=None, exw=None, landed=None,
                            wholesale=None, shelf=None, wholesaleLow=None, wholesaleHigh=None))
    return out


def build_workbook(rows, catalog):
    wb = Workbook()
    ws = wb.worksheets[0]
    headers = ["SKU", "Мастерская", "Товар", "Категория", "Цена ¥ в каталоге",
               "База цены", "EXW ¥", "EXW €", "Landed € (600 шт)", "Опт € (600 шт)",
               "Опт € (300 шт)", "Опт € (1000 шт)", "Полка €", "Опт € (коридор)",
               "Что уточнить"]
    ws.append(headers)
    for c in range(1, len(headers) + 1):
        cell = ws.cell(row=1, column=c)
        cell.fill, cell.font = HEAD_FILL, HEAD_FONT
        cell.alignment = Alignment(wrap_text=True, vertical="center", horizontal="center")
        cell.border = BORDER
    ws.row_dimensions[1].height = 40

    for i, r in enumerate(rows, start=1):
        volume = VOLUME_BY_CATEGORY.get(r["category"], 0.003)
        if r["basis"] == "EXW мастерской":
            ws300 = chain(r["exw"], volume, 300)[1]
            ws1000 = chain(r["exw"], volume, 1000)[1]
            need = "Цена подтверждена прайсом; нужны упаковка и гравировка"
        elif r["basis"] == "коэффициент мастерской":
            ws300 = chain(r["exw"], volume, 300)[1]
            ws1000 = chain(r["exw"], volume, 1000)[1]
            need = "EXW подтвердить под наши SKU и объёмы; упаковка по артикулу"
        elif r["basis"] == "диапазон по рознице":
            ws300 = ws1000 = None
            need = "Запросить цену ex-works и упаковку — сейчас это коридор, не факт"
        else:
            ws300 = ws1000 = None
            need = "Цена не публикуется: запросить прайс вместе с условиями"
        corridor = (f"{r['wholesaleLow']:.2f}–{r['wholesaleHigh']:.2f}"
                    if r["wholesaleLow"] else "")
        ws.append([
            f"P-{i:02d}", r["makerJa"], r["name"], r["category"], r["priceJpy"],
            r["basis"], r["exwYen"], r["exw"], r["landed"], r["wholesale"],
            ws300, ws1000, r["shelf"], corridor, need,
        ])

    for row in range(2, ws.max_row + 1):
        ws.cell(row=row, column=5).number_format = YEN
        ws.cell(row=row, column=7).number_format = YEN
        for col in (8, 9, 10, 11, 12, 13):
            ws.cell(row=row, column=col).number_format = MONEY
        for col in range(1, len(headers) + 1):
            ws.cell(row=row, column=col).border = BORDER
            ws.cell(row=row, column=col).alignment = Alignment(
                wrap_text=col in (3, 6, 14, 15), vertical="top")
    for i, width in enumerate([8, 16, 34, 13, 15, 22, 10, 10, 15, 14, 14, 15, 12, 18, 46], start=1):
        ws.column_dimensions[chr(64 + i) if i <= 26 else "A"].width = width
    ws.freeze_panes = "A2"

    # ── Лист по мастерским ──────────────────────────────────────────────────
    ws2 = wb.create_sheet("По мастерским")
    ws2.append(["Мастерская", "Позиций", "Позиций с ценой", "База цены", "Опт €, медиана",
                "Полка €, медиана", "Экспортная готовность", "Что запросить"])
    for c in range(1, 9):
        cell = ws2.cell(row=1, column=c)
        cell.fill, cell.font = HEAD_FILL, HEAD_FONT
        cell.alignment = Alignment(wrap_text=True, vertical="center", horizontal="center")
        cell.border = BORDER
    ws2.row_dimensions[1].height = 34

    makers = {}
    for r in rows:
        makers.setdefault(r["makerJa"], []).append(r)
    for maker, group in makers.items():
        wholes = [g["wholesale"] for g in group if g["wholesale"]] or \
                 [g["wholesaleLow"] for g in group if g["wholesaleLow"]]
        shelves = [g["shelf"] for g in group if g["shelf"]]
        bases = sorted({g["basis"] for g in group})
        export = group[0]["exportStatus"]
        ask = sorted({g["notes"] for g in group if "запросить" in (g.get("exportStatus") or "").lower()})
        ws2.append([
            maker, len(group), sum(1 for g in group if g["priceJpy"]), ", ".join(bases),
            round(median(wholes), 2) if wholes else None,
            round(median(shelves), 2) if shelves else None,
            export[:120], "Закрыть: цена ex-works, упаковка, MOQ, протоколы",
        ])
    for row in range(2, ws2.max_row + 1):
        for col in (5, 6):
            ws2.cell(row=row, column=col).number_format = MONEY
        for col in range(1, 9):
            ws2.cell(row=row, column=col).border = BORDER
            ws2.cell(row=row, column=col).alignment = Alignment(wrap_text=True, vertical="top")
        ws2.row_dimensions[row].height = 58
    for i, width in enumerate([16, 9, 14, 26, 15, 15, 46, 40], start=1):
        ws2.column_dimensions[chr(64 + i)].width = width

    # ── Лист модель ─────────────────────────────────────────────────────────
    ws3 = wb.create_sheet("Модель")
    ws3.append(["Параметр", "Значение", "Откуда"])
    for c in range(1, 4):
        cell = ws3.cell(row=1, column=c)
        cell.fill, cell.font = HEAD_FILL, HEAD_FONT
        cell.border = BORDER
    facts = [
        ("Курс", "1 JPY = 0,005702 EUR", "open.er-api.com, 20.11.2026"),
        ("Фрахт", f"{FREIGHT_M3:.0f} €/м³", "ставка морем, использована в отчёте о спросе"),
        ("Фикс. расходы отправки", f"{ORIGIN_FIXED:.0f} € origin + {DEST_FIXED:.0f} € destination", "на партию, разносится на количество"),
        ("Упаковка", f"{PACKAGING:.2f} €/шт", "брендированная коробка и японская бумага"),
        ("Бой", f"{BREAKAGE*100:.0f} %", "практика посуды"),
        ("Финансирование", f"{FINANCE*100:.1f} %", "деньги в товаре и логистике"),
        ("Валовая маржа на опте", "37,5 %", "оптовая = landed / 0,625"),
        ("Полка", "оптовая × 2", "ориентир европейской розницы, не обязательство"),
        ("Пошлина", "0 % для керамики и ножевых изделий", "текущий тариф ЕС; проверить по коду ТН ВЭД"),
        ("Чего нет в модели", "тесты и сертификаты, наша собственная маржа, сезонные надбавки", "считаются отдельно по проекту"),
        ("Объём упаковки по категориям", ", ".join(f"{k}: {v} м³" for k, v in VOLUME_BY_CATEGORY.items()),
         "допущение там, где упаковка не названа мастерской"),
        ("Коэффициент 佐治陶器", "EXW = 45 % от розницы", "掛け率45 %, письмо мастерской 24.11.2026"),
    ]
    for fact in facts:
        ws3.append(list(fact))
    for row in range(2, ws3.max_row + 1):
        for col in range(1, 4):
            ws3.cell(row=row, column=col).alignment = Alignment(wrap_text=True, vertical="top")
            ws3.cell(row=row, column=col).border = BORDER
        ws3.row_dimensions[row].height = 30
    ws3.column_dimensions["A"].width = 26
    ws3.column_dimensions["B"].width = 46
    ws3.column_dimensions["C"].width = 44

    out = Path(__file__).with_name("mugeniki-ekonomika-vse.xlsx")
    wb.save(out)
    return out


if __name__ == "__main__":
    import sys
    sys.path.insert(0, str(Path(__file__).parent))
    from catalog_data import CATALOG  # noqa: E402

    rows = rows_for_all(CATALOG)
    path = build_workbook(rows, CATALOG)
    fact = [r for r in rows if r["wholesale"]]
    corridor = [r for r in rows if r["wholesaleLow"]]
    print(f"saved {path.name} | позиций {len(rows)} | с точной ценой {len(fact)} "
          f"| коридором {len(corridor)} | без цены {len(rows)-len(fact)-len(corridor)}")
    for r in fact:
        print(f"  {r['makerJa']:8} {r['name'][:38]:38} EXW ¥{r['exwYen']:>7,} "
              f"€{r['exw']:6.1f} опт €{r['wholesale']:6.1f} полка €{r['shelf']:6.1f}")
