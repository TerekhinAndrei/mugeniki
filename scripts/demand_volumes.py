#!/usr/bin/env python3
"""Собирает месячные просмотры статей Википедии как прокси интереса к категории.

Источник: Wikimedia REST Pageviews API (per-article, all-access, agent=user).
Ключ Articleviews уважает только реальные просмотры людьми, без ботов.
"""
import json, time, urllib.request, urllib.parse, sys
from collections import defaultdict

UA = {'User-Agent': 'MugenikiResearch/1.0 (research; andrei@terekhindt.com)'}
BASE = 'https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/{proj}/all-access/user/{art}/monthly/{start}/{end}'

ARTICLES = {
    'en.wikipedia': ['Donabe', 'Kyusu', 'Chawan', 'Matcha', 'Japanese_lacquerware',
                     'Sashiko', 'Japanese_kitchen_knife', 'Kintsugi', 'Bizen_ware',
                     'Arita_ware', 'Wajima-nuri', 'Mino_ware', 'Chasen', 'Yunomi',
                     'Donburi', 'Japanese_pottery_and_porcelain'],
    'de.wikipedia': ['Donabe', 'Kyusu', 'Teeschale', 'Matcha', 'Urushi',
                     'Sashiko', 'Kintsugi', 'Arita-Keramik', 'Bizen-Keramik', 'Mino-Keramik'],
    'fr.wikipedia': ['Donabe', 'Kyusu', 'Chawan', 'Matcha', 'Laque_du_Japon',
                     'Sashiko', 'Kintsugi', 'Arita_(céramique)', 'Bizen'],
    'ja.wikipedia': ['土鍋', '急須', '茶碗', '抹茶', '漆器', '刺し子', '包丁',
                     '金継ぎ', '有田焼', '輪島塗', '美濃焼', '備前焼', '茶筅'],
}

CHUNKS = [('2023010100', '2023123100'), ('2024010100', '2024123100'),
          ('2025010100', '2025123100'), ('2026010100', '2026103100')]


def fetch(proj, art, start, end):
    url = BASE.format(proj=proj, art=urllib.parse.quote(art, safe=''), start=start, end=end)
    req = urllib.request.Request(url, headers=UA)
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return json.loads(r.read())['items']
    except Exception as e:
        return {'error': type(e).__name__, 'code': getattr(e, 'code', None)}


def main():
    data = defaultdict(dict)
    for proj, arts in ARTICLES.items():
        for art in arts:
            months = {}
            for s, e in CHUNKS:
                items = fetch(proj, art, s, e)
                if isinstance(items, dict):
                    months['_error'] = items
                else:
                    for it in items:
                        months[it['timestamp'][:6]] = it['views']
                time.sleep(0.15)
            data[f'{proj}/{art}'] = months
    with open('spros/pageviews.json', 'w') as f:
        json.dump(data, f, ensure_ascii=False, indent=1)
    print('articles fetched:', len(data))
    for k, v in data.items():
        if '_error' in v:
            print('  ERR', k, v['_error'])


if __name__ == '__main__':
    main()