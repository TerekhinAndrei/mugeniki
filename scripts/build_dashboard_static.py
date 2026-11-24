#!/usr/bin/env python3
"""Сборка дашборда Mugeniki: данные в HTML, скрипт — только фильтры и правки.

Важно: карточки, таблица товаров, переписка и счётчики рендерятся здесь,
в Python, поэтому страница показывает данные сразу — в том числе там,
где JavaScript не выполняется (предпросмотр в чате).
"""
import html as H
import pathlib
import sys

HERE = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import build_suppliers_db as base  # noqa: E402

JPY = base.JPY_EUR
STATUSES = base.STATUSES

SUP_KEYS = [
    "id", "nameJa", "nameLat", "status", "region", "city", "technique", "founded",
    "makes", "price", "exworks", "moq", "capacity", "lead", "unique", "export",
    "lang", "email", "phone", "site", "source", "checked", "nextStep", "nextDate",
    "risks", "rating",
]
PROD_KEYS = [
    "id", "maker", "name", "nameJa", "category", "technique", "size",
    "priceJpy", "moq", "lead", "exportStatus", "source", "checked", "note",
]
MAIL_KEYS = ["date", "supplier", "direction", "subject", "summary", "next"]

SUP = [dict(zip(SUP_KEYS, r)) for r in base.SUPPLIERS]
PROD = []
for r in base.PRODUCTS:
    d = dict(zip(PROD_KEYS, r))
    d["priceEur"] = round(d["priceJpy"] * JPY, 2) if isinstance(d["priceJpy"], (int, float)) else None
    PROD.append(d)
MAIL = [dict(zip(MAIL_KEYS, r)) for r in base.MAILS]


def esc(v):
    return H.escape(str(v if v is not None else ""))


def status_class(st):
    if st.startswith("Резерв"):
        return "st-reserve"
    if st.startswith("Не контактировали") or st.startswith("Отказ"):
        return "st-none"
    if st.startswith("Письмо отправлено"):
        return "st-work"
    return "st-replied"


def unique_class(u):
    if u.startswith("Представлен"):
        return "u-wide"
    if u.startswith("Выходил"):
        return "u-point"
    if u.startswith("Не выходил"):
        return "u-none"
    return "st-none"


def short_status(st):
    return st.replace("Резерв: ", "Резерв · ").replace("Письмо отправлено — ждём ответ", "Письмо отправлено")


def status_group(st):
    return short_status(st).split(" · ")[0]


def iso_date(d):
    if not d or d in ("—", "неизвестно"):
        return "9999-12-31"
    parts = d.split(".")
    return f"{parts[2]}-{parts[1]}-{parts[0]}" if len(parts) == 3 else "9999-12-31"


def stars_html(s):
    out = [f'<span class="stars" data-id="{s["id"]}" role="group" aria-label="Оценка 1-5">']
    for i in range(1, 6):
        out.append(f'<span class="{"on" if i <= s["rating"] else ""}" data-v="{i}">★</span>')
    out.append("</span>")
    return "".join(out)


