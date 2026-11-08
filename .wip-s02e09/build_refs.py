"""usage: python build_refs.py entities.py segments.txt out.json out.xlsx notes.txt"""
import sys, re, json, runpy, glob, collections
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment
from openpyxl.worksheet.table import Table, TableStyleInfo
ents = runpy.run_path(sys.argv[1])['ENTS']
REPO = '/private/tmp/claude-501/-Users-lisalang-Library-Mobile-Documents-com-apple-CloudDocs-04-Projects-NightFever/f3567f93-1306-40a6-9a53-64dcf39766e8/scratchpad/repo/src/data/'
seen = collections.defaultdict(list)
for f in glob.glob(REPO + 's0*.json'):
    if 's02e09' in f: continue
    for r in json.load(open(f)): seen[r['name']].append(r)
for e in ents:
    old = seen.get(e['name'])
    if old:
        cats = {r['category'] for r in old}
        if e['cat'] not in cats: print('CATEGORY CLASH', e['name'], e['cat'], cats)
        if 'link' not in e: e['link'] = collections.Counter(r['link'] for r in old).most_common(1)[0][0]
        if 'status' not in e: e['status'] = collections.Counter(r['status'] for r in old).most_common(1)[0][0]
    elif 'link' not in e: print('NEW NAME WITHOUT LINK', e['name'])
lines = []
for l in open(sys.argv[2], encoding='utf-8'):
    m = re.match(r'\[(\d+):(\d\d):(\d\d)\] ([^:]+): (.*)', l.strip())
    if m:
        h, mi, s, who, text = m.groups(); lines.append((int(h)*3600+int(mi)*60+int(s), who, text))
def hms(x): return f"{x//3600:02d}:{x%3600//60:02d}:{x%60:02d}"
rows = []
for e in ents:
    pat = e.get('re'); n, first = 0, None
    if pat:
        rx = re.compile(pat, 0 if e.get('case') else re.I)
        for t, who, text in lines:
            k = len(rx.findall(text))
            if k:
                n += k
                if first is None: first = t
    if 'mentions' in e: n = e['mentions']
    time = e.get('time') or (hms(first) if first is not None else None)
    if time is None: raise SystemExit(f"no mention found: {e['name']} /{pat}/")
    r = {"mentions": n, "category": e['cat'], "name": e['name'], "heard": e.get('heard', ''), "time": time,
         "context": e['ctx'], "link": e.get('link', ''), "status": e.get('status', 'Confirmed')}
    if e.get('fashion'): r['fashion'] = e['fashion']
    if e.get('colours'): r['colours'] = e['colours']
    rows.append(r)
def key(r):
    t = r['time']; tt = 10**6 if t == 'On camera' else int(t[:2])*3600+int(t[3:5])*60+int(t[6:8])
    return (-r['mentions'], tt)
rows.sort(key=key)
out = []
for i, r in enumerate(rows, 1):
    r['rank'] = i; out.append({"rank": i, **{k: v for k, v in r.items() if k != 'rank'}})
open(sys.argv[3], 'w', encoding='utf-8').write(json.dumps(out, ensure_ascii=False, indent=1) + '\n')
wb = Workbook(); HF = Font(name='Arial', size=10, bold=True, color='FFFFFF'); HFILL = PatternFill('solid', fgColor='1F1F3A')
BF = Font(name='Arial', size=10); YEL = PatternFill('solid', fgColor='FFF2CC'); WR = Alignment(wrap_text=True, vertical='top')
def sheet(ws, name, head, data, widths, status_col=None):
    ws.append(head)
    for d in data: ws.append(d)
    for c in ws[1]: c.font = HF; c.fill = HFILL; c.alignment = WR
    for row in ws.iter_rows(min_row=2):
        for c in row: c.font = BF; c.alignment = WR
        if status_col is not None and row[status_col].value != 'Confirmed': row[status_col].fill = YEL
    for i, w in enumerate(widths): ws.column_dimensions[chr(65+i)].width = w
    ws.freeze_panes = 'A2'
    t = Table(displayName=name, ref=f"A1:{chr(64+len(head))}{len(data)+1}")
    t.tableStyleInfo = TableStyleInfo(name='TableStyleMedium2', showRowStripes=True); ws.add_table(t)
ws = wb.active; ws.title = 'References'
sheet(ws, 'Refs', ['Rank','Mentions','Category','Name','As heard in transcript','First mention','Context','Fashion reference','Link','Status'],
      [[r['rank'], r['mentions'], r['category'], r['name'], r['heard'], r['time'], r['context'], r.get('fashion'), r['link'], r['status']] for r in rows], [6,9,13,30,26,12,60,34,40,15], status_col=9)
sheet(wb.create_sheet('Fashion'), 'Fashion', ['Rank','Category','Name','Fashion reference','First mention'],
      [[r['rank'], r['category'], r['name'], r['fashion'], r['time']] for r in rows if r.get('fashion')], [6,13,34,60,12])
sheet(wb.create_sheet('Mood'), 'Mood', ['Rank','Name','First mention','Context','Look','Colours'],
      [[r['rank'], r['name'], r['time'], r['context'], r.get('fashion'), ' · '.join(r.get('colours') or [])] for r in rows if r['category']=='Mood'], [6,40,12,60,40,60])
wn = wb.create_sheet('Notes'); wn.append(['Notes'])
for l in open(sys.argv[5], encoding='utf-8').read().strip().split('\n'): wn.append([l])
wn['A1'].font = HF; wn['A1'].fill = HFILL; wn.column_dimensions['A'].width = 140
for row in wn.iter_rows(min_row=2):
    for c in row: c.font = BF; c.alignment = WR
wb.save(sys.argv[4]); print(len(out), 'rows,', sum(r['mentions'] for r in out), 'mentions')
