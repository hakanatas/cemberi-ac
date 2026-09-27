/* ─────────────────────────────────────────────────────────────
   ALTYAZILAR / CAPTIONS — düzenlenebilir.
   Kısa, tek fikir, 6. sınıf dili. start/end saniye cinsinden.
   note: öğretmen için önerilen seslendirme cümlesi.
   ───────────────────────────────────────────────────────────── */
(function (root) {
  const CAPTIONS = [
    { scene: 1, start: 4.4, end: 10.2, tr: 'Tekerleğin bir turu: çemberin uzunluğu', en: 'One turn of the wheel: the circumference',
      note: 'Çapı 4 santimetre olan bir tekerlek, tam bir tur dönüyor. Yerde bıraktığı iz, çemberin uzunluğu kadar.' },
    { scene: 2, start: 10.8, end: 19.8, tr: 'Varsayım: çapın 3 katı', en: 'A guess: three times the diameter',
      note: 'Çember uzunluğu çapın kaç katı? Bir varsayımda bulunalım: belki 3 katı. Çapı izin üzerine art arda koyalım: 1, 2, 3.' },
    { scene: 2, start: 20.2, end: 27.8, tr: '3 çap ve biraz daha', en: 'Three diameters and a bit more',
      note: 'Üç çap sığdı ama iz bitmedi: biraz daha var. Çember uzunluğu çapın 3 katından biraz fazla.' },
    { scene: 3, start: 28.6, end: 38.4, tr: 'Üç çemberi ölçüp listeleyelim', en: 'Measure three circles and list them',
      note: 'Farklı çemberleri ölçelim. Çapı 2 santimetre olan çemberin uzunluğu yaklaşık 6,3; çapı 3 olanın 9,4; çapı 4 olanın 12,6 santimetre.' },
    { scene: 3, start: 38.8, end: 45.8, tr: 'Uzunluk ÷ çap: hep yaklaşık 3,14', en: 'Length ÷ diameter: always about 3.14',
      note: 'Her birinde çember uzunluğunu çapa bölelim: 3,15; 3,13; 3,15. Ölçümdeki küçük farklar dışında hep aynı sayı: yaklaşık 3,14.' },
    { scene: 4, start: 46.6, end: 54.0, tr: 'Bu sabit sayı: π', en: 'This constant is π',
      note: 'Varsayımımızla karşılaştıralım: 3 katı dedik, ölçüm 3 katından biraz fazla çıktı. Her çemberde aynı olan bu sayıya pi denir.' },
    { scene: 4, start: 54.4, end: 63.8, tr: 'Çember uzunluğu = π × çap', en: 'Circumference = π × diameter',
      note: 'Önermemiz: çember uzunluğu, pi çarpı çap. Çap yarıçapın 2 katı olduğu için çember uzunluğu 2 çarpı pi çarpı yarıçap da olur.' },
    { scene: 5, start: 64.6, end: 72.4, tr: 'Çap 2 katı, uzunluk da 2 katı', en: 'Double the diameter, double the length',
      note: 'İlişkiyi değerlendirelim. Çapı 2 katına çıkarınca çember uzunluğu da 2 katına çıkıyor: 6,28’in iki katı 12,57.' },
    { scene: 5, start: 72.8, end: 79.8, tr: 'π, 3’ten biraz büyük', en: 'π is a little more than 3',
      note: 'Çapı 10 santimetre olan bir tabağın kenarı yaklaşık 31,4 santimetre. Pi, 3 ile 4 arasında ve 3’e çok yakın bir sayı.' },
    { scene: 6, start: 80.6, end: 86.4, tr: 'Çember uzunluğu = π × çap', en: 'Circumference = π × diameter',
      note: 'Aklında kalsın: her çemberde çember uzunluğu bölü çap aynı sayıdır, pi, yaklaşık 3,14.' },
    { scene: 6, start: 86.8, end: 91.0, tr: 'Her çemberde aynı oran: π!', en: 'The same ratio in every circle: π!',
      note: 'Küçük ya da büyük, her çemberde aynı oran: pi!' },
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = CAPTIONS;
  else { root.LI = root.LI || {}; root.LI.CAPTIONS = CAPTIONS; }
})(typeof window !== 'undefined' ? window : globalThis);
