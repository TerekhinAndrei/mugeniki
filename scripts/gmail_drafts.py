#!/usr/bin/env python3
"""Создаёт черновики писем в Gmail из файла mugeniki-pisma-masterskim.txt.

Ничего не отправляет: только drafts.create. Владелец читает и нажимает Send сам.
"""
import base64, re, sys
from email.message import EmailMessage
from pathlib import Path

SKILL_SCRIPTS = Path('/opt/data/profiles/c9ef1bfb-3461-424a-900a-d2e9b78acfff/skills/productivity/google-workspace/scripts')
sys.path.insert(0, str(SKILL_SCRIPTS))
import google_api  # noqa: E402

LETTERS = Path('/opt/data/profiles/c9ef1bfb-3461-424a-900a-d2e9b78acfff/workspace/mugeniki-pisma-masterskim.txt')
DELIM = re.compile(r'^─{10,}\s*$', re.M)


def parse(text):
    chunks = DELIM.split(text)
    out = []
    for i, ch in enumerate(chunks):
        if 'ПИСЬМО' in ch and 'Кому:' in ch:
            head = [l.strip() for l in ch.strip().splitlines() if l.strip()]
            title = head[0]
            to = next((l for l in head if l.startswith('Кому:')), '')
            subj = next((l for l in head if l.startswith('Тема:')), '')
            body = chunks[i + 1] if i + 1 < len(chunks) else ''
            m = re.search(r'[\w.\-+]+@[\w.\-]+\.\w+', to)
            out.append({
                'title': title,
                'email': m.group(0) if m else None,
                'subject': subj.replace('Тема:', '').strip(),
                'body': body.strip(),
            })
    return out


def make_draft(gmail, to, subject, body):
    msg = EmailMessage()
    msg['To'] = to
    msg['Subject'] = subject
    msg.set_content(body, charset='utf-8')
    raw = base64.urlsafe_b64encode(msg.as_bytes()).decode()
    return gmail.users().drafts().create(userId='me', body={'message': {'raw': raw}}).execute()


def main():
    letters = parse(LETTERS.read_text(encoding='utf-8'))
    print(f'распознано писем: {len(letters)}')
    for L in letters:
        print(f"  - {L['title']} | to={L['email']} | subject={L['subject'][:50]} | body={len(L['body'])} симв.")
    gmail = google_api.build_service('gmail', 'v1')
    created = []
    for L in letters:
        if not L['email']:
            print(f"  ПРОПУСК (адреса нет, только веб-форма): {L['title']}")
            continue
        d = make_draft(gmail, L['email'], L['subject'], L['body'])
        created.append((L['title'], L['email'], d['id'], d['message']['id']))
        print(f"  черновик создан: {L['email']} draft_id={d['id']} message_id={d['message']['id']}")
    print('ИТОГО черновиков:', len(created))


if __name__ == '__main__':
    main()