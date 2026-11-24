#!/usr/bin/env python3
"""Отправляет письма мастерским через google_api.py gmail send.

Адреса берутся из файла писем; третье письмо (только веб-форма) пропускается.
Никаких массовых рассылок: по одному письму на адрес.
"""
import json, re, subprocess, sys
from pathlib import Path

PROFILE = Path('/opt/data/profiles/c9ef1bfb-3461-424a-900a-d2e9b78acfff')
GAPI = PROFILE / 'skills/productivity/google-workspace/scripts/google_api.py'
LETTERS = PROFILE / 'workspace/mugeniki-pisma-masterskim.txt'
DELIM = re.compile(r'^─{10,}\s*$', re.M)


def parse(text):
    chunks = DELIM.split(text)
    out = []
    for i, ch in enumerate(chunks):
        if 'ПИСЬМО' in ch and 'Кому:' in ch:
            head = [l.strip() for l in ch.strip().splitlines() if l.strip()]
            to = next((l for l in head if l.startswith('Кому:')), '')
            subj = next((l for l in head if l.startswith('Тема:')), '')
            m = re.search(r'[\w.\-+]+@[\w.\-]+\.\w+', to)
            out.append({'title': head[0], 'email': m.group(0) if m else None,
                        'subject': subj.replace('Тема:', '').strip(),
                        'body': (chunks[i + 1] if i + 1 < len(chunks) else '').strip()})
    return out


def send(to, subject, body):
    p = subprocess.run([sys.executable, str(GAPI), 'gmail', 'send',
                        '--to', to, '--subject', subject, '--body', body],
                       capture_output=True, text=True, timeout=180)
    return p.returncode, (p.stdout or '').strip(), (p.stderr or '').strip()


def main():
    only = None
    if '--to' in sys.argv:
        only = sys.argv[sys.argv.index('--to') + 1].strip().lower()
    letters = parse(LETTERS.read_text(encoding='utf-8'))
    print('писем в файле:', len(letters))
    sent = 0
    for L in letters:
        if not L['email']:
            print(f"ПРОПУСК (веб-форма, адреса нет): {L['title']}")
            continue
        if only and L['email'].lower() != only:
            print(f"ПРОПУСК (фильтр --to): {L['email']}")
            continue
        rc, out, err = send(L['email'], L['subject'], L['body'])
        print(f"-> {L['email']} | rc={rc}")
        print('   stdout:', out[:400])
        if err:
            print('   stderr:', err[:400])
        if rc == 0 and '"sent"' in out:
            sent += 1
    print('ОТПРАВЛЕНО ПИСЕМ:', sent)


if __name__ == '__main__':
    main()