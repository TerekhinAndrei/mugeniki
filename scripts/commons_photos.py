import json, urllib.parse, urllib.request, sys

API = "https://commons.wikimedia.org/w/api.php"
UA = "MugenikiCatalogueBot/1.0 (contact: contact@mugeneki.com)"

SEARCHES = {
    "arita-plate": "Arita ware plate",
    "arita-bowl": "Arita ware bowl",
    "sometsuke": "sometsuke blue and white porcelain dish",
    "yunomi": "yunomi cup porcelain",
    "chawan-shino": "Shino ware chawan tea bowl",
    "chawan-ido": "Ido tea bowl",
    "mizusashi": "mizusashi water jar",
    "kyoyaki": "Kyoto ware ceramics",
    "imari": "Imari porcelain dish",
    "boxed-set": "Japanese porcelain dishes set box",
}

def api(params):
    params["format"] = "json"
    url = API + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=40) as r:
        return json.load(r)

def search(term, limit=8):
    data = api({
        "action": "query",
        "generator": "search",
        "gsrsearch": f"filetype:bitmap {term}",
        "gsrnamespace": "6",
        "gsrlimit": str(limit),
        "prop": "imageinfo",
        "iiprop": "url|size|extmetadata",
        "iiurlwidth": "1200",
    })
    out = []
    for page in (data.get("query", {}).get("pages", {}) or {}).values():
        ii = (page.get("imageinfo") or [{}])[0]
        meta = ii.get("extmetadata", {})
        def m(k):
            v = meta.get(k, {}).get("value", "")
            return v
        out.append({
            "title": page.get("title"),
            "thumb": ii.get("thumburl"),
            "full": ii.get("url"),
            "w": ii.get("width"),
            "h": ii.get("height"),
            "license": m("LicenseShortName"),
            "artist": __import__("re").sub("<[^>]+>", "", m("Artist"))[:80],
            "credit": __import__("re").sub("<[^>]+>", "", m("Credit"))[:80],
            "page": ii.get("descriptionurl"),
        })
    return out

result = {}
for key, term in SEARCHES.items():
    try:
        result[key] = search(term)
    except Exception as e:
        result[key] = [{"error": str(e)}]

print(json.dumps(result, ensure_ascii=False, indent=1))