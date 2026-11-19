import json, os, re, time, urllib.parse, urllib.request

API = "https://commons.wikimedia.org/w/api.php"
UA = "MugenikiCatalogueBot/1.0 (contact: contact@mugeneki.com)"
OUT = "public/catalogue"

# slug -> (search term, must words, must-not words)
FIX = [
    ("konoha-round-donburi", "Arita ware bowl Edo porcelain Peabody", ["bowl"], ["kakiemon", "floral"]),
    ("shinogi-soba-cup", "sobachoko soba choko cup", ["choko", "cup", "yunomi"], ["dish"]),
    ("kashogama-mizusashi", "mizusashi fresh water jar Japan Edo pottery", ["mizusashi", "water jar"], ["chinese", "lio"]),
    ("shochikubai-small-dish-set", "Japanese porcelain set of dishes box Edo gift", ["set", "dishes", "box"], ["cranes"]),
]

GOOD_LICENSE = ("cc0", "public domain", "cc by 3.0", "cc by 4.0", "cc by-sa 4.0")


def api(params):
    params["format"] = "json"
    url = API + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.load(r)


def clean(html):
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", html or "")).strip()


def search(term, limit=16):
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
    for _ in range(tries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=90) as r:
                data = r.read()
            if len(data) < 8000:
                raise RuntimeError(f"small {len(data)}")
            open(path, "wb").write(data)
            return len(data)
        except Exception as e:
            last = e
            time.sleep(2.5)
    raise last


photos = json.load(open("src/data/photos.json"))
used = {v["title"] for v in photos.values()}

for slug, term, must, mustnot in FIX:
    best = None
    for c in search(term):
        lic = (c.get("license") or "").lower()
        title = c.get("title") or ""
        if not any(lic.startswith(g) or g in lic for g in GOOD_LICENSE):
            continue
        if title in used or (c.get("w") or 0) < 700:
            continue
        low = title.lower()
        if any(m in low for m in mustnot):
            continue
        if must and not any(m in low for m in must):
            continue
        best = c
        break
    if not best:
        print(f"{slug}: nothing better found for '{term}'", flush=True)
        continue
    size = download(best["thumb"], f"{OUT}/{slug}.jpg")
    used.add(best["title"])
    best["local"] = f"/catalogue/{slug}.jpg"
    best["bytes"] = size
    photos[slug] = best
    print(f"{slug}: {size // 1024} KB | {best['license']} | {best['artist'][:35]} | {best['title'][:62]}", flush=True)
    time.sleep(0.6)

json.dump(photos, open("src/data/photos.json", "w"), ensure_ascii=False, indent=2)
print("updated photos.json")