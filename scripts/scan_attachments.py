"""Список вложений в почте по проекту Mugeniki за последние 30 дней."""
import base64
import json
import subprocess

GWS = "/opt/lifeos-tenant-migrations/agents/google/bin/gws"


def gws(*params):
    r = subprocess.run([GWS, "gmail", "users", *params], capture_output=True, text=True, timeout=300)
    if r.returncode != 0:
        raise RuntimeError((r.stdout or "") + (r.stderr or ""))
    return json.loads(r.stdout)


def header(headers, name):
    for h in headers:
        if h["name"].lower() == name.lower():
            return h["value"]
    return ""


def parts(payload, out):
    fn = payload.get("filename") or ""
    body = payload.get("body", {})
    if fn:
        out.append((fn, body.get("size", 0), payload.get("mimeType", "")))
    for p in payload.get("parts", []) or []:
        parts(p, out)
    return out


lst = gws("messages", "list", "--params",
          json.dumps({"q": "has:attachment newer_than:30d", "maxResults": 50}))
msgs = lst.get("messages", [])
print("писем с вложениями:", len(msgs))
for m in msgs:
    d = gws("messages", "get", "--params",
            json.dumps({"id": m["id"], "format": "full"}))
    h = d.get("payload", {}).get("headers", [])
    from_, subj = header(h, "From"), header(h, "Subject")
    date = header(h, "Date")
    files = parts(d.get("payload", {}), [])
    print(f"\n{date} | {from_}\n  тема: {subj[:90]}\n  тело: {(d.get('snippet') or '')[:120]}")
    for fn, size, mt in files:
        print(f"    - {fn} | {size/1024:.0f} КБ | {mt}")
    if not files:
        print("    (частей-файлов нет)")