def card_html(s):
    search = " ".join([
        s["nameJa"], s["nameLat"], s["region"], s["city"], s["technique"], s["makes"],
        s["export"], s["risks"], s["status"], s["unique"],
        " ".join(p["name"] + " " + p["nameJa"] for p in PROD if p["maker"] == s["nameJa"]),
    ]).lower()
    site = s["site"]
    site_cell = (f'<a href="{esc(site)}" target="_self" rel="noopener">'
                 f'{esc(site.replace("https://", "").replace("http://", ""))}</a>'
                 if site.startswith("http") else esc(site))
    opts = "".join(f'<option{" selected" if x == s["status"] else ""}>{esc(x)}</option>' for x in STATUSES)
    return f"""<article class="card" data-id="{s['id']}" data-text="{esc(search)}"
  data-rating="{s['rating']}" data-sort-date="{iso_date(s['nextDate'])}"
  data-name="{esc(s['nameLat'])}" data-region="{esc(s['region'])}"
  data-unique="{esc(s['unique'])}" data-group="{esc(status_group(s['status']))}"
  data-status="{esc(s['status'])}">
  <div class="card-head">
    <div>
      <h3>{esc(s['nameJa'])}<span class="lat">{esc(s['nameLat'])}</span></h3>
      <div class="meta">{esc(s['region'])} · {esc(s['city'])} · {esc(s['technique'])}</div>
    </div>
    <div class="badges">
      <span class="badge {status_class(s['status'])}" data-badge="status">{esc(short_status(s['status']))}</span>
      <span class="badge {unique_class(s['unique'])}">{esc(s['unique'])}</span>
      {stars_html(s)}
    </div>
  </div>
  <dl class="facts">
    <div class="fact"><div class="k">Основано</div><div class="v">{esc(s['founded'])}</div></div>
    <div class="fact"><div class="k">Цена мастерской</div><div class="v">{esc(s['price'])}</div></div>
    <div class="fact"><div class="k">Ex-works</div><div class="v">{esc(s['exworks'])}</div></div>
    <div class="fact"><div class="k">MOQ</div><div class="v">{esc(s['moq'])}</div></div>
    <div class="fact"><div class="k">Мощность</div><div class="v">{esc(s['capacity'])}</div></div>
    <div class="fact"><div class="k">Срок</div><div class="v">{esc(s['lead'])}</div></div>
    <div class="fact"><div class="k">Язык</div><div class="v">{esc(s['lang'])}</div></div>
    <div class="fact"><div class="k">Проверено</div><div class="v">{esc(s['checked'])}</div></div>
    <div class="fact wide"><div class="k">Что производит</div><div class="v">{esc(s['makes'])}</div></div>
    <div class="fact wide"><div class="k">Экспорт: подтверждённые факты</div><div class="v">{esc(s['export'])}</div></div>
    <div class="fact wide"><div class="k">Риски</div><div class="v">{esc(s['risks'])}</div></div>
  </dl>
  <div class="next">
    <span><b>Следующий шаг:</b> {esc(s['nextStep'])}</span>
    <span><b>{esc(s['nextDate'])}</b></span>
  </div>
  <div class="card-foot">
    <label for="st-{s['id']}">Статус</label>
    <select id="st-{s['id']}" data-status="{s['id']}">{opts}</select>
    <span class="note"><input type="text" data-note="{s['id']}" value=""
      placeholder="Заметка: что спросили, что ответили…" aria-label="Заметка"></span>
  </div>
  <details class="more">
    <summary>Контакты и источник</summary>
    <dl class="facts">
      <div class="fact"><div class="k">Email</div><div class="v">{esc(s['email'])}</div></div>
      <div class="fact"><div class="k">Телефон</div><div class="v">{esc(s['phone'])}</div></div>
      <div class="fact"><div class="k">Сайт</div><div class="v">{site_cell}</div></div>
      <div class="fact"><div class="k">Источник контакта</div><div class="v">{esc(s['source'])}</div></div>
    </dl>
  </details>
</article>"""


MAX_P = max([p["priceJpy"] for p in PROD if p["priceJpy"]] or [1])


def prod_row(p):
    w = round(p["priceJpy"] / MAX_P * 100) if p["priceJpy"] else 0
    price = f"¥{p['priceJpy']:,}".replace(",", " ") if p["priceJpy"] else "по запросу"
    eur = f"€{p['priceEur']:.2f}".replace(".", ",") if p["priceEur"] else "—"
    bar = f'<div class="pricebar"><i style="width:{w}%"></i></div>' if w else ""
    text = " ".join([p["name"], p["nameJa"], p["maker"], p["technique"], p["note"], p["size"]]).lower()
    return f"""<tr data-maker="{esc(p['maker'])}" data-cat="{esc(p['category'])}" data-text="{esc(text)}">
  <td><b>{esc(p['name'])}</b><div class="meta">{esc(p['nameJa'])}</div><div class="meta">{esc(p['note'])}</div></td>
  <td>{esc(p['maker'])}</td><td>{esc(p['category'])}</td><td>{esc(p['size'])}</td>
  <td class="num">{price}{bar}</td><td class="num">{eur}</td>
  <td>{esc(p['moq'])}</td><td>{esc(p['lead'])}</td>
</tr>"""


def mail_html(m):
    cls = "mail in" if m["direction"].startswith("←") else "mail"
    return f"""<div class="{cls}">
  <div class="when">{esc(m['date'])} · {esc(m['supplier'])} · {esc(m['direction'])}</div>
  <h4>{esc(m['subject'])}</h4>
  <p>{esc(m['summary'])}</p>
  <div class="nxt">→ {esc(m['next'])}</div>
</div>"""


