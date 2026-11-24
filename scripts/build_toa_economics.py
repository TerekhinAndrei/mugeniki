#!/usr/bin/env python3
"""Юнит-экономика по прайс-листам 東亜シーザ (Tōa Scissors).

Источник цен — два файла, присланные мастерской письмом 24.11.2026:
  pricelist(homescsissors).xls  — прайс EXW Japan (широкий лист ножниц)
  zenrokuprice.xlsx             — прайс бренда 善六 ZENROKU (ножницы, ножи)

Курс: 1 JPY = 0.005702 EUR (open.er-api.com, 20.11.2026).
Модель landed: EXW + фрахт по объёму + фикс. расходы отправки + упаковка,
затем запас на бой (2 %) и финансирование (1.5 %).
Оптовая = landed / 0.625 (валовая маржа 37.5 % на оптовой).
"""
from pathlib import Path

from openpyxl import Workbook
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side

JPY_EUR = 0.005702
FREIGHT_M3 = 180.0
ORIGIN_FIXED = 450.0
DEST_FIXED = 350.0
PACKAGING = 2.20
BREAKAGE = 0.02
FINANCE = 0.015
GROSS_WHOLESALE = 0.625

HEAD_FILL = PatternFill("solid", fgColor="1F1B17")
HEAD_FONT = Font(color="FFFFFF", bold=True, size=10)
BORDER = Border(
    left=Side(style="thin", color="D9D2C7"),
    right=Side(style="thin", color="D9D2C7"),
    top=Side(style="thin", color="D9D2C7"),
    bottom=Side(style="thin", color="D9D2C7"),
)
MONEY = '#,##0.00 "€"'
YEN = '#,##0 "¥"'

# SKU, название, EXW ¥, объём упаковки м³, категория для канала
ROWS = [
    ("TD1210", "210 mm tailor scissors", 1200, 0.00070, "Портной инструмент"),
    ("TD1255", "255 mm tailor scissors", 1700, 0.00080, "Портной инструмент"),
    ("TD1280", "280 mm tailor scissors", 2000, 0.00085, "Портной инструмент"),
    ("TD210", "210 mm tailor scissors", 1200, 0.00070, "Портной инструмент"),
    ("TD240", "240 mm tailor scissors", 1700, 0.00080, "Портной инструмент"),
    ("TD270", "270 mm tailor scissors", 2000, 0.00085, "Портной инструмент"),
    ("TD1165", "165 mm sewing scissors", 900, 0.00060, "Швейный инструмент"),
    ("HT-240", "240 mm tailor scissors", 13310, 0.00130, "Премиум портной инструмент"),
    ("HT-260", "260 mm tailor scissors", 16830, 0.00150, "Премиум портной инструмент"),
    ("HT-280", "280 mm tailor scissors", 18150, 0.00160, "Премиум портной инструмент"),
    ("HT-240A", "240 mm tailor scissors", 6300, 0.00120, "Портной инструмент"),
    ("TDK-1", "kitchen scissors", 900, 0.00070, "Кухня — вход"),
    ("TDK-2", "kitchen scissors", 1000, 0.00075, "Кухня — вход"),
    ("TDK-8", "kitchen scissors", 1200, 0.00080, "Кухня — вход"),
    ("TDK-9", "kitchen scissors", 1100, 0.00080, "Кухня — вход"),
    ("TDK-12", "all-stainless kitchen shears", 1800, 0.00090, "Кухня — основной"),
    ("TDA-1", "almighty scissors", 1300, 0.00070, "Универсальные"),
    ("TDG-2000", "gardening scissors", 1200, 0.00075, "Сад"),
    ("TDG-5", "flower scissors", 800, 0.00060, "Флористика"),
    ("PC-150", "embroidery scissors", 350, 0.00030, "Рукоделие"),
    ("PS-110", "embroidery scissors", 230, 0.00025, "Рукоделие"),
    ("PS-90", "embroidery scissors", 210, 0.00020, "Рукоделие"),
    ("SQ-1000", "rectangle craft scissors", 1800, 0.00060, "Крафт/декор"),
    ("TR-1000", "triangle craft scissors", 1800, 0.00060, "Крафт/декор"),
    ("CL-1000", "circle craft scissors", 1800, 0.00060, "Крафт/декор"),
    ("SKA-210-08", "AUS8 chef knife, 210 mm", 7000, 0.00140, "Ножи — HoReCa"),
    ("SKA-170-08", "AUS8 santoku, 170 mm", 6000, 0.00120, "Ножи — HoReCa"),
    ("SKA-135-08", "AUS8 utility knife, 135 mm", 5000, 0.00100, "Ножи — HoReCa"),
    ("SKN-S210-08", "AUS8 sashimi knife, 210 mm", 10000, 0.00150, "Ножи — HoReCa"),
]

