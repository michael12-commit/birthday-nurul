/* ===================== PENGATURAN (ubah di sini) ===================== */
const CONFIG = {
  // Letakkan file audio milik Anda (yang sah) di assets/audio/ lalu samakan namanya di sini.
  audio: "assets/audio/soulmate.mp3",
  volume: 0.35, // 0.0 - 1.0, jangan terlalu keras
};

// Galeri: ganti foto = taruh file di assets/images/ lalu samakan "src". Ganti tulisan di "caption".
// Tambah foto = salin satu baris {src, caption}. Jika file belum ada, otomatis tampil placeholder.
const GALLERY = [
  { src: "assets/images/foto1.jpg", caption: "si imut" },
  { src: "assets/images/foto2.jpg", caption: "when yaa" },
  { src: "assets/images/foto3.jpg", caption: "sorry yaa, kalo fotonya dari sorotan semua" },
  
];

// Pesan acak untuk tombol "kejutan lagi"
const RANDOM_MESSAGES = [
  "kamu hebat, serius 💪✨", "semoga harimu semanis kue ulang tahun 🍰", "🐻💛🐻💛🐻",
  "jangan lupa minum air & senyum ya ", "kamu lebih kuat dari yang kamu kira 🌟",
  "semangat kaka kaka akuntan", "hari ini boleh bangga sama diri sendiri 💛", "wkwk kamu nemu kejutan lagi! 🎉",
];
/* ===================================================================== */

const $ = (id) => document.getElementById(id);
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Dekorasi melayang ---------- */
(function decor() {
  const box = $("decor");
  for (let i = 0; i < 7; i++) {
    const b = document.createElement("div");
    b.className = "balloon";
    const yellow = i % 2 === 0;
    b.style.cssText = `left:${8 + i * 13}%;background:${yellow ? "#FFE98A" : "#fff"};border:2px solid #F5B72E;` +
      `animation-duration:${16 + (i % 4) * 4}s;animation-delay:${-i * 3}s`;
    box.appendChild(b);
  }
  const icons = ["⭐", "💛", "🌼", "☁️", "✨", "🌟"];
  for (let i = 0; i < 14; i++) {
    const d = document.createElement("span");
    d.className = "deco";
    d.textContent = icons[i % icons.length];
    d.style.cssText = `left:${(i * 37) % 95}%;top:${(i * 53) % 90}%;font-size:${14 + (i % 3) * 8}px;animation-delay:${-i * 0.7}s`;
    box.appendChild(d);
  }
})();

/* ---------- Confetti ---------- */
const cv = $("confetti"), ctx = cv.getContext("2d");
let parts = [], raf = null;
function resize() { cv.width = innerWidth; cv.height = innerHeight; }
addEventListener("resize", resize); resize();
function confetti(n = 120) {
  if (reduceMotion) return;
  const colors = ["#FFE98A", "#F5B72E", "#fff", "#FFF3D6", "#FFD35C"];
  for (let i = 0; i < n; i++) {
    parts.push({ x: innerWidth / 2, y: innerHeight * 0.45, vx: (Math.random() - 0.5) * 14, vy: Math.random() * -13 - 3,
      s: 5 + Math.random() * 7, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4,
      c: colors[(Math.random() * colors.length) | 0], life: 140 + Math.random() * 60 });
  }
  if (!raf) raf = requestAnimationFrame(tick);
}
function tick() {
  ctx.clearRect(0, 0, cv.width, cv.height);
  parts = parts.filter((p) => p.life-- > 0 && p.y < cv.height + 20);
  for (const p of parts) {
    p.vy += 0.35; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.r += p.vr;
    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r);
    ctx.fillStyle = p.c; ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); ctx.restore();
  }
  raf = parts.length ? requestAnimationFrame(tick) : null;
  if (!raf) ctx.clearRect(0, 0, cv.width, cv.height);
}

/* ---------- Musik ---------- */
const audio = $("audio"), player = $("player"), playBtn = $("playBtn"), toast = $("toast");
audio.src = CONFIG.audio; audio.volume = CONFIG.volume;
function showToast(t) { toast.textContent = t; toast.classList.add("show"); setTimeout(() => toast.classList.remove("show"), 3200); }
function setPlaying(on) { player.classList.toggle("playing", on); playBtn.textContent = on ? "⏸" : "▶"; }
async function playMusic() {
  try { await audio.play(); setPlaying(true); }
  catch (e) { setPlaying(false); showToast("File musik belum ditemukan. Lihat README (assets/audio) 🎵"); }
}
playBtn.addEventListener("click", () => (audio.paused ? playMusic() : (audio.pause(), setPlaying(false))));

/* ---------- Tombol pembuka ---------- */
$("openBtn").addEventListener("click", () => {
  confetti(160);
  $("intro").classList.add("leave");
  setTimeout(() => {
    $("intro").classList.add("hidden");
    $("main").classList.remove("hidden");
    player.classList.remove("hidden");
    scrollTo(0, 0);
    observe(); confetti(100);
  }, 650);
  playMusic(); // dimulai setelah klik pengguna, jadi tidak diblokir browser
});

/* ---------- Muncul bertahap saat di-scroll ---------- */
function observe() {
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("show"); io.unobserve(e.target); }
  }), { threshold: 0.2 });
  document.querySelectorAll(".msg .reveal").forEach((el, i) => (el.style.transitionDelay = i * 0.5 + "s"));
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
}

/* ---------- Hadiah, kue, surat ---------- */
const onAct = (el, fn) => { el.addEventListener("click", fn); el.addEventListener("keydown", (e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), fn())); };
onAct($("gift"), () => { $("gift").classList.add("open"); $("giftMsg").classList.add("show"); confetti(70); });
onAct($("cake"), () => { $("flame").classList.add("out"); $("wish").classList.add("show"); confetti(50); });
$("envelope").addEventListener("click", () => { $("envelope").classList.add("open"); $("letter").classList.add("show"); });

/* ---------- Kejutan acak ---------- */
let last = -1;
$("moreBtn").addEventListener("click", () => {
  let i; do { i = (Math.random() * RANDOM_MESSAGES.length) | 0; } while (i === last);
  last = i;
  const m = $("moreMsg"); m.textContent = RANDOM_MESSAGES[i];
  m.classList.remove("bump"); void m.offsetWidth; m.classList.add("bump");
  confetti(40);
});

/* ---------- Galeri + zoom ---------- */
const lb = $("lightbox"), lbFig = lb.querySelector("figure");
function mediaEl(src, cap) {
  const img = new Image(); img.alt = cap; img.loading = "lazy"; img.src = src;
  img.onerror = () => { const ph = document.createElement("div"); ph.className = "ph"; ph.textContent = "📷"; img.replaceWith(ph); };
  return img;
}
GALLERY.forEach((g) => {
  const fig = document.createElement("figure"); fig.className = "photo";
  const cap = document.createElement("figcaption"); cap.textContent = g.caption;
  fig.append(mediaEl(g.src, g.caption), cap);
  fig.addEventListener("click", () => {
    lbFig.replaceChildren(fig.firstElementChild.cloneNode(true), cap.cloneNode(true));
    lb.classList.remove("hidden");
  });
  $("gallery").appendChild(fig);
});
lb.addEventListener("click", () => lb.classList.add("hidden"));
addEventListener("keydown", (e) => e.key === "Escape" && lb.classList.add("hidden"));
