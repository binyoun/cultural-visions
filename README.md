# Cultural Visions

Curatorial archive of student photography from RMIT University Vietnam, and the selection pool for VVIP photo gifts. Live at [binyoun.github.io/cultural-visions](https://binyoun.github.io/cultural-visions).

Next.js static export, deployed to GitHub Pages by the workflow in `.github/workflows/` on every push to `main`.

## Catalogue numbering

Every artwork carries a permanent catalogue ID in its frontmatter, e.g. `CV-SG-001`:

- `CV` for Cultural Visions, then campus code (`SG` Saigon, `HN` Hanoi), then a 3-digit accession number per campus.
- Numbers are assigned in order of accession and are **never reused or renumbered**, even if a work is removed. When adding a work, take the next free number for its campus.
- The ID appears on every archive card, in the sidebar index, and on the artwork page, so a work can be referenced unambiguously during gift selection ("we would like CV-SG-003").

Current registry:

| ID | Work | Artist | Status |
|---|---|---|---|
| CV-SG-001 | The Busy Ho Chi Minh | Thomas Fang | re-root S1 2026 |
| CV-SG-002 | Mapping my Inner Self | Nadine Benedix | retired 2026-08-03 (removed) |
| CV-SG-003 | Ba - Relic of the past | Quoc Chau | re-root S1 2026 |
| CV-SG-004 | Fallen leaves return to their roots | Bluefinsia (Nga Le Thi Tuyet) | re-root S1 2026 |
| CV-SG-005 | Cyclo at Dusk | Tôn Nguyễn | retired 11 Jul 2026 (placeholder removed) |
| CV-SG-006 | Monsoon Market | Tôn Nguyễn | retired 11 Jul 2026 (placeholder removed) |
| CV-SG-007 | Wire City | Tôn Nguyễn | retired 11 Jul 2026 (placeholder removed) |
| CV-SG-008 | Layers of Life | Florin Schroth | rễ-root 3-2025 |
| CV-SG-009 | vị-nhà (something that tastes like home) | Le Duc Anh | rễ-root 3-2025 |
| CV-SG-010 | i miss | Emma | rễ-root 3-2025 |
| CV-SG-011 | INTRA-SELF, INTER-SELF | alicia ý huỳnh | rễ-root 3-2025 |
| CV-SG-012 | Toi Tim Ve | Bui Ngoc Kieu Anh | rễ-root 3-2025 |
| CV-SG-013 | Có | Indochine (Nguyen Huu Nam Duong) | rễ-root 3-2025 |
| CV-SG-014 | Fear of being Wrong | Nguyễn Anh Thư | rễ-root 3-2025 |
| CV-SG-015 | Mẫu (母, Mother) | Ton Nguyen | honored; presented to the Australian Minister for Education, 10 Dec 2025 |
| CV-SG-016 | Hưng Long (興龍, Rising Dragon) | Ngo Dinh Hoang Phuoc | honored; presented to the Governor-General of Australia, 12 Sep 2025 |
| CV-SG-017 | Come to the Other Side, No. 9 | Nguyen Bao Tran | honored; presented to the Australian Consul-General in HCMC, 14 Apr 2026 |
| CV-HN-001 | Lantern Festival, Hoi An | Ngô Đình Hoàng Phước | retired 11 Jul 2026 (placeholder removed) |
| CV-HN-002 | Lotus Study No. 3 | Ngô Đình Hoàng Phước | retired 11 Jul 2026 (placeholder removed) |
| CV-HN-003 | Morning Offering | Ngô Đình Hoàng Phước | retired 11 Jul 2026 (placeholder removed) |

Retired IDs belonged to placeholder entries (demo images and invented texts) that were removed when real work arrived; per the never-reuse rule those numbers stay retired. The Hanoi registry is currently empty of live works; new Hanoi accessions start at CV-HN-004.

## Adding a work

1. Put the full image and a thumbnail in `public/images/archive/<artist-id>/`:
   - full image: `<work-slug>.jpg` (long edge around 1800px)
   - thumbnail: `thumbnail-<work-slug>.jpg` (`sips --resampleWidth 640 -s format jpeg -s formatOptions 70 in.jpg --out thumbnail-....jpg`)
2. Create `src/content/artworks/<work-slug>-<artist-id>.md`. Copy the frontmatter of an existing re-root entry as the template. Required fields: `catalogueId`, `title`, `artistName`, `artistId`, `cohort`, `year`, `campus`, `imagePath`, `thumbnailPath`, `imageAlt`, `imageWidth`, `imageHeight`, `tags`, `isHonored`, `featured`. Optional: `medium`, `exhibition`, `portfolioUrl` (renders a "More Work" link to the artist's portfolio), `shortBio`, `longBio`, `artistStatement`, `curatorNote` (sections render only when present; never invent these).
3. Image paths in frontmatter must start with `/cultural-visions/` (the GitHub Pages basePath).
4. `imageWidth`/`imageHeight` are the full image's real pixel dimensions (`sips -g pixelWidth -g pixelHeight file.jpg`); they set the card's aspect ratio.
5. `npm run build` locally to verify, then commit and push to `main` to deploy.

## Development

```bash
npm run dev     # local dev server
npm run build   # static export to out/
```

Note: this Next.js version may differ from an agent's training data; see `AGENTS.md`.