def bar_html(entries):
    mx = max([v for _, v in entries] or [1])
    return "".join(
        f'<div class="bar"><span class="lbl" title="{esc(k)}">{esc(k)}</span>'
        f'<span class="track"><span class="fill" style="width:{round(v / mx * 100)}%"></span></span>'
        f'<span class="num">{v}</span></div>' for k, v in entries
    )


def counter(items):
    d = {}
    for i in items:
        d[i] = d.get(i, 0) + 1
    return sorted(d.items(), key=lambda kv: -kv[1])


def _replied(st):
    return st.startswith("Ответ")


kpi_replied = sum(1 for s in SUP if _replied(s["status"]))
kpi_waiting = sum(1 for s in SUP if s["status"].startswith("Письмо"))
kpi_none = sum(1 for s in SUP if s["status"].startswith("Не контактировали"))
kpi_reserve = sum(1 for s in SUP if s["status"].startswith("Резерв"))
SUBTEXT = (
    f"{len(SUP)} поставщиков: {kpi_replied} уже ответили, {kpi_waiting} ждут ответа, "
    f"{kpi_none} ещё не получали письма, {kpi_reserve} — резерв. "
    f"Данные проверены 19–24 ноября 2026, ответы пришли 24 ноября."
)

KBARS = bar_html(counter([status_group(s["status"]) for s in SUP]))
RBARS = bar_html(counter([s["region"] for s in SUP]))
CARDS = "\n".join(card_html(s) for s in SUP)
ROWS = "\n".join(prod_row(p) for p in PROD)
MAILS_HTML = "\n".join(mail_html(m) for m in MAIL)
REGIONS = sorted({s["region"] for s in SUP})
MAKERS = list(dict.fromkeys(p["maker"] for p in PROD))
CATS = list(dict.fromkeys(p["category"] for p in PROD))

REGION_OPTS = "".join(f"<option>{esc(r)}</option>" for r in REGIONS)
MAKER_OPTS = "".join(f"<option>{esc(m)}</option>" for m in MAKERS)
CAT_OPTS = "".join(f"<option>{esc(c)}</option>" for c in CATS)

