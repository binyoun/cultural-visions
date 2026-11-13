// Cultural Visions walkable gallery. Single visitor, no server.
// Rooms are generated from artworks.json (exported from the Markdown archive at build time):
// Honoured, then one room per semester (newest first), then the Saigon and Hanoi archives.
import * as THREE from 'three';

const $ = (id) => document.getElementById(id);
const SITE = new URL('../', location.href).pathname; // "/cultural-visions/"
const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;

const W = 11, H = 4.4, EYE = 1.6, WALL = 0.3, DOOR = 2.6, DOOR_H = 3.1;
const COL = { bg: 0x050607, wall: 0x1c1f25, floor: 0x0e1013, saigon: '#c8956c', hanoi: '#7c9cba', honoured: '#e2202c', show: '#eef1f5' };

// ---------- data ----------
const works = await (await fetch('artworks.json')).json();
const semLabel = (s) => { const m = /^(\d{4})-S(\d)$/.exec(s || ''); return m ? `Semester ${m[2]} ${m[1]}` : s; };
const byArtist = (a, b) => a.artistId.localeCompare(b.artistId) || a.catalogueId.localeCompare(b.catalogueId);
const rest = works.filter((w) => !w.isHonored);
const semesters = [...new Set(rest.map((w) => w.semester).filter(Boolean))].sort().reverse();
const rooms = [
  { title: 'Honoured', sub: 'Works presented as gifts on behalf of RMIT Vietnam', color: COL.honoured, big: true, works: works.filter((w) => w.isHonored) },
  ...semesters.map((s) => ({ title: semLabel(s), sub: 'Selected works of the semester', color: COL.show, works: rest.filter((w) => w.semester === s) })),
  { title: 'Saigon', sub: 'Archive, Saigon South campus', color: COL.saigon, works: rest.filter((w) => !w.semester && w.campus === 'Saigon') },
  { title: 'Hanoi', sub: 'Archive, Hanoi campus', color: COL.hanoi, works: rest.filter((w) => !w.semester && w.campus === 'Hanoi') },
].filter((r) => r.works.length);
rooms.forEach((r) => r.works.sort(byArtist));

// ---------- scene ----------
const canvas = $('c');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
const scene = new THREE.Scene();
scene.background = new THREE.Color(COL.bg);
scene.fog = new THREE.FogExp2(COL.bg, 0.028);
const camera = new THREE.PerspectiveCamera(62, 1, 0.1, 120);
camera.rotation.order = 'YXZ';
scene.add(new THREE.AmbientLight(0xffffff, 1.9));
// one soft light that travels with the visitor, so nearby walls and floor read as space
const lamp = new THREE.PointLight(0xfff1e0, 26, 17, 1.5);
scene.add(lamp);

const wallMat = new THREE.MeshLambertMaterial({ color: COL.wall });
const floorMat = new THREE.MeshLambertMaterial({ color: COL.floor });
const ceilMat = new THREE.MeshLambertMaterial({ color: 0x060708 });
const frameMat = new THREE.MeshBasicMaterial({ color: 0x020203 });
const floors = [], pickable = [], walk = [], tour = [];

function box(w, h, d, x, y, z, mat) { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat); m.position.set(x, y, z); scene.add(m); return m; }

