#!/usr/bin/env python3
"""Turn a semester's intake form responses into archive entries.

Usage (from the repo root):
  python3 intake/ingest.py --responses ~/Downloads/responses.xlsx --files ~/Downloads/uploads --semester 2026-S3
  add --write to actually create files; without it the script only prints the plan.

Input
  --responses  The Microsoft Forms export (.xlsx) or a .csv with the same columns.
  --files      Folder holding the uploaded image files (download the form's upload folder from OneDrive).
  --semester   Semester of the show, as YYYY-S# (for example 2026-S3).

What it does for each response that gave consent to publish
  1. assigns the next catalogue number for the campus (numbers are never reused),
  2. saves a web image (long edge 2400px) and a 640px thumbnail under public/images/archive/<artist-id>/,
  3. writes src/content/artworks/<work>-<artist-id>.md with the student's own title and statement,
  4. copies the untouched original to intake/private/masters/<catalogue-id>.<ext> for printing,
  5. records consent (including gift consent) in intake/private/ledger.csv.
intake/private/ is git-ignored: originals, student numbers and consent never enter the public repo.
"""
import argparse, csv, datetime, json, re, shutil, sys, unicodedata, urllib.parse
from pathlib import Path
from PIL import Image, ImageOps

FIELDS = {  # field -> words that must all appear in the form's column header
    "name": [["credited"], ["name", "appear"], ["artist", "name"]],
    "student": [["student", "number"], ["student", "id"]],
    "campus": [["campus"]],
    "course": [["course"]],
    "title": [["title"]],
    "statement": [["statement"]],
    "alt": [["describe"], ["description"]],
    "medium": [["medium"], ["technique"]],
    "link": [["portfolio"], ["instagram"], ["link"]],
    "file": [["upload"], ["image", "file"], ["file"]],
    "publish": [["consent", "publish"], ["agree", "publish"], ["permission", "publish"]],
    "gift": [["gift"]],
}
YES = ("yes", "i agree", "agree", "i consent", "true")


def slug(s):
    s = s.replace("đ", "d").replace("Đ", "D")
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


def read_rows(path):
    path = Path(path).expanduser()
    if path.suffix.lower() == ".csv":
        with open(path, newline="", encoding="utf-8-sig") as f:
            return list(csv.DictReader(f))
    import openpyxl
    ws = openpyxl.load_workbook(path, read_only=True).active
    rows = list(ws.iter_rows(values_only=True))
    head = [str(h or "").strip() for h in rows[0]]
    return [dict(zip(head, ["" if v is None else str(v).strip() for v in r])) for r in rows[1:] if any(r)]


def map_columns(headers):
    out = {}
    for field, options in FIELDS.items():
        for words in options:
            hit = next((h for h in headers if all(w in h.lower() for w in words) and h not in out.values()), None)
            if hit:
                out[field] = hit
                break
    return out


def used_numbers(repo):
    """Every catalogue number ever mentioned (live, retired, or reserved), per campus code."""
    text = ""
    for p in [repo / "README.md", repo / "intake" / "manifest.csv", *sorted((repo / "src/content/artworks").glob("*.md"))]:
        if p.exists():
            text += p.read_text(encoding="utf-8") + "\n"
    ledger = repo / "intake/private/ledger.csv"
    if ledger.exists():
        text += ledger.read_text(encoding="utf-8")
    used = {"SG": 0, "HN": 0}
    for code, a, b in re.findall(r"CV-(SG|HN)-(\d{3})(?:\.\.(\d{3}))?", text):
        used[code] = max(used[code], int(a), int(b or 0))
    return used


def find_file(cell, folder):
    """The Forms upload column holds a link (or a file name); match it to a file in the folder."""
    files = [p for p in folder.iterdir() if p.is_file() and not p.name.startswith(".")]
    for part in re.split(r"[;\n]+", cell):
        part = part.strip()
        if not part:
            continue
        name = urllib.parse.unquote(part.rstrip("/").split("/")[-1].split("?")[0])
        for p in files:
            if p.name == name or p.stem == Path(name).stem:
                return p
        for p in files:  # Forms appends the respondent name to the file name
            if Path(name).stem and Path(name).stem.lower() in p.stem.lower():
                return p
    return None


