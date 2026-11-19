import json, os, re, time, urllib.parse, urllib.request

API = "https://commons.wikimedia.org/w/api.php"
UA = "MugenikiCatalogueBot/1.0 (contact: contact@mugeneki.com)"
OUT = "public/catalogue"

# slug -> (search term, must-match words in the file title)
WANTED = [
    ("konoha-round-donburi", "Arita ware bowl porcelain", ["bowl"]),
    ("kohanako-round-donburi", "Kakiemon floral bowl Arita", ["bowl"]),
    ("kanure-mug", "Arita cups and saucers porcelain", ["cup"]),
    ("hana-musubi-bowl", "Arita ware dish Quail Design", ["dish"]),
    ("sanbo-naburi-bowl", "Arita bowl enameling Peabody", ["bowl"]),
    ("rinka-plate-large", "Arita charger VOC emblem", ["charger", "dish"]),
    ("kikuzaki-oval-plates", "Arita dish Prunus Bamboo", ["dish"]),
    ("rib-hakkaku-plate", "Decagonal plate Tiger Tree Arita", ["plate", "dish"]),
    ("shinogi-soba-cup", "Arita dish Rooster Design", ["dish"]),
    ("shochikubai-small-dish-set", "Imari dish cranes", ["dish"]),
    ("kashogama-tea-bowls", "Shino chawan tea bowl", ["chawan", "bowl"]),
    ("kashogama-mizusashi", "mizusashi water jar Japanese", ["jar", "mizusashi"]),
    ("kashogama-hotel-tableware", "Kyoto ware square dishes Edo", ["dish"]),
]

GOOD_LICENSE = ("cc0", "public domain", "cc by 3.0", "cc by 4.0", "cc by-sa 4.0", "cc by-sa 3.0")


def api(params):
    params["format"] = "json"
    url = API + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.load(r)


def clean(html):
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", html or "")).strip()


def search(term, limit=14):
    data = api({
        "action": "query",
        "generator": "search",
        "gsrsearch": f"filetype:bitmap {term}",
        "gsrnamespace": "6",
        "gsrlimit": str(limit),
        "prop": "imageinfo",
        "iiprop": "url|size|extmetadata",
        "iiurlwidth": "1400",
    })
    out = []
    for page in (data.get("query", {}).get("pages", {}) or {}).values():
        ii = (page.get("imageinfo") or [{}])[0]
        meta = ii.get("extmetadata", {})
        out.append({
            "title": page.get("title"),
            "thumb": ii.get("thumburl"),
            "page": ii.get("descriptionurl"),
            "w": ii.get("width"),
            "h": ii.get("height"),
            "license": clean(meta.get("LicenseShortName", {}).get("value")),
            "licenseUrl": clean(meta.get("LicenseUrl", {}).get("value")),
            "artist": clean(meta.get("Artist", {}).get("value")) or "Unknown",
            "credit": clean(meta.get("Credit", {}).get("value")),
        })
    return out


def download(url, path, tries=4):
    last = None
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=90) as r:
                data = r.read()
            if len(data) < 8000:
                raise RuntimeError(f"small file {len(data)}")
            with open(path, "wb") as f:
                f.write(data)
            return len(data)
        except Exception as e:
            last = e
            time.sleep(2.5)
    raise last


os.makedirs(OUT, exist_ok=True)
used = set()
result = {}

for slug, term, must in WANTED:
    candidates = []
    for c in search(term):
        lic = (c.get("license") or "").lower()
        title = (c.get("title") or "")
        if not any(lic.startswith(g) or g in lic for g in GOOD_LICENSE):
            continue
        if title in used:
            continue
        if must and not any(m.lower() in title.lower() for m in must):
            continue
        if (c.get("w") or 0) < 800:
            continue
        candidates.append(c)
    if not candidates:
        print(f"{slug}: NO CANDIDATE for {term}", flush=True)
        continue
    cand = candidates[0]
    used.add(cand["title"])
    path = f"{OUT}/{slug}.jpg"
    try:
        size = download(cand["thumb"], path)
    except Exception as e:
        print(f"{slug}: download failed {e}", flush=True)
        continue
    cand["local"] = f"/catalogue/{slug}.jpg"
    cand["bytes"] = size
    result[slug] = cand
    print(f"{slug}: {size // 1024} KB | {cand['license']} | {cand['artist'][:40]} | {cand['title'][:60]}", flush=True)
    time.sleep(0.6)

with open("src/data/photos.json", "w") as f:
    json.dump(result, f, ensure_ascii=False, indent=2)
print(f"\n{len(result)}/{len(WANTED)} downloaded -> src/data/photos.json")