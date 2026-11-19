import json, re, sys, urllib.request, urllib.error
from html.parser import HTMLParser

UA = "MugenikiAudit/1.0"

def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=45) as r:
        return r.status, r.read().decode("utf-8", "replace")

class P(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self.imgs = []
        self.h1 = []
        self._h1 = 0
        self.title = ""
        self._in_title = False
        self.meta = {}
        self.lang = None
        self.html_attrs = {}
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "html":
            self.lang = a.get("lang")
        if tag == "a":
            self.links.append((a.get("href"), a.get("aria-label"), a.get("class") or ""))
        if tag == "img":
            self.imgs.append((a.get("alt"), a.get("src")))
        if tag == "h1":
            self._h1 += 1
            self._in_h1 = True
        if tag == "title":
            self._in_title = True
        if tag == "meta":
            k = a.get("name") or a.get("property")
            if k:
                self.meta[k] = a.get("content")
        if tag == "link" and a.get("rel") == "canonical":
            self.meta["canonical"] = a.get("href")
    def handle_endtag(self, tag):
        if tag == "h1":
            self._in_h1 = False
        if tag == "title":
            self._in_title = False
    def handle_data(self, data):
        if self._in_title:
            self.title += data
        if getattr(self, "_in_h1", False):
            self.h1.append(data)

sitemap = get("https://mugeneki.com/sitemap.xml")[1]
urls = re.findall(r"<loc>([^<]+)</loc>", sitemap)
print(f"{len(urls)} urls in sitemap")

known = set(urls) | {u.rstrip("/") for u in urls}
rows = []
problems = []

for u in urls:
    try:
        code, html = get(u)
    except urllib.error.HTTPError as e:
        problems.append(f"{u}: HTTP {e.code}")
        continue
    p = P()
    p.feed(html)
    h1s = [t.strip() for t in p.h1 if t.strip()]
    hash_links = [h for h, _, _ in p.links if h == "#" or (h or "").startswith("#")]
    hrefs = [h for h, _, _ in p.links if h]
    no_alt = [s for alt, s in p.imgs if alt is None]
    empty_alt = sum(1 for alt, s in p.imgs if alt == "")
    internal = [h for h in hrefs if h.startswith("/")]
    broken = []
    for h in set(internal):
        target = "https://mugeneki.com" + h.split("#")[0]
        if target.rstrip("/") in known or target.rstrip("/") + "/" in known or target in known:
            continue
        if h.split("#")[0] in ("", "/"):
            continue
        broken.append(h)
    rows.append({
        "url": u.replace("https://mugeneki.com", "") or "/",
        "code": code,
        "title_len": len(p.title.strip()),
        "desc": len((p.meta.get("description") or "").strip()),
        "canonical": (p.meta.get("canonical") or "").replace("https://mugeneki.com", ""),
        "h1": len(h1s),
        "lang": p.lang,
        "links": len(hrefs),
        "hash_only": len(hash_links),
        "img_no_alt": len(no_alt),
        "img_empty_alt": empty_alt,
        "broken_internal": sorted(broken),
    })

print(f"{'page':42} {'st':>3} {'t':>3} {'d':>4} {'h1':>3} {'lnk':>4} {'#':>3} {'img':>4} {'canon'}")
for r in rows:
    flag = ""
    if r["code"] != 200: flag += " CODE"
    if r["h1"] != 1: flag += " H1!"
    if r["title_len"] < 15: flag += " TITLE!"
    if r["desc"] < 50: flag += " DESC!"
    if r["broken_internal"]: flag += " BROKEN:" + ",".join(r["broken_internal"])
    if r["img_no_alt"]: flag += " NOALT"
    if r["canonical"] != r["url"].rstrip("/") and r["canonical"] != (r["url"].rstrip("/") or "/"):
        flag += " CANON"
    print(f"{r['url']:42} {r['code']:>3} {r['title_len']:>3} {r['desc']:>4} {r['h1']:>3} {r['links']:>4} {r['hash_only']:>3} {r['img_no_alt']:>4}  {r['canonical'][:28]:28}{flag}")

if problems:
    print("\nHTTP problems:")
    print("\n".join(problems))