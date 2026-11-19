import re, urllib.request, html, sys

UA = "MugenikiAudit/1.0"
def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    return urllib.request.urlopen(req, timeout=45).read().decode("utf-8", "replace")

def text(h):
    h = re.sub(r"<script.*?</script>|<style.*?</style>", " ", h, flags=re.S)
    h = re.sub(r"<[^>]+>", "\n", h)
    h = html.unescape(h)
    lines = [l.strip() for l in h.split("\n")]
    return [l for l in lines if len(l) > 12]

routes = ["/", "/collections", "/collections/konoha-round-donburi", "/wholesale", "/hospitality",
          "/crafts", "/crafts/arita-porcelain", "/engraving", "/restoration", "/makers"]

pat = re.compile(r"\b(we|our|us|I|read|checked|check|verified|verify|publish|published|guess|assumption|field|entry|entries|entry below|this page|below)\b", re.I)
for r in routes:
    txt = text(get("https://mugeneki.com" + r))
    hits = [t for t in txt if pat.search(t)]
    print(f"\n===== {r} ({len(txt)} lines, {len(hits)} flagged)")
    for t in hits:
        print(" -", t[:230])