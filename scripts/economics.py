"""Mugeniki unit economics — transparent assumptions, no invented prices.

FX and freight sources are printed in the report; every rate below is either
published (freight range, tariff, FX) or an explicit assumption marked A#.
"""
FX_EUR_JPY = 174.85  # ECB, 2026-11-18

# A1 — share of Japanese retail that a small kiln keeps as its ex-works price
EXW_SHARE = 0.55
# A2 — freight, sea LCL Japan->EU, mid of the 120-250 EUR/m3 range
FREIGHT_PER_M3 = 180.0
# A3 — per-shipment fixed cost: Japan pickup + export declaration + documentation
ORIGIN_FIXED = 450.0
# A4 — per-shipment fixed cost: EU import clearance + inland delivery
DEST_FIXED = 350.0
# A5 — branded box + Japanese paper
PACKAGING = 2.20
# A6 — transit damage and QC reserve
BREAKAGE = 0.02
# A7 — payment, FX and working capital cost on landed value
FINANCE = 0.015
# A8 — duty on HS 6911 under the EU-Japan EPA with a valid origin declaration
DUTY = 0.0

SKUS = [
    # name, retail JPY, volume m3 per unit, pilot qty
    ("Konoha round donburi (large)", 4235, 0.0045, 400),
    ("Canelé mug", 2750, 0.0025, 600),
    ("Rim octagonal plate", 1650, 0.0018, 600),
    ("Shōchikubai dish set of three", 6050, 0.0035, 300),
]

def unit_econ(retail_jpy, m3, qty, shipment_units):
    exw_jpy = retail_jpy * EXW_SHARE
    exw_eur = exw_jpy / FX_EUR_JPY
    freight = m3 * FREIGHT_PER_M3
    fixed = (ORIGIN_FIXED + DEST_FIXED) / shipment_units
    landed = (exw_eur + freight + fixed + PACKAGING) * (1 + BREAKAGE) + 0.0
    landed *= (1 + FINANCE)
    landed *= (1 + DUTY)
    return exw_eur, freight + fixed, landed

def row(name, retail, m3, qty, shipment_units):
    exw, log, landed = unit_econ(retail, m3, qty, shipment_units)
    sell_16 = landed * 1.6
    sell_18 = landed * 1.8
    gm_16 = (sell_16 - landed) / sell_16
    gm_18 = (sell_18 - landed) / sell_18
    return dict(name=name, retail=retail, retail_eur=retail / FX_EUR_JPY, exw=exw,
                log=log, landed=landed, sell16=sell_16, gm16=gm_16, sell18=sell_18, gm18=gm_18)

if __name__ == "__main__":
    print(f"FX 1 EUR = {FX_EUR_JPY} JPY (ECB 2026-11-18)\n")
    print("PER-UNIT, one mixed shipment of 1 900 pieces (4 SKUs)\n")
    hdr = f"{'SKU':32} {'retail':>9} {'exw €':>7} {'log €':>6} {'landed €':>9} {'x1.6 €':>8} {'GM':>5} {'x1.8 €':>8} {'GM':>5}"
    print(hdr)
    ship = 1900
    rows = []
    for n, r, m3, q in SKUS:
        x = row(n, r, m3, q, ship)
        rows.append(x)
        print(f"{x['name'][:32]:32} {x['retail_eur']:>8.2f}€ {x['exw']:>7.2f} {x['log']:>6.2f} {x['landed']:>9.2f} {x['sell16']:>8.2f} {x['gm16']*100:>4.0f}% {x['sell18']:>8.2f} {x['gm18']*100:>4.0f}%")

    print("\nPILOT P&L — 1 900 pieces, sell at landed x1.6")
    revenue = sum(x['sell16'] * q for x, (_, _, _, q) in zip(rows, SKUS))
    cogs = sum(x['landed'] * q for x, (_, _, _, q) in zip(rows, SKUS))
    gp = revenue - cogs
    fixed_costs = {
        "Samples and air freight": 1800,
        "Food-contact migration tests (4 SKUs)": 1200,
        "Company set-up and accounting (year 1)": 2500,
        "Website, domain, tools": 900,
        "Travel: one Japan trip (workshops, QC)": 2600,
        "Legal: supply agreement with two workshops": 1500,
    }
    fx = sum(fixed_costs.values())
    print(f"revenue {revenue:9.0f} €   cogs {cogs:9.0f} €   gross {gp:9.0f} €  ({gp/revenue*100:.0f}%)")
    for k, v in fixed_costs.items():
        print(f"  - {k:44} {v:>6} €")
    print(f"  fixed total {fx} €   ->  pilot result {gp - fx:+.0f} €")

    print("\nBREAK-EVEN: units of a 2 750 JPY mug (landed ~%.2f €, margin 37.5%%) to cover 10 500 € of fixed cost" % rows[1]['landed'])
    be = 10500 / (rows[1]['sell16'] - rows[1]['landed'])
    print(f"  {be:.0f} cups, or {be/600:.1f} pilots of 600")

    print("\nSCALE: 3 000 pieces a year, average landed 9 €, x1.6")
    for avg_landed in (6, 9, 12):
        rev = avg_landed * 1.6 * 3000
        gpm = 0.375
        print(f"  landed {avg_landed:>2} € -> revenue {rev:>9.0f} €  gross profit {rev*gpm:>8.0f} €")