# Наша короткая шлиха: что выводим первым
SHORTLIST = ["TDK-12", "TDK-9", "TD1210", "HT-240A", "SKA-170-08", "SKA-210-08"]


def econ(exw_jpy: float, volume_m3: float, qty: int = 600, retail_multiplier: float = 2.0):
    exw = exw_jpy * JPY_EUR
    landed = exw + FREIGHT_M3 * volume_m3 + (ORIGIN_FIXED + DEST_FIXED) / qty + PACKAGING
    landed *= 1 + BREAKAGE + FINANCE
    wholesale = landed / GROSS_WHOLESALE
    return exw, landed, wholesale, wholesale * retail_multiplier


wb = Workbook()

# ── Лист 1: полный прайс с расчётом ─────────────────────────────────────────
ws = wb.active
ws.title = "Прайс и расчёт"
headers = [
    "SKU", "Наименование (как у мастерской)", "EXW ¥", "EXW €", "Объём м³/шт",
    "Landed € (600 шт)", "Опт € (600 шт)", "Опт € (300 шт)", "Опт € (1000 шт)",
    "Полка € (×2)", "Канал", "В шлихе",
]
ws.append(headers)
for c in range(1, len(headers) + 1):
    cell = ws.cell(row=1, column=c)
    cell.fill, cell.font = HEAD_FILL, HEAD_FONT
    cell.alignment = Alignment(wrap_text=True, vertical="center", horizontal="center")
    cell.border = BORDER
ws.row_dimensions[1].height = 32

for sku, name, jpy, vol, channel in ROWS:
    exw, landed, ws600, ret = econ(jpy, vol, 600)
    ws.append([
        sku, name, jpy, exw, vol, landed, ws600,
        econ(jpy, vol, 300)[2], econ(jpy, vol, 1000)[2], ret, channel,
        "да" if sku in SHORTLIST else "",
    ])

for r in range(2, ws.max_row + 1):
    ws.cell(row=r, column=3).number_format = YEN
    for c in (4, 6, 7, 8, 9, 10):
        ws.cell(row=r, column=c).number_format = MONEY
    ws.cell(row=r, column=5).number_format = "0.00000"
    for c in range(1, len(headers) + 1):
        ws.cell(row=r, column=c).border = BORDER
for i, w in enumerate([12, 34, 10, 10, 12, 15, 14, 14, 15, 13, 24, 10], start=1):
    ws.column_dimensions[chr(64 + i)].width = w
ws.freeze_panes = "A2"

# ── Лист 2: как читать ──────────────────────────────────────────────────────
ws2 = wb.create_sheet("Как читать")
notes = [
    ["Источник цен", "Прайс-листы 東亜シーザ (Tōa Scissors), присланы письмом 24.11.2026: "
                     "pricelist(homescsissors).xls (EXW Japan) и zenrokuprice.xlsx (бренд 善六 ZENROKU)."],
    ["Курс", "1 JPY = 0,005702 EUR (open.er-api.com, 20.11.2026)."],
    ["Модель landed", "EXW + фрахт (180 €/м³ × объём) + фиксированные расходы отправки (450 € origin + 350 € "
                      "destination на партию) + упаковка 2,20 €/шт; затем +2 % бой и +1,5 % финансирование."],
    ["Оптовая", "Landed / 0,625 — валовая маржа 37,5 % на оптовой цене."],
    ["Полка", "Оптовая × 2 — ориентир для европейской розницы, не обязательство."],
    ["Что означают объёмы", "Фиксированные расходы отправки разнесены на партию 300 / 600 / 1000 шт; "
                            "это единственное, что меняется между колонками."],
    ["Чего в модели нет", "Пошлины (для ножей и ножниц ЕС — 0 % по текущему тарифу, требует проверки по коду ТН ВЭД), "
                          "стоимость тестов и сертификатов, наша собственная маржа."],
    ["Проверка рынка", "Tojiro DP santoku 170 мм в Германии — от 122 € (idealo.de, по данным поиска 24.11.2026); "
                       "японские кухонные ножницы в ЕС — 40–60 € (Global GKS-210 и аналоги)."],
]
ws2.append(["Пункт", "Значение"])
for c in range(1, 3):
    cell = ws2.cell(row=1, column=c)
    cell.fill, cell.font = HEAD_FILL, HEAD_FONT
    cell.border = BORDER
for row in notes:
    ws2.append(row)
for r in range(2, ws2.max_row + 1):
    for c in range(1, 3):
        ws2.cell(row=r, column=c).alignment = Alignment(wrap_text=True, vertical="top")
        ws2.cell(row=r, column=c).border = BORDER
    ws2.row_dimensions[r].height = 44
ws2.column_dimensions["A"].width = 22
ws2.column_dimensions["B"].width = 100

out = Path(__file__).with_name("mugeniki-toa-ekonomika.xlsx")
wb.save(out)
print("saved", out.name, "| строк прайса:", len(ROWS), "| в шлихе:", len(SHORTLIST))
