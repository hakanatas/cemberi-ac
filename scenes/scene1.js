/* SAHNE 1 — TEKERLEK (0–10 s)  A wheel rolls one turn and leaves its length on the ground.
   The whole film's drawing lives in LI.world(t); each scene only sets the camera. */
(function (LI) {
  'use strict';
  const { seg, inOut } = LI.E;
  const KD = LI.KD, F = () => LI.Film, A = LI.Ang, Ink = LI.Ink;
  const END = (t) => 1 - seg(t, 90.4, 91.4);
  const TAU = Math.PI * 2;

  function win(t, a, b, fi = 0.4, fo = 0.4) { return seg(t, a, a + fi) * (1 - seg(t, b - fo, b)); }
  function exprs(ctx, t, P, list, sz) {
    const f = F();
    list.forEach(([a, b, items, hot]) => {
      const al = win(t, a, b); if (al <= 0) return;
      f.expr(ctx, typeof items === 'string' ? [items] : items, P.x, P.y, sz ?? P.s, { alpha: al, w: P.w, halo: true, color: hot ? A.amber : undefined });
    });
  }
  const at = (P, k, y) => ({ x: P.x, y: y ?? P.y[k], s: P.s, w: P.w });

  function context(ctx, env, t) {
    exprs(ctx, t, KD.L(env).CX, [
      [4.4, 10.2, 'Tekerlek bir tur dönüyor'],
      [10.6, 27.8, 'Çember uzunluğu çapın kaç katı?'],
      [28.4, 45.8, 'Farklı çemberleri ölçüp listeleyelim'],
      [46.4, 63.8, 'Varsayımla karşılaştıralım'],
      [64.4, 79.8, 'İlişkiyi değerlendirelim'],
    ]);
  }

  /** a wheel with two spokes */
  function wheel(ctx, C, r, th, a, seed) {
    const f = F();
    f.circle(ctx, C, r, 1, a, seed, { fill: 0.12 });
    [0, Math.PI / 2].forEach((o, i) => { const d = [Math.cos(th + o), Math.sin(th + o)]; Ink.path(ctx, [[C[0] - d[0] * r, C[1] - d[1] * r], [C[0] + d[0] * r, C[1] + d[1] * r]], { w: 3, alpha: a * 0.55, seed: seed + 1 + i, taper: [0, 0] }); });
    Ink.dot(ctx, C[0], C[1], 5, { seed: seed + 5, alpha: a });
  }

  function rolling(ctx, env, t) {
    const L = KD.L(env), G = L.G, f = F(), a = END(t) * (1 - seg(t, 27.8, 28.4)); if (a <= 0 || t > 28.4) return;
    const r = 2 * G.u, th = TAU * inOut(seg(t, 5.2, 9.4)), w = f.roll(G.x0, G.gy, r, th), len = r * th;
    Ink.path(ctx, [[G.x0 - 120, G.gy], [G.x0 + TAU * r + 160, G.gy]], { w: 3, alpha: a * 0.5 * seg(t, 4.4, 5.0), seed: 2500, taper: [0.1, 0.1] });
    if (len > 1) Ink.path(ctx, [[G.x0, G.gy], [G.x0 + len, G.gy]], { w: 8, alpha: a, color: LI.AMBER_RGB, seed: 2501, taper: [0, 0] });
    const k = seg(t, 4.4, 5.0) * a;
    if (k > 0) {
      wheel(ctx, w.C, r, th, k, 2510);
      ctx.fillStyle = `rgba(${LI.AMBER_RGB},${k})`; ctx.beginPath(); ctx.arc(w.P[0], w.P[1], 9, 0, TAU); ctx.fill();
      ctx.beginPath(); ctx.arc(G.x0, G.gy, 7, 0, TAU); ctx.fill();
      if (th >= TAU - 0.01) { ctx.beginPath(); ctx.arc(G.x0 + TAU * r, G.gy, 7, 0, TAU); ctx.fill(); }
    }
    // the diameter inside, then diameters laid along the trace
    const dk = win(t, 11.2, 27.8) * a;
    if (dk > 0) { const C = w.C; Ink.path(ctx, [[C[0] - r, C[1]], [C[0] + r, C[1]]], { w: 5, alpha: dk, color: LI.AMBER_RGB, seed: 2520, taper: [0, 0] }); f.T(ctx, 'çap', C[0], C[1] - 30, Object.assign({ size: G.s * 0.75, alpha: dk, halo: true }, f.AMB)); }
    [14.0, 15.4, 16.8].forEach((t0, i) => {
      const kk = win(t, t0, 27.8) * a; if (kk <= 0) return;
      const x0 = G.x0 + i * 2 * r;
      Ink.path(ctx, [[x0 + 3, G.gy + 14], [x0 + 2 * r - 3, G.gy + 14]], { w: 5, p: seg(t, t0, t0 + 0.6), alpha: kk, seed: 2530 + i, taper: [0, 0] });
      f.bracket(ctx, x0, x0 + 2 * r, G.gy + 36, `${i + 1}. çap`, kk, 2540 + i);
    });
    f.bracket(ctx, G.x0 + 6 * r, G.x0 + TAU * r, G.gy + 36, '', win(t, 18.4, 27.8) * a, 2550, true);
    if (t > 18.4) f.T(ctx, 'biraz', G.x0 + 6.14 * r + 40, G.gy + 64, Object.assign({ size: G.s * 0.72, alpha: win(t, 18.4, 27.8) * a, align: 'left' }, f.AMB));
  }

  const ROWS = [['2 cm', '6,3 cm', '3,15'], ['3 cm', '9,4 cm', '3,13'], ['4 cm', '12,6 cm', '3,15']];
  function measured(ctx, env, t) {
    const L = KD.L(env), G = L.G, f = F(), a = win(t, 28.4, 63.8) * END(t); if (a <= 0) return;
    const CI = L.CI, TB = L.TB;
    [1, 1.5, 2].forEach((h, i) => {
      const k = seg(t, 28.8 + i * 2.6, 29.8 + i * 2.6); if (k <= 0) return;
      const r = h * G.u, C = [CI.x[i], CI.y];
      f.circle(ctx, C, r, k, a, 2600 + i * 5, { fill: 0.1 });
      Ink.path(ctx, [[C[0] - r, C[1]], [C[0] + r, C[1]]], { w: 4, p: k, alpha: a, color: LI.AMBER_RGB, seed: 2603 + i * 5, taper: [0, 0] });
      f.T(ctx, `çap ${2 + i} cm`, C[0], CI.y + 2 * G.u + 34, { size: G.s * 0.65, alpha: a * seg(k, 0.5, 1) });
    });
    const hk = seg(t, 29.0, 29.6) * a;
    if (hk > 0) {
      ['Çap', 'Uzunluk', 'Uzunluk ÷ çap'].forEach((s, j) => f.T(ctx, s, TB.x[j], TB.y[0], { size: TB.s * 0.82, alpha: hk }));
      Ink.path(ctx, [[TB.x[0] - 80, TB.y[0] + TB.s * 0.8], [TB.x[2] + 140, TB.y[0] + TB.s * 0.8]], { w: 3, alpha: hk * 0.6, seed: 2620, taper: [0, 0] });
    }
    ROWS.forEach((row, i) => row.forEach((s, j) => {
      const t0 = j < 2 ? 30.0 + i * 2.6 + j * 0.6 : 38.0 + i * 0.6, k = seg(t, t0, t0 + 0.4) * a; if (k <= 0) return;
      f.T(ctx, s, TB.x[j], TB.y[i + 1], Object.assign({ size: TB.s, alpha: k }, j === 2 ? f.AMB : {}));
    }));
    const pk = seg(t, 50.6, 51.4) * a;
    if (pk > 0) f.T(ctx, 'π', TB.x[2], TB.py, Object.assign({ size: TB.s * 2.4, alpha: pk, halo: true }, f.AMB));
  }

  function doubled(ctx, env, t) {
    const L = KD.L(env), G = L.G, f = F(), a = win(t, 64.4, 79.8) * END(t); if (a <= 0) return;
    const B = L.BAR;
    [1, 2].forEach((h, i) => {
      const r = h * G.u, y = B.y[i], len = TAU * r, k = seg(t, 64.8 + i * 1.4, 66.0 + i * 1.4);
      f.circle(ctx, [B.x0 - r - 20, y - r], r, 1, a * seg(k, 0, 0.3), 2700 + i * 5, { fill: 0.1 });
      Ink.path(ctx, [[B.x0, y], [B.x0 + len * k, y]], { w: 8, alpha: a, color: LI.AMBER_RGB, seed: 2710 + i, taper: [0, 0] });
      f.T(ctx, i ? 'çap 4 cm → 12,57 cm' : 'çap 2 cm → 6,28 cm', B.x0 + len, y - 34, { size: G.s * 0.7, alpha: a * seg(k, 0.9, 1), align: 'right', halo: true });
    });
    const dk = seg(t, 67.4, 68.0) * a;
    if (dk > 0) { const r = G.u, len = TAU * r; f.bracket(ctx, B.x0, B.x0 + len, B.y[1] + 24, '6,28', dk, 2720, true); f.bracket(ctx, B.x0 + len, B.x0 + 2 * len, B.y[1] + 24, '6,28', dk, 2721, true); }
  }

  function words(ctx, env, t) {
    const W = KD.L(env).W;
    exprs(ctx, t, at(W, 0), [[6.2, 10.2, 'Bıraktığı iz, çemberin uzunluğu'], [11.2, 27.8, 'Varsayım: çember uzunluğu çapın 3 katı olabilir'],
      [30.0, 45.8, 'Çapı ve çember uzunluğunu ölçtük'], [47.0, 63.8, 'Varsayım: 3 katı · Ölçüm: 3 katından biraz fazla'],
      [65.0, 79.8, 'Çap 2 katına çıkınca çember uzunluğu da 2 katına çıkar']]);
    exprs(ctx, t, at(W, 1), [[20.4, 27.8, '3 çap ve biraz daha!', true], [39.4, 45.8, 'Oranlar hep 3’ten biraz fazla: yaklaşık 3,14', true],
      [50.6, 63.8, 'Her çemberde aynı olan bu sayıya π (pi) denir'], [69.0, 79.8, 'Tabak: çap 10 cm → uzunluk yaklaşık 31,4 cm']]);
    exprs(ctx, t, at(W, 2), [[54.4, 58.4, 'Çember uzunluğu = π × çap', true], [58.8, 63.8, 'Çap = 2 × yarıçap, yani uzunluk = 2 × π × yarıçap', true],
      [73.0, 79.8, 'π, 3 ile 4 arasında ve 3’e çok yakın', true]]);
  }

  function summary(ctx, env, t) {
    if (t < 80.4) return;
    const S = KD.L(env).SUM, f = F(), a = END(t);
    [['Çember uzunluğu ÷ çap = π', 80.6], ['π yaklaşık 3,14', 81.6], ['Çember uzunluğu = π × çap', 82.6], ['Her çemberde aynı oran!', 83.6, true]].forEach(([s, t0, hot], i) => {
      const al = seg(t, t0, t0 + 0.4) * a; if (al <= 0) return;
      f.expr(ctx, [s], S.x, S.y[i], S.s * (i === 3 ? 1.15 : 1), { alpha: al, w: S.w, halo: true, color: hot ? A.amber : undefined });
    });
  }

  LI.fireworks = function (ctx, env, t) {
    const k = seg(t, 84.4, 86.4);
    if (k <= 0 || t >= 91) return;
    const n = F().nokta(t, env), C = [n.x, n.y - 170];
    [30, 60, 90, 120, 150].forEach((d, i) => {
      const r = 150 + 30 * Math.sin(t * 2 + i);
      A.arc(ctx, C, r, d - 12, d + 12, { p: seg(k, i * 0.12, i * 0.12 + 0.4), alpha: 0.8 * (1 - seg(t, 90.2, 91)), w: 6, seed: 80 + i });
    });
  };

  LI.world = function (ctx, env, t) { context(ctx, env, t); rolling(ctx, env, t); measured(ctx, env, t); doubled(ctx, env, t); words(ctx, env, t); summary(ctx, env, t); };

  function camera(t, env) {
    const L = KD.L(env);
    return LI.Camera.breathe(LI.Camera.track([
      [0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [3.0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [4.8, KD.cam(env, { zoom: 1 })],
    ], t), t, 0.5);
  }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 1, start: 0, end: 10, name: 'A wheel', nameTr: 'Tekerlek', concept: 'One turn on the ground', conceptTr: 'Yerde bir tur', render });
})(window.LI = window.LI || {});
