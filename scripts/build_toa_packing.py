"""Пилот 東亜シーザ: фактические габариты упаковки и расчёт партий.
Источник габаритов: письмо 東亜シーザ 25.11.2026 11:58 JST (id 1a210a452d5e519b).
"""
from math import ceil
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side

JPY_EUR = 0.005702
RATE_DATE = "20.11.2026"
FREIGHT = 180.0      # €/м³
HANDLING = 800.0     # € на отправку (origin + destination)
PACKAGING = 2.20     # € на штуку
BREAKAGE = 0.02
FINANCE = 0.015

HEAD_FILL = PatternFill("solid", fgColor="2F3A36")
HEAD_FONT = Font(bold=True, color="FFFFFF", size=10)
THIN = Side(style="thin", color="D9D2C7")
BOX = Border(left=THIN, right=THIN, top=THIN, bottom=THIN)
MONEY = '#,##0.00'

SKUS = [
    {"name": "善六 キッチンハサミ TDK-12", "exw": 1800, "inner": 10, "carton_pcs": 100,
     "dims": (0.61, 0.29, 0.34), "carton_kg": 18.0},
    {"name": "善六 AUS8 三徳包丁 SKA-170", "exw": 6000, "inner": 6, "carton_pcs": 60,
     "dims": (0.45, 0.43, 0.40), "carton_kg": 20.0},
]


def style(ws, headers, widths, rows):
    ws.append(headers)
    for c in range(1, len(headers) + 1):
        cell = ws.cell(row=1, column=c)
        cell.fill = HEAD_FILL
        cell.font = HEAD_FONT
        cell.alignment = Alignment(vertical="center", wrap_text=True)
    for row in rows:
        ws.append(row)
    for i, w in enumerate(widths, start=1):
        ws.column_dimensions[chr(64 + i)].width = w
    for row in ws.iter_rows(min_row=1, max_row=ws.max_row, max_col=len(headers)):
        for cell in row:
            cell.border = BOX
            if cell.row > 1:
                cell.alignment = Alignment(vertical="top", wrap_text=True)


wb = Workbook()

# ── Лист 1: упаковка ────────────────────────────────────────────────────────
ws = wb.active
ws.title = "Упаковка (факт)"
rows = []
for s in SKUS:
    v = s["dims"][0] * s["dims"][1] * s["dims"][2]
    rows.append([
        s["name"], s["inner"], s["carton_pcs"],
        f'{s["dims"][0]*100:.0f} × {s["dims"][1]*100:.0f} × {s["dims"][2]*100:.0f} см',
        round(v, 4), round(s["carton_kg"], 1),
        round(v / s["carton_pcs"] * 1000, 2), round(s["carton_kg"] / s["carton_pcs"] * 1000, 0),
        round(s["exw"] * JPY_EUR, 2), round(v / s["carton_pcs"] * FREIGHT, 3),
    ])
style(ws, ["Товар", "Во внутренней коробке, шт", "В картоне, шт", "Картон, см",
           "Картон, м³", "Картон, кг", "На штуку, л", "На штуку, г",
           f'EXW, € (курс {JPY_EUR})', "Фрахт на штуку, €"], [30, 12, 11, 17, 10, 10, 11, 11, 13, 13], rows)

# ── Лист 2: партии ──────────────────────────────────────────────────────────
ws2 = wb.create_sheet("Партии")
rows = []
for s in SKUS:
    v = s["dims"][0] * s["dims"][1] * s["dims"][2]
    for qty in (300, 600, 1000):
        carts = ceil(qty / s["carton_pcs"])
        vol = carts * v
        weight = carts * s["carton_kg"]
        rows.append([s["name"], qty, carts, round(vol, 3), round(weight, 1),
                     round(vol * FREIGHT, 2), round(vol * FREIGHT / qty, 2)])
carts1 = ceil(300 / 100)
carts2 = ceil(100 / 60)
pilot_v = carts1 * SKUS[0]["dims"][0] * SKUS[0]["dims"][1] * SKUS[0]["dims"][2] + \
          carts2 * SKUS[1]["dims"][0] * SKUS[1]["dims"][1] * SKUS[1]["dims"][2]
pilot_w = carts1 * SKUS[0]["carton_kg"] + carts2 * SKUS[1]["carton_kg"]
rows.append(["ПИЛОТ: TDK-12 300 + SKA-170 100", 400, carts1 + carts2, round(pilot_v, 3),
             round(pilot_w, 1), round(pilot_v * FREIGHT, 2), round(pilot_v * FREIGHT / 400, 2)])
style(ws2, ["Товар / партия", "Штук", "Картонов", "Объём, м³", "Вес, кг",
            f'Фрахт, € ({FREIGHT} €/м³)', "Фрахт на штуку, €"],
      [30, 10, 11, 10, 10, 12, 13], rows)

# ── Лист 3: что это меняет в экономике ──────────────────────────────────────
ws3 = wb.create_sheet("Экономика по факту")
rows = []
for s in SKUS:
    v = s["dims"][0] * s["dims"][1] * s["dims"][2] / s["carton_pcs"]
    for qty in (300, 600, 1000):
        exw = s["exw"] * JPY_EUR
        freight = v * FREIGHT
        handling = HANDLING / qty
        base = exw + freight
        landed = exw + freight + handling + PACKAGING + base * BREAKAGE + base * FINANCE
        rows.append([s["name"], qty, round(exw, 2), round(freight, 2), round(handling, 2),
                     PACKAGING, round(base * (BREAKAGE + FINANCE), 2),
                     round(landed, 2), round(landed / 0.625, 2), round(landed / 0.625 * 2, 2)])
style(ws3, ["Товар", "Штук", "EXW, €", "Фрахт, €", "Обработка, €", "Упаковка, €",
            "Бой и финансирование, €", "Landed, €", "Опт, € (÷0,625)", "Полка, € (×2)"],
      [30, 10, 10, 10, 12, 12, 14, 11, 14, 12], rows)
for row in ws3.iter_rows(min_row=2, max_row=ws3.max_row, min_col=3, max_col=10):
    for cell in row:
        cell.number_format = MONEY

ws3.append([])
note = ("Источник габаритов — письмо 東亜シーザ 25.11.2026 11:58 JST: TDK-12 — 10 шт во внутренней коробке, "
        "100 шт в картоне 61 × 29 × 34 см, 18 кг; SKA-170 — 6 шт во внутренней коробке, 60 шт в картоне "
        "45 × 43 × 40 см, 20 кг. Модель: фрахт 180 €/м³, обработка 800 € на отправку, упаковка 2,20 €, бой 2 %, "
        "финансирование 1,5 %, пошлина 0 %. Ex-works — по прайсу мастерской (EXW Japan); оптовая цена и полка — "
        "наша оценка, не цена мастерской.")
ws3.cell(row=ws3.max_row + 1, column=1, value=note).alignment = Alignment(wrap_text=True, vertical="top")

wb.save("mugeniki-toa-gabarity.xlsx")
print("saved mugeniki-toa-gabarity.xlsx")