function glowTexture(color) {
  const c = document.createElement('canvas'); c.width = c.height = 256;
  const g = c.getContext('2d'), grd = g.createRadialGradient(128, 128, 10, 128, 128, 128);
  grd.addColorStop(0, color + '55'); grd.addColorStop(0.5, color + '1c'); grd.addColorStop(1, color + '00');
  g.fillStyle = grd; g.fillRect(0, 0, 256, 256);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
const glows = {};
const glowMat = (color) => glows[color] || (glows[color] = new THREE.MeshBasicMaterial({ map: glowTexture(color), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false }));

function textPlane(lines, wM, hM, pxW = 1024) {
  const c = document.createElement('canvas'); c.width = pxW; c.height = Math.round(pxW * hM / wM);
  const g = c.getContext('2d'); g.textBaseline = 'top';
  let y = 0;
  for (const l of lines) {
    g.font = l.font; g.fillStyle = l.color; g.textAlign = l.align || 'left';
    if ('letterSpacing' in g) g.letterSpacing = l.spacing || '0px';
    const x = l.align === 'center' ? c.width / 2 : 0;
    const maxW = c.width - 4;
    let words = String(l.text).split(' '), line = '';
    const size = parseInt(/(\d+)px/.exec(l.font)[1], 10);
    y += l.gap || 0;
    for (const word of words) {
      const test = line ? line + ' ' + word : word;
      if (g.measureText(test).width > maxW && line) { g.fillText(line, x, y); y += size * 1.2; line = word; } else line = test;
    }
    g.fillText(line, x, y); y += size * 1.2;
  }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4;
  return new THREE.Mesh(new THREE.PlaneGeometry(wM, hM), new THREE.MeshBasicMaterial({ map: t, transparent: true }));
}

await Promise.all([document.fonts.load('300 64px Newsreader'), document.fonts.load('italic 300 40px Newsreader'), document.fonts.load('500 28px "JetBrains Mono"')]).catch(() => {});
const SERIF = 'Newsreader, Georgia, serif', MONO = '"JetBrains Mono", monospace';

// A dividing wall across the gallery at z, with a doorway in the middle.
function divider(z) {
  const side = (W - DOOR) / 2;
  box(side, H, WALL, -(DOOR / 2 + side / 2), H / 2, z, wallMat);
  box(side, H, WALL, DOOR / 2 + side / 2, H / 2, z, wallMat);
  box(DOOR, H - DOOR_H, WALL, 0, DOOR_H + (H - DOOR_H) / 2, z, wallMat);
  walk.push({ x0: -DOOR / 2 + 0.45, x1: DOOR / 2 - 0.45, z0: z - WALL / 2 - 0.7, z1: z + WALL / 2 + 0.7 });
}

function shell(z0, z1, color) { // z0 is the near end (larger z), z1 the far end
  const L = z0 - z1, zc = (z0 + z1) / 2;
  const f = new THREE.Mesh(new THREE.PlaneGeometry(W, L), floorMat); f.rotation.x = -Math.PI / 2; f.position.set(0, 0, zc); scene.add(f); floors.push(f);
  const c = new THREE.Mesh(new THREE.PlaneGeometry(W, L), ceilMat); c.rotation.x = Math.PI / 2; c.position.set(0, H, zc); scene.add(c);
  box(WALL, H, L, -W / 2 - WALL / 2, H / 2, zc, wallMat);
  box(WALL, H, L, W / 2 + WALL / 2, H / 2, zc, wallMat);
  const strip = new THREE.MeshBasicMaterial({ color });
  box(0.03, 0.03, L - 0.2, -W / 2 + 0.02, 0.02, zc, strip);
  box(0.03, 0.03, L - 0.2, W / 2 - 0.02, 0.02, zc, strip);
  walk.push({ x0: -W / 2 + 0.7, x1: W / 2 - 0.7, z0: z1 + 0.55, z1: z0 - 0.55 });
}

// ---------- build ----------
const loader = new THREE.TextureLoader();
const tex = (url) => { const t = loader.load(url); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t; };

// Lobby
const LOBBY = 9;
box(W + 2 * WALL, H, WALL, 0, H / 2, WALL / 2, wallMat); // wall behind the visitor
shell(0, -LOBBY, COL.saigon);
{
  const t = textPlane([
    { text: 'Cultural Visions', font: `300 150px ${SERIF}`, color: '#eef1f5', align: 'center' },
    { text: 'STUDENT PHOTOGRAPHY FROM RMIT UNIVERSITY VIETNAM', font: `500 30px ${MONO}`, color: '#99a2ad', align: 'center', spacing: '6px', gap: 20 },
  ], 6.4, 1.6, 2048);
  t.position.set(0, 3.55, -LOBBY + WALL / 2 + 0.02); scene.add(t);
}

let z = -LOBBY;
rooms.forEach((room, ri) => {
  divider(z); room.door = z;
  const zStart = z - WALL / 2;
  const maxH = room.big ? 2.0 : 1.65, maxW = room.big ? 3.4 : 2.6, gap = room.big ? 2.2 : 1.45;
  const cur = [2.2, 2.2];
  const placed = room.works.map((w, i) => {
    const ar = w.imageWidth / w.imageHeight;
    let ww = Math.min(maxW, maxH * ar), hh = ww / ar;
    const side = cur[0] <= cur[1] ? 0 : 1;
    const along = cur[side] + ww / 2; cur[side] += ww + gap;
    return { w, ww, hh, side, along };
  });
  const L = Math.max(10, Math.max(cur[0], cur[1]) + 0.6);
  const zEnd = zStart - L;
  shell(zStart, zEnd, room.color);
  room.z0 = zStart; room.z1 = zEnd; room.index = ri;

  // room title beside the doorway, facing the visitor coming in
  const title = textPlane([
    { text: room.title, font: `300 120px ${SERIF}`, color: '#eef1f5', align: 'center' },
    { text: room.sub.toUpperCase(), font: `500 40px ${MONO}`, color: room.color, align: 'center', spacing: '5px', gap: 18 },
  ], 3.4, 1.0, 2048);
  title.position.set(DOOR / 2 + 0.45 + 1.7, 2.0, room.door + WALL / 2 + 0.02); scene.add(title);

  for (const p of placed) {
    const sx = p.side === 0 ? -1 : 1, wx = sx * (W / 2), wz = zStart - p.along, rotY = p.side === 0 ? Math.PI / 2 : -Math.PI / 2;
    const cy = 1.62;
    const g = new THREE.Group(); g.position.set(wx, cy, wz); g.rotation.y = rotY; scene.add(g);
    const glow = new THREE.Mesh(new THREE.PlaneGeometry(p.ww * 2.3, p.hh * 2.6), glowMat(room.color)); glow.position.z = 0.012; g.add(glow);
    const frame = new THREE.Mesh(new THREE.BoxGeometry(p.ww + 0.07, p.hh + 0.07, 0.05), frameMat); frame.position.z = 0.03; g.add(frame);
    const mat = new THREE.MeshBasicMaterial({ map: tex(p.w.thumbnailPath) });
    const pic = new THREE.Mesh(new THREE.PlaneGeometry(p.ww, p.hh), mat); pic.position.z = 0.058; g.add(pic);
    const label = textPlane([
      { text: p.w.catalogueId, font: `500 40px ${MONO}`, color: room.color === COL.show ? '#c8956c' : room.color, spacing: '4px' },
      { text: p.w.title, font: `300 58px ${SERIF}`, color: '#eef1f5', gap: 14 },
      { text: p.w.artistName, font: `italic 300 44px ${SERIF}`, color: '#99a2ad', gap: 6 },
    ], 0.62, 0.44, 640);
    label.position.set(p.ww / 2 + 0.2 + 0.31, -p.hh / 2 + 0.22, 0.02); g.add(label);
    // soft pool of light on the floor under the work
    const pool = new THREE.Mesh(new THREE.PlaneGeometry(p.ww * 1.8, 2.2), glowMat(room.color)); pool.rotation.x = -Math.PI / 2; pool.position.set(wx - sx * 1.0, 0.012, wz); scene.add(pool);

    const dist = THREE.MathUtils.clamp(Math.max(p.ww, p.hh * 1.25) * 1.05 + 0.5, 1.9, W - 2.2);
    const item = { w: p.w, room, pic, mat, full: false, pos: new THREE.Vector3(wx - sx * dist, EYE, wz), yaw: p.side === 0 ? Math.PI / 2 : -Math.PI / 2, center: new THREE.Vector3(wx, cy, wz) };
    pic.userData.item = item; pickable.push(pic); tour.push(item);
  }
  z = zEnd - WALL / 2;
});
// closing wall
box(W + 2 * WALL, H, WALL, 0, H / 2, z, wallMat);
{
  const t = textPlane([
    { text: 'Thank you for visiting', font: `300 110px ${SERIF}`, color: '#eef1f5', align: 'center' },
    { text: 'EVERY WORK HAS A PERMANENT CATALOGUE NUMBER IN THE ARCHIVE', font: `500 26px ${MONO}`, color: '#99a2ad', align: 'center', spacing: '5px', gap: 16 },
  ], 5.4, 1.1, 2048);
  t.position.set(0, 2.2, z + WALL / 2 + 0.02); scene.add(t);
}
// order the tour room by room, front to back, alternating walls
tour.sort((a, b) => a.room.index - b.room.index || b.center.z - a.center.z);

// ---------- movement ----------
const pos = new THREE.Vector3(0, EYE, -2.2);
let yaw = 0, pitch = 0, glide = null, current = -1;
const inside = (x, zz) => walk.some((b) => x >= b.x0 && x <= b.x1 && zz >= b.z0 && zz <= b.z1);
const dividers = rooms.map((r) => r.door);
const zoneOf = (zz) => { let n = 0; for (const d of dividers) if (zz < d) n++; return n; }; // 0 = lobby

function pathTo(target) {
  const pts = [], a = zoneOf(pos.z), b = zoneOf(target.z);
  if (a < b) for (let k = a; k < b; k++) pts.push(new THREE.Vector3(0, EYE, dividers[k]));
  if (a > b) for (let k = a - 1; k >= b; k--) pts.push(new THREE.Vector3(0, EYE, dividers[k]));
  pts.push(target.clone());
  return pts;
}
function goTo(target, endYaw, endPitch = 0, instant = false) {
  if (instant || REDUCED) { pos.copy(target); if (endYaw !== undefined) { yaw = endYaw; pitch = endPitch; } glide = null; return; }
  glide = { pts: pathTo(target), endYaw, endPitch };
}
const angleTo = (from, to) => { let d = (to - from) % (Math.PI * 2); if (d > Math.PI) d -= Math.PI * 2; if (d < -Math.PI) d += Math.PI * 2; return d; };

function focus(i, instant = false) {
  current = (i + tour.length) % tour.length;
  const it = tour[current];
  goTo(it.pos, it.yaw, 0, instant);
  upgrade(it);
  showPanel(it);
  $('where').textContent = `${it.room.title} · ${current + 1} / ${tour.length}`;
  history.replaceState(null, '', '?work=' + encodeURIComponent(it.w.catalogueId));
  $('hint').classList.add('off');
}
function upgrade(it) {
  if (it.full) return; it.full = true;
  loader.load(it.w.imagePath, (t) => { t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; const old = it.mat.map; it.mat.map = t; it.mat.needsUpdate = true; if (old) old.dispose(); });
}

// ---------- panel ----------
function showPanel(it) {
  const w = it.w;
  $('pId').textContent = w.catalogueId;
  $('pTitle').textContent = w.title;
  $('pArtist').textContent = w.artistName;
  const meta = [w.campus + ' campus', w.semester ? semLabel(w.semester) : (w.year ? String(w.year) : ''), w.medium || ''].filter(Boolean).join(' · ');
  $('pMeta').innerHTML = '';
  $('pMeta').append(meta);
  if (w.exhibition) { $('pMeta').append(document.createElement('br')); const s = document.createElement('span'); if (w.isHonored) s.className = 'hon'; s.textContent = w.exhibition; $('pMeta').append(s); }
  $('pText').textContent = w.artistStatement || w.curatorNote || '';
  const links = $('pLinks'); links.innerHTML = '';
  const a = document.createElement('a'); a.href = `${SITE}artwork/${w.slug}/`; a.textContent = 'Open the full record →'; links.append(a);
  if (w.portfolioUrl) { const b = document.createElement('a'); b.href = w.portfolioUrl; b.target = '_blank'; b.rel = 'noopener noreferrer'; b.textContent = `More work by ${w.artistName} ↗`; links.append(b); }
  $('panel').classList.add('on'); offset();
}
const hidePanel = () => { $('panel').classList.remove('on'); offset(); };
// On a tall screen the info sheet covers the lower part, so slide the picture up (no distortion).
function offset() {
  const w = innerWidth, h = innerHeight;
  if (w < h && $('panel').classList.contains('on')) camera.setViewOffset(w, h, 0, Math.round(h * 0.2), w, h); else camera.clearViewOffset();
}
$('close').onclick = hidePanel;
$('next').onclick = () => focus(current + 1);
$('prev').onclick = () => focus(current < 0 ? 0 : current - 1);

rooms.forEach((r) => {
  const b = document.createElement('button'); b.textContent = r.title; r.btn = b;
  b.onclick = () => { hidePanel(); goTo(new THREE.Vector3(0, EYE, r.z0 - 2.4), 0); };
  $('rooms').append(b);
});

// ---------- input ----------
const keys = new Set();
addEventListener('keydown', (e) => {
  if (e.key === 'Escape') hidePanel();
  if (e.key === 'n' || e.key === 'N' || e.key === '.') focus(current + 1);
  if (e.key === 'p' || e.key === 'P' || e.key === ',') focus(current < 0 ? 0 : current - 1);
  keys.add(e.key.toLowerCase());
});
addEventListener('keyup', (e) => keys.delete(e.key.toLowerCase()));
addEventListener('blur', () => keys.clear());

let down = null;
const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
canvas.addEventListener('pointerdown', (e) => { down = { x: e.clientX, y: e.clientY, lx: e.clientX, ly: e.clientY, t: performance.now(), moved: 0 }; canvas.setPointerCapture(e.pointerId); canvas.classList.add('drag'); });
canvas.addEventListener('pointermove', (e) => {
  if (!down) return;
  const dx = e.clientX - down.lx, dy = e.clientY - down.ly; down.lx = e.clientX; down.ly = e.clientY; down.moved += Math.abs(dx) + Math.abs(dy);
  if (down.moved > 6) { glide = null; yaw += dx * 0.0042; pitch = THREE.MathUtils.clamp(pitch + dy * 0.0042, -0.9, 0.9); $('hint').classList.add('off'); }
});
canvas.addEventListener('pointerup', (e) => {
  canvas.classList.remove('drag');
  if (!down) return; const d = down; down = null;
  if (d.moved > 6 || performance.now() - d.t > 500) return;
  const r = canvas.getBoundingClientRect();
  ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
  ray.setFromCamera(ndc, camera);
  const hit = ray.intersectObjects(pickable, false)[0];
  if (hit && hit.distance < 30) { focus(tour.indexOf(hit.object.userData.item)); return; }
  const fl = ray.intersectObjects(floors, false)[0];
  if (fl) {
    const t = new THREE.Vector3(THREE.MathUtils.clamp(fl.point.x, -W / 2 + 0.8, W / 2 - 0.8), EYE, fl.point.z);
    if (!inside(t.x, t.z)) { // nudge into the nearest room interior
      const b = walk.filter((q) => q.x1 - q.x0 > 3).sort((p, q) => Math.abs((p.z0 + p.z1) / 2 - t.z) - Math.abs((q.z0 + q.z1) / 2 - t.z))[0];
      t.z = THREE.MathUtils.clamp(t.z, b.z0, b.z1);
    }
    hidePanel(); goTo(t, undefined); $('hint').classList.add('off');
  }
});
canvas.addEventListener('wheel', (e) => { // scroll walks forward and back
  e.preventDefault(); glide = null;
  const s = -e.deltaY * 0.004, nx = pos.x - Math.sin(yaw) * s, nz = pos.z - Math.cos(yaw) * s;
  if (inside(nx, pos.z)) pos.x = nx; if (inside(pos.x, nz)) pos.z = nz;
}, { passive: false });

// ---------- loop ----------
function resize() { const w = innerWidth, h = innerHeight; renderer.setSize(w, h, false); camera.aspect = w / h; camera.fov = w < h ? 78 : 62; camera.updateProjectionMatrix(); offset(); }
addEventListener('resize', resize); resize();

let last = performance.now(), tick = 0;
function frame(now) {
  const dt = Math.min(0.05, (now - last) / 1000); last = now;
  // keyboard
  const f = (keys.has('w') || keys.has('arrowup') ? 1 : 0) - (keys.has('s') || keys.has('arrowdown') ? 1 : 0);
  const st = (keys.has('d') ? 1 : 0) - (keys.has('a') ? 1 : 0);
  const turn = (keys.has('arrowleft') ? 1 : 0) - (keys.has('arrowright') ? 1 : 0);
  if (turn) { yaw += turn * 1.7 * dt; glide = null; }
  if (f || st) {
    glide = null; hidePanel(); $('hint').classList.add('off');
    const sp = (keys.has('shift') ? 6 : 3.4) * dt;
    const nx = pos.x + (-Math.sin(yaw) * f + Math.cos(yaw) * st) * sp, nz = pos.z + (-Math.cos(yaw) * f - Math.sin(yaw) * st) * sp;
    if (inside(nx, pos.z)) pos.x = nx; if (inside(pos.x, nz)) pos.z = nz;
  }
  // glide along waypoints
  if (glide) {
    const target = glide.pts[0], d = target.clone().sub(pos); d.y = 0;
    const len = d.length(), lastLeg = glide.pts.length === 1;
    const speed = Math.max(2.2, Math.min(9, len * 2.2 + (lastLeg ? 0 : 5)));
    if (len < 0.04) { pos.x = target.x; pos.z = target.z; glide.pts.shift(); if (!glide.pts.length) { if (glide.endYaw !== undefined) { yaw += angleTo(yaw, glide.endYaw); pitch = glide.endPitch; } glide = null; } }
    else {
      pos.addScaledVector(d.normalize(), Math.min(len, speed * dt));
      const wantYaw = (lastLeg && glide.endYaw !== undefined && len < 3.5) ? glide.endYaw : Math.atan2(-d.x, -d.z);
      yaw += angleTo(yaw, wantYaw) * Math.min(1, dt * 4.5);
      pitch += (0 - pitch) * Math.min(1, dt * 4);
    }
  }
  camera.position.copy(pos); camera.rotation.set(pitch, yaw, 0); lamp.position.set(pos.x, 2.9, pos.z);
  // every so often: load full-resolution images nearby, mark the current room
  if (++tick % 30 === 0) {
    let n = 0;
    for (const it of tour) if (!it.full && n < 2 && it.center.distanceTo(pos) < 9) { upgrade(it); n++; }
    const zn = zoneOf(pos.z);
    rooms.forEach((r, i) => r.btn.classList.toggle('on', i + 1 === zn));
    if (current < 0) $('where').textContent = zn ? rooms[zn - 1].title : 'Entrance';
  }
  renderer.render(scene, camera);
  requestAnimationFrame(frame);
}

// ---------- start ----------
const want = new URLSearchParams(location.search).get('work');
const start = want ? tour.findIndex((it) => it.w.catalogueId === want) : -1;
if (start >= 0) focus(start, true);
$('load').classList.add('off');
window.__gallery = { tour, rooms, focus, pos };
requestAnimationFrame(frame);