def q(s):
    return json.dumps(s, ensure_ascii=False)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--responses", required=True)
    ap.add_argument("--files", required=True)
    ap.add_argument("--semester", required=True, help="YYYY-S#, for example 2026-S3")
    ap.add_argument("--repo", default=str(Path(__file__).resolve().parent.parent))
    ap.add_argument("--write", action="store_true", help="create files (default is a dry run)")
    a = ap.parse_args()

    m = re.fullmatch(r"(\d{4})-S([123])", a.semester)
    if not m:
        sys.exit("--semester must look like 2026-S3")
    year, sem = int(m.group(1)), m.group(2)
    repo, folder = Path(a.repo).expanduser(), Path(a.files).expanduser()
    rows = read_rows(a.responses)
    if not rows:
        sys.exit("No responses found.")
    cols = map_columns(list(rows[0].keys()))
    missing = [f for f in ("name", "campus", "title", "file", "publish") if f not in cols]
    if missing:
        sys.exit(f"Could not find these columns in the form export: {missing}\nHeaders seen: {list(rows[0].keys())}")
    print("Column mapping:")
    for f, h in cols.items():
        print(f"  {f:9} <- {h}")

    used = used_numbers(repo)
    get = lambda r, f: (r.get(cols[f], "") if f in cols else "").strip()
    plan, skipped = [], []
    for i, r in enumerate(rows, 1):
        name, title = get(r, "name"), get(r, "title")
        who = f"row {i} ({name or 'no name'})"
        if not get(r, "publish").lower().startswith(YES):
            skipped.append(f"{who}: no consent to publish"); continue
        if not name or not title:
            skipped.append(f"{who}: missing name or title"); continue
        campus = "Hanoi" if "hanoi" in get(r, "campus").lower() or "ha noi" in get(r, "campus").lower() else "Saigon"
        src = find_file(get(r, "file"), folder)
        if not src:
            skipped.append(f"{who}: uploaded file not found in {folder}"); continue
        try:
            img = ImageOps.exif_transpose(Image.open(src))
        except Exception as e:
            skipped.append(f"{who}: cannot open {src.name} ({e})"); continue
        code = "HN" if campus == "Hanoi" else "SG"
        used[code] += 1
        cid = f"CV-{code}-{used[code]:03d}"
        artist_id, work = slug(name), slug(title)
        md = repo / "src/content/artworks" / f"{work}-{artist_id}.md"
        n = 2
        while md.exists() or any(p["md"] == md for p in plan):
            md = repo / "src/content/artworks" / f"{work}-{n}-{artist_id}.md"; n += 1
        stem = md.stem[: -len(artist_id) - 1]
        plan.append(dict(row=r, cid=cid, name=name, title=title, campus=campus, src=src, img=img, artist_id=artist_id, stem=stem, md=md))

    print(f"\n{len(plan)} work(s) to add, {len(skipped)} skipped")
    for p in plan:
        w, h = p["img"].size
        note = "  LOW RESOLUTION: ask for a larger original" if max(w, h) < 2000 else ""
        print(f"  {p['cid']}  {p['title']} / {p['name']} ({p['campus']})  {p['src'].name} {w}x{h}{note}")
    for s in skipped:
        print("  skipped:", s)
    if not a.write:
        print("\nDry run only. Add --write to create the entries."); return

    private = repo / "intake/private"
    (private / "masters").mkdir(parents=True, exist_ok=True)
    ledger = private / "ledger.csv"
    new_ledger = not ledger.exists()
    today = datetime.date.today().isoformat()
    with open(ledger, "a", newline="", encoding="utf-8") as lf, open(repo / "intake/manifest.csv", "a", newline="", encoding="utf-8") as mf:
        lw, mw = csv.writer(lf), csv.writer(mf)
        if new_ledger:
            lw.writerow(["catalogueId", "date", "semester", "name", "student", "publish_consent", "gift_consent", "master_file", "source_file"])
        for p in plan:
            r, img = p["row"], p["img"].convert("RGB")
            out_dir = repo / "public/images/archive" / p["artist_id"]
            out_dir.mkdir(parents=True, exist_ok=True)
            web = img.copy(); web.thumbnail((2400, 2400), Image.LANCZOS)
            web.save(out_dir / f"{p['stem']}.jpg", "JPEG", quality=88, optimize=True)
            th = img.copy(); th.thumbnail((640, 6400), Image.LANCZOS)
            th.save(out_dir / f"thumbnail-{p['stem']}.jpg", "JPEG", quality=70, optimize=True)
            master = private / "masters" / f"{p['cid']}{p['src'].suffix.lower()}"
            shutil.copy2(p["src"], master)

            course = get(r, "course")
            base = f"/cultural-visions/images/archive/{p['artist_id']}"
            lines = ["---", "catalogueId: " + q(p["cid"]), "title: " + q(p["title"]), "artistName: " + q(p["name"]), "artistId: " + q(p["artist_id"]),
                     "cohort: " + q(sem + "-" + str(year)), "year: " + str(year), "campus: " + q(p["campus"]), "semester: " + q(a.semester)]
            if course: lines.append("course: " + q(course))
            if get(r, "medium"): lines.append("medium: " + q(get(r, "medium")))
            lines.append("exhibition: " + q("Selected work" + (", " + course if course else "") + ", Semester " + sem + " " + str(year) + ", RMIT University Vietnam"))
            if get(r, "link").startswith("http"): lines.append("portfolioUrl: " + q(get(r, "link")))
            stem = p["stem"]
            lines += ["imagePath: " + q(base + "/" + stem + ".jpg"), "thumbnailPath: " + q(base + "/thumbnail-" + stem + ".jpg"),
                      "imageAlt: " + q(get(r, "alt") or p["title"] + " by " + p["name"]), "imageWidth: " + str(web.width), "imageHeight: " + str(web.height), "tags: []"]
            st = get(r, "statement")
            if st:
                lines.append("artistStatement: |-")
                lines += ["  " + l.strip() if l.strip() else "" for l in st.replace("\r", "").split("\n")]
            lines += ["isHonored: false", "featured: false", "---", ""]
            p["md"].write_text("\n".join(lines), encoding="utf-8")
            lw.writerow([p["cid"], today, a.semester, p["name"], get(r, "student"), get(r, "publish"), get(r, "gift"), master.name, p["src"].name])
            mw.writerow([p["cid"], p["name"], p["title"], "(from intake form)", get(r, "link"), f"{p['stem']}.jpg", f"DONE - ingested {today} for {a.semester}"])
            print("  wrote", p["md"].relative_to(repo))
    print("\nNext: add tags if wanted, run `npm run build`, review, then commit and push.")


if __name__ == "__main__":
    main()