PAGE = """<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Mugeniki — поставщики</title>
<style>
:root{--paper:#faf7f1;--card:#fffdf9;--ink:#1b2420;--muted:#6f6a5f;--line:#e3dccd;
--accent:#2f5d50;--accent-soft:#e8efeb;--terra:#b4552d;--gold:#b08a3e}
*{box-sizing:border-box}
body{margin:0;background:var(--paper);color:var(--ink);font-size:15px;line-height:1.5;
font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Hiragino Sans","Noto Sans JP",Roboto,Helvetica,Arial,sans-serif;
-webkit-font-smoothing:antialiased}
a{color:var(--accent);text-decoration:none;border-bottom:1px solid rgba(47,93,80,.3)}
.wrap{max-width:1180px;margin:0 auto;padding:0 20px 60px}
header.top{padding:34px 0 18px;border-bottom:1px solid var(--line);margin-bottom:22px}
.brand{font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:var(--muted)}
h1{font-size:29px;line-height:1.2;margin:8px 0 6px;font-weight:600;letter-spacing:-.01em}
.sub{color:var(--muted);margin:0;max-width:660px}
.kpis{display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin:24px 0 6px}
.kpi{background:var(--card);border:1px solid var(--line);border-radius:10px;padding:14px 16px}
.kpi .n{font-size:26px;font-weight:600;letter-spacing:-.02em}
.kpi .l{font-size:12px;color:var(--muted);margin-top:2px}
.kpi.hot .n{color:var(--terra)}
nav.tabs{display:flex;gap:6px;flex-wrap:wrap;margin:26px 0 20px;border-bottom:1px solid var(--line)}
nav.tabs button{appearance:none;background:none;border:0;border-bottom:2px solid transparent;padding:10px 14px;
font:inherit;color:var(--muted);cursor:pointer;border-radius:6px 6px 0 0}
nav.tabs button:hover{background:#f2ede2}
nav.tabs button[aria-selected="true"]{color:var(--ink);border-bottom-color:var(--accent);font-weight:600}
.panel[hidden]{display:none}
.controls{display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-bottom:16px}
input[type=search],select{font:inherit;padding:8px 11px;border:1px solid var(--line);border-radius:8px;
background:var(--card);color:var(--ink);min-width:150px}
input[type=search]{min-width:240px;flex:1;max-width:340px}
input[type=search]:focus,select:focus{outline:2px solid var(--accent-soft);border-color:var(--accent)}
.pill{font:inherit;font-size:13px;padding:6px 12px;border:1px solid var(--line);border-radius:999px;
background:var(--card);cursor:pointer;color:var(--muted)}
.pill[aria-pressed="true"]{background:var(--accent);border-color:var(--accent);color:#fff}
.charts{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin:4px 0 26px}
.chart{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:16px 18px}
.chart h3{margin:0 0 12px;font-size:13px;text-transform:uppercase;letter-spacing:.08em;color:var(--muted);font-weight:600}
.bar{display:grid;grid-template-columns:132px 1fr 26px;align-items:center;gap:10px;margin:7px 0;font-size:13px}
.bar .track{background:#efeade;border-radius:4px;height:9px;overflow:hidden}
.bar .fill{height:100%;background:var(--accent);border-radius:4px}
.bar .num{text-align:right;color:var(--muted);font-variant-numeric:tabular-nums}
.bar .lbl{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cards{display:grid;grid-template-columns:1fr;gap:16px}
.card{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:18px 20px}
.card-head{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;align-items:flex-start}
.card h3{margin:0;font-size:19px;font-weight:600}
.card h3 .lat{font-size:13px;color:var(--muted);font-weight:400;margin-left:8px}
.meta{color:var(--muted);font-size:13px;margin-top:3px}
.badges{display:flex;gap:6px;flex-wrap:wrap;align-items:center}
.badge{font-size:12px;padding:4px 10px;border-radius:999px;border:1px solid var(--line);background:#f6f2e9;
color:var(--muted);white-space:nowrap}
.badge.st-work{background:#fff4e6;border-color:#f0d4ac;color:#8a5a12}
.badge.st-replied{background:#e8f3ec;border-color:#bcdcc7;color:#28583c}
.badge.st-none{background:#f2efe8;color:var(--muted)}
.badge.st-reserve{background:#efe9f2;border-color:#d8cde0;color:#5d4670}
.badge.u-wide{background:#f7ece9;border-color:#e6c9c0;color:#8f4a34}
.badge.u-point{background:#eef1f6;border-color:#cfd8e6;color:#3c5378}
.badge.u-none{background:var(--accent-soft);border-color:#c9dcd2;color:#2b5445}
.stars{display:inline-flex;gap:2px;cursor:pointer;font-size:15px;color:#cfc6b2;user-select:none}
.stars span.on{color:var(--gold)}
.facts{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px 22px;margin:16px 0 0;
padding:16px 0 0;border-top:1px dashed var(--line)}
.fact .k{font-size:11px;letter-spacing:.07em;text-transform:uppercase;color:var(--muted)}
.fact .v{font-size:14px;margin-top:2px}
.fact.wide{grid-column:1/-1}
.next{background:#f6f2e9;border-radius:8px;padding:10px 12px;font-size:14px;margin-top:14px;
display:flex;gap:10px;flex-wrap:wrap;justify-content:space-between}
.card-foot{display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-top:14px;padding-top:14px;
border-top:1px dashed var(--line)}
.card-foot label{font-size:12px;color:var(--muted);letter-spacing:.04em;text-transform:uppercase}
.note{flex:1;min-width:200px}
.note input{width:100%;font:inherit;font-size:13px;padding:7px 10px;border:1px solid var(--line);
border-radius:7px;background:#fff}
details.more{margin-top:12px}
details.more summary{cursor:pointer;font-size:13px;color:var(--accent);list-style:none}
details.more summary::-webkit-details-marker{display:none}
details.more summary::before{content:"+ ";font-weight:600}
details.more[open] summary::before{content:"- "}
table{width:100%;border-collapse:collapse;background:var(--card);border:1px solid var(--line)}
th,td{text-align:left;padding:11px 12px;border-bottom:1px solid var(--line);vertical-align:top;font-size:14px}
th{font-size:11px;text-transform:uppercase;letter-spacing:.07em;color:var(--muted);background:#f6f2e9;
font-weight:600;white-space:nowrap}
tr:last-child td{border-bottom:0}
td.num{text-align:right;font-variant-numeric:tabular-nums;white-space:nowrap}
.pricebar{height:6px;background:#efeade;border-radius:3px;margin-top:6px;overflow:hidden;min-width:60px}
.pricebar i{display:block;height:100%;background:var(--terra);border-radius:3px}
.timeline{position:relative;padding-left:22px;margin:10px 0 0}
.timeline::before{content:"";position:absolute;left:6px;top:6px;bottom:6px;width:1px;background:var(--line)}
.mail{position:relative;margin-bottom:20px}
.mail::before{content:"";position:absolute;left:-20px;top:6px;width:9px;height:9px;border-radius:50%;
background:var(--accent);border:2px solid var(--paper)}
.mail.in::before{background:var(--terra)}
.mail .when{font-size:12px;color:var(--muted)}
.mail h4{margin:2px 0 4px;font-size:15px;font-weight:600}
.mail p{margin:0;color:#3a3f3a;font-size:14px}
.mail .nxt{margin-top:6px;font-size:13px;color:var(--muted)}
.databox{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:20px;max-width:760px}
.databox h3{margin:0 0 6px;font-size:16px}
.databox p{color:var(--muted);font-size:14px;margin:0 0 14px}
.btnrow{display:flex;gap:10px;flex-wrap:wrap}
.btn{font:inherit;font-size:14px;padding:9px 16px;border-radius:8px;cursor:pointer;border:1px solid var(--accent);
background:var(--accent);color:#fff;display:inline-block}
.btn.ghost{background:transparent;color:var(--accent)}
.btn.danger{border-color:var(--terra);color:var(--terra);background:transparent}
.hint{font-size:13px;color:var(--muted);margin-top:14px;line-height:1.6}
.empty{padding:26px;text-align:center;color:var(--muted);background:var(--card);
border:1px dashed var(--line);border-radius:12px}
@media (max-width:900px){.kpis{grid-template-columns:repeat(2,1fr)}.charts{grid-template-columns:1fr}
h1{font-size:24px}}
@media print{nav.tabs,.controls,.card-foot,.btnrow{display:none}.card{break-inside:avoid}}
</style>
</head>
<body>
<div class="wrap">
<header class="top">
  <div class="brand">Mugeniki · база поставщиков</div>
  <h1>Мастерские, товары и переписка</h1>
  <p class="sub">__SUBTEXT__</p>
  <div class="kpis">
    <div class="kpi"><div class="n">__NSUP__</div><div class="l">поставщиков</div></div>
    <div class="kpi hot"><div class="n" id="kReplied">__KREPL__</div><div class="l">ответили</div></div>
    <div class="kpi"><div class="n" id="kWaiting">__KWAIT__</div><div class="l">ждут ответа</div></div>
    <div class="kpi"><div class="n" id="kNone">__KNONE__</div><div class="l">не контактировали</div></div>
    <div class="kpi"><div class="n">__NPROD__</div><div class="l">товаров в базе</div></div>
  </div>
</header>

<nav class="tabs" role="tablist">
  <button role="tab" aria-selected="true" data-panel="p-sup">Поставщики</button>
  <button role="tab" aria-selected="false" data-panel="p-prod">Товары</button>
  <button role="tab" aria-selected="false" data-panel="p-mail">Переписка</button>
  <button role="tab" aria-selected="false" data-panel="p-data">Данные</button>
</nav>

<section class="panel" id="p-sup" role="tabpanel">
  <div class="charts">
    <div class="chart"><h3>По статусу</h3><div id="chStatus">__KBARS__</div></div>
    <div class="chart"><h3>По региону</h3><div id="chRegion">__RBARS__</div></div>
  </div>
  <div class="controls">
    <input type="search" id="q" placeholder="Поиск: имя, техника, регион, товар…" aria-label="Поиск по поставщикам">
    <select id="fRegion" aria-label="Регион"><option value="">Все регионы</option>__REGION_OPTS__</select>
    <select id="fUnique" aria-label="Тест уникальности"><option value="">Любая уникальность</option>
      <option>Не выходил на внешние рынки</option><option>Выходил точечно</option>
      <option>Представлен широко</option><option>Не проверено</option></select>
    <select id="fSort" aria-label="Сортировка">
      <option value="rating">Сначала сильные</option><option value="date">Ближайший шаг</option>
      <option value="name">По названию</option></select>
    <button class="pill" id="pinActive" aria-pressed="false">Только в работе</button>
  </div>
  <div class="cards" id="cards">
__CARDS__
  </div>
  <div class="empty" id="noCards" hidden>Под фильтр ничего не подошло.</div>
</section>

<section class="panel" id="p-prod" role="tabpanel" hidden>
  <div class="controls">
    <input type="search" id="pq" placeholder="Поиск по товарам…" aria-label="Поиск по товарам">
    <select id="pMaker" aria-label="Поставщик"><option value="">Все поставщики</option>__MAKER_OPTS__</select>
    <select id="pCat" aria-label="Категория"><option value="">Все категории</option>__CAT_OPTS__</select>
  </div>
  <table>
    <thead><tr><th>Товар</th><th>Поставщик</th><th>Категория</th><th>Размер</th>
      <th style="text-align:right">Розница JP</th><th style="text-align:right">≈ €</th>
      <th>MOQ</th><th>Срок</th></tr></thead>
    <tbody id="prodBody">
__ROWS__
    </tbody>
  </table>
  <p class="hint">Курс пересчёта: 1 JPY = __RATE__ EUR (20.11.2026). Ex-works и MOQ под объём мастерские
  не публикуют — эти поля появятся после ответов.</p>
</section>

<section class="panel" id="p-mail" role="tabpanel" hidden>
  <div class="timeline">
__MAILS__
  </div>
</section>

<section class="panel" id="p-data" role="tabpanel" hidden>
  <div class="databox">
    <h3>Как обновлять</h3>
    <p>Статусы, оценки и заметки, которые вы меняете в карточках, сохраняются в этом браузере.
    Чтобы перенести их на другое устройство или отдать мне — выгрузите JSON.</p>
    <div class="btnrow">
      <button class="btn" id="exportBtn">Выгрузить JSON</button>
      <label class="btn ghost">Загрузить JSON<input type="file" id="importFile" accept="application/json" hidden></label>
      <button class="btn danger" id="resetBtn">Сбросить правки</button>
    </div>
    <div class="hint" id="dirty">Правок пока нет: показываются данные базы.</div>
    <div class="hint">Базовые данные — из файла <b>mugeniki-suppliers.xlsx</b>. Правки в браузере сам файл
    не меняют: чтобы они попали в базу, пришлите выгруженный JSON.</div>
  </div>
</section>
</div>

<script>
(function(){
  var STORE = "mugeniki-suppliers-v1";
  var $ = function(s, r){ return (r||document).querySelector(s); };
  var $$ = function(s, r){ return Array.prototype.slice.call((r||document).querySelectorAll(s)); };
  var cards = $$("#cards .card");
  var edits = {};
  try { edits = JSON.parse(localStorage.getItem(STORE) || "{}"); } catch(e) { edits = {}; }

  function statusClass(st){
    if (st.indexOf("Резерв") === 0) return "st-reserve";
    if (st.indexOf("Не контактировали") === 0 || st.indexOf("Отказ") === 0) return "st-none";
    if (st.indexOf("Письмо отправлено") === 0) return "st-work";
    return "st-replied";
  }
  function shortStatus(st){
    return st.replace("Резерв: ", "Резерв · ").replace("Письмо отправлено — ждём ответ", "Письмо отправлено");
  }
  function save(){
    try { localStorage.setItem(STORE, JSON.stringify(edits)); } catch(e) {}
    paintDirty();
  }
  function paintDirty(){
    var el = $("#dirty");
    if (!el) return;
    var n = Object.keys(edits).length;
    el.textContent = n ? "Правок в этом браузере: " + n +
      ". Они сохранены локально и попадут в базу только через выгрузку." :
      "Правок пока нет: показываются данные базы.";
  }
  function setStatusUI(card, st){
    var b = card.querySelector('[data-badge="status"]');
    if (b){ b.textContent = shortStatus(st); b.className = "badge " + statusClass(st); }
    card.dataset.status = st;
    card.dataset.group = shortStatus(st).split(" · ")[0];
  }
  function applyEdit(card){
    var id = card.dataset.id, e = edits[id];
    if (!e) return;
    if (e.status){
      var sel = card.querySelector("select[data-status]");
      if (sel) sel.value = e.status;
      setStatusUI(card, e.status);
    }
    if (e.rating){
      card.dataset.rating = e.rating;
      $$(".stars span", card).forEach(function(sp){
        sp.classList.toggle("on", Number(sp.dataset.v) <= e.rating);
      });
    }
    if (e.note){
      var inp = card.querySelector("input[data-note]");
      if (inp) inp.value = e.note;
    }
  }
  function bars(obj){
    var ent = Object.keys(obj).map(function(k){ return [k, obj[k]]; })
      .sort(function(a,b){ return b[1]-a[1]; });
    var mx = Math.max.apply(null, ent.map(function(e){ return e[1]; }).concat([1]));
    return ent.map(function(e){
      return '<div class="bar"><span class="lbl" title="' + e[0] + '">' + e[0] + '</span>' +
        '<span class="track"><span class="fill" style="width:' + Math.round(e[1]/mx*100) + '%"></span></span>' +
        '<span class="num">' + e[1] + '</span></div>';
    }).join("");
  }
  function recount(){
    var replied = 0, waiting = 0, none = 0, byStatus = {}, byRegion = {};
    cards.forEach(function(c){
      var st = c.dataset.status, g = c.dataset.group, r = c.dataset.region;
      if (st.indexOf("Ответ") === 0) replied++;
      else if (st.indexOf("Письмо") === 0) waiting++;
      else if (st.indexOf("Не контактировали") === 0) none++;
      byStatus[g] = (byStatus[g] || 0) + 1;
      byRegion[r] = (byRegion[r] || 0) + 1;
    });
    if ($("#kReplied")) $("#kReplied").textContent = replied;
    if ($("#kWaiting")) $("#kWaiting").textContent = waiting;
    if ($("#kNone")) $("#kNone").textContent = none;
    if ($("#chStatus")) $("#chStatus").innerHTML = bars(byStatus);
    if ($("#chRegion")) $("#chRegion").innerHTML = bars(byRegion);
  }
  function filterCards(){
    var q = ($("#q") ? $("#q").value : "").trim().toLowerCase();
    var region = $("#fRegion") ? $("#fRegion").value : "";
    var uniq = $("#fUnique") ? $("#fUnique").value : "";
    var only = $("#pinActive") && $("#pinActive").getAttribute("aria-pressed") === "true";
    var shown = 0;
    cards.forEach(function(c){
      var ok = true;
      if (region && c.dataset.region !== region) ok = false;
      if (uniq && c.dataset.unique.indexOf(uniq) !== 0) ok = false;
      if (only && (c.dataset.status.indexOf("Резерв") === 0 || c.dataset.status.indexOf("Отказ") === 0)) ok = false;
      if (ok && q && c.dataset.text.indexOf(q) < 0) ok = false;
      c.hidden = !ok;
      if (ok) shown++;
    });
    if ($("#noCards")) $("#noCards").hidden = shown > 0;
  }
  function sortCards(){
    var mode = $("#fSort") ? $("#fSort").value : "rating";
    var box = $("#cards");
    if (!box) return;
    var arr = cards.slice();
    arr.sort(function(a,b){
      if (mode === "rating"){
        var d = Number(b.dataset.rating) - Number(a.dataset.rating);
        return d !== 0 ? d : a.dataset.sortDate.localeCompare(b.dataset.sortDate);
      }
      if (mode === "date") return a.dataset.sortDate.localeCompare(b.dataset.sortDate);
      return a.dataset.name.localeCompare(b.dataset.name);
    });
    arr.forEach(function(c){ box.appendChild(c); });
  }
  function filterProducts(){
    var q = ($("#pq") ? $("#pq").value : "").trim().toLowerCase();
    var maker = $("#pMaker") ? $("#pMaker").value : "";
    var cat = $("#pCat") ? $("#pCat").value : "";
    $$("#prodBody tr").forEach(function(tr){
      var ok = true;
      if (maker && tr.dataset.maker !== maker) ok = false;
      if (cat && tr.dataset.cat !== cat) ok = false;
      if (ok && q && tr.dataset.text.indexOf(q) < 0) ok = false;
      tr.hidden = !ok;
    });
  }

  cards.forEach(applyEdit);
  recount(); paintDirty(); sortCards();

  if ($("#q")) $("#q").addEventListener("input", filterCards);
  if ($("#fRegion")) $("#fRegion").addEventListener("change", filterCards);
  if ($("#fUnique")) $("#fUnique").addEventListener("change", filterCards);
  if ($("#fSort")) $("#fSort").addEventListener("change", sortCards);
  if ($("#pinActive")) $("#pinActive").addEventListener("click", function(e){
    var on = e.currentTarget.getAttribute("aria-pressed") === "true";
    e.currentTarget.setAttribute("aria-pressed", String(!on));
    filterCards();
  });
  if ($("#pq")) $("#pq").addEventListener("input", filterProducts);
  if ($("#pMaker")) $("#pMaker").addEventListener("change", filterProducts);
  if ($("#pCat")) $("#pCat").addEventListener("change", filterProducts);

  document.addEventListener("change", function(e){
    var id = e.target.dataset ? e.target.dataset.status : null;
    if (id && e.target.tagName === "SELECT"){
      var card = e.target.closest(".card");
      edits[id] = edits[id] || {};
      edits[id].status = e.target.value;
      setStatusUI(card, e.target.value);
      save(); recount(); filterCards(); sortCards();
    }
  });
  document.addEventListener("input", function(e){
    var id = e.target.dataset ? e.target.dataset.note : null;
    if (id){
      edits[id] = edits[id] || {};
      edits[id].note = e.target.value;
      save();
    }
  });
  document.addEventListener("click", function(e){
    var star = e.target.closest ? e.target.closest(".stars span") : null;
    if (star){
      var box = star.parentElement;
      var id = box.dataset.id;
      var v = Number(star.dataset.v);
      edits[id] = edits[id] || {};
      edits[id].rating = v;
      var card = box.closest(".card");
      card.dataset.rating = v;
      $$("span", box).forEach(function(sp){ sp.classList.toggle("on", Number(sp.dataset.v) <= v); });
      save(); recount(); sortCards();
    }
  });
  $$("nav.tabs button").forEach(function(b){
    b.addEventListener("click", function(){
      $$("nav.tabs button").forEach(function(x){ x.setAttribute("aria-selected", String(x === b)); });
      $$(".panel").forEach(function(p){ p.hidden = p.id !== b.dataset.panel; });
    });
  });
  if ($("#exportBtn")) $("#exportBtn").addEventListener("click", function(){
    var blob = new Blob([JSON.stringify({savedAt: new Date().toISOString(), edits: edits}, null, 2)],
      {type: "application/json"});
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "mugeniki-edits.json";
    a.click();
    URL.revokeObjectURL(a.href);
  });
  if ($("#importFile")) $("#importFile").addEventListener("change", function(ev){
    var f = ev.target.files[0];
    if (!f) return;
    var r = new FileReader();
    r.onload = function(){
      try {
        var obj = JSON.parse(r.result);
        var incoming = obj.edits || obj;
        Object.keys(incoming).forEach(function(k){
          edits[k] = Object.assign({}, edits[k], incoming[k]);
        });
        save();
        cards.forEach(applyEdit);
        recount(); sortCards();
        alert("Загружено правок: " + Object.keys(incoming).length);
      } catch(err) { alert("Не удалось прочитать файл: " + err.message); }
    };
    r.readAsText(f);
  });
  if ($("#resetBtn")) $("#resetBtn").addEventListener("click", function(){
    if (!confirm("Сбросить все статусы, оценки и заметки в этом браузере?")) return;
    edits = {};
    save();
    cards.forEach(function(c){
      $$(".stars span", c).forEach(function(sp){
        sp.classList.toggle("on", Number(sp.dataset.v) <= Number(c.dataset.rating));
      });
      var inp = c.querySelector("input[data-note]"); if (inp) inp.value = "";
    });
    recount();
  });
})();
</script>
</body>
</html>
"""

PAGE = (PAGE
        .replace("__NSUP__", str(len(SUP)))
        .replace("__SUBTEXT__", SUBTEXT)
        .replace("__KREPL__", str(kpi_replied))
        .replace("__KWAIT__", str(kpi_waiting))
        .replace("__KNONE__", str(kpi_none))
        .replace("__NPROD__", str(len(PROD)))
        .replace("__KBARS__", KBARS)
        .replace("__RBARS__", RBARS)
        .replace("__CARDS__", CARDS)
        .replace("__ROWS__", ROWS)
        .replace("__MAILS__", MAILS_HTML)
        .replace("__REGION_OPTS__", REGION_OPTS)
        .replace("__MAKER_OPTS__", MAKER_OPTS)
        .replace("__CAT_OPTS__", CAT_OPTS)
        .replace("__RATE__", str(JPY)))

out = pathlib.Path("mugeniki-dashboard.html")
out.write_text(PAGE, encoding="utf-8")
print("saved", out, len(PAGE.encode()), "bytes")
print("поставщиков:", len(SUP), "товаров:", len(PROD), "писем:", len(MAIL))