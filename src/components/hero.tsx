'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MagneticButton } from '@/components/magnetic-button';
import { HeroChat } from '@/components/hero-chat';
import { TypedName } from '@/components/typed-name';

// Order matches the skill spectrum further down the page.
const BANDS = [
  { label: 'UI', v: '--s-ui' },
  { label: 'API', v: '--s-api' },
  { label: 'DATA', v: '--s-data' },
  { label: 'AI', v: '--s-ai' },
  { label: 'CLOUD', v: '--s-cloud' },
  { label: 'LAB', v: '--s-lab' },
];

type Pt = { x: number; y: number };
const lerp = (a: Pt, b: Pt, t: number): Pt => ({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });

/** Position of `el` inside `ancestor`, ignoring CSS transforms (entrance motion, magnetic pull). */
function offsetWithin(el: HTMLElement, ancestor: HTMLElement) {
  let x = 0;
  let y = 0;
  let node: HTMLElement | null = el;
  while (node && node !== ancestor) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return { x, y, w: el.offsetWidth, h: el.offsetHeight };
}

/**
 * Draws the beam → prism → spectrum on one canvas behind the hero.
 * Geometry is measured once from the real prism and chat (and again on resize),
 * so it follows any layout. The cursor's height steers the beam's angle of
 * incidence. Performance rules: no canvas blur filters, no per-frame layout
 * reads, and frames are only drawn while the beam is still settling toward the
 * cursor. When nothing moves, nothing renders. Touch devices draw once.
 */
function useBeam(
  sectionRef: React.RefObject<HTMLElement | null>,
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  prismRef: React.RefObject<HTMLDivElement | null>,
  chatRef: React.RefObject<HTMLDivElement | null>,
  readoutRef: React.RefObject<HTMLSpanElement | null>
) {
  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!section || !canvas || !ctx) return;

    const animated =
      window.matchMedia('(pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let beam = '#fff';
    let bands: string[] = [];
    let dark = true;
    let mono = 'ui-monospace, monospace';
    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      beam = cs.getPropertyValue('--beam').trim() || '#fff';
      bands = BANDS.map(b => cs.getPropertyValue(b.v).trim());
      dark = document.documentElement.classList.contains('dark');
      const geistMono = getComputedStyle(document.body).getPropertyValue('--font-geist-mono').trim();
      if (geistMono) mono = `${geistMono}, ui-monospace, monospace`;
    };

    let w = 0;
    let h = 0;
    let geo: { top: Pt; bl: Pt; br: Pt; chat: { x: number; y: number; w: number; h: number } } | null = null;
    const measure = () => {
      const prism = prismRef.current;
      const chat = chatRef.current;
      if (!prism || !chat) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = section.clientWidth;
      h = section.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const p = offsetWithin(prism, section);
      geo = {
        top: { x: p.x + p.w / 2, y: p.y },
        bl: { x: p.x, y: p.y + p.h },
        br: { x: p.x + p.w, y: p.y + p.h },
        chat: offsetWithin(chat, section),
      };
    };

    let aim = animated ? 0 : 0.25;
    let target = aim;
    let lastReadout = '';

    const fan = (exit: Pt, a: Pt, b: Pt, grow: number, alpha: number, side: boolean) => {
      const n = bands.length;
      ctx.globalAlpha = alpha;
      for (let i = 0; i < n; i++) {
        let p0 = lerp(a, b, i / n);
        let p1 = lerp(a, b, (i + 1) / n);
        // Widen the outer edges for the soft halo pass instead of blurring.
        if (grow) {
          if (i === 0) p0 = side ? { x: p0.x, y: p0.y - grow } : { x: p0.x - grow, y: p0.y };
          if (i === n - 1) p1 = side ? { x: p1.x, y: p1.y + grow } : { x: p1.x + grow, y: p1.y };
        }
        const g = ctx.createLinearGradient(exit.x, exit.y, (p0.x + p1.x) / 2, (p0.y + p1.y) / 2);
        g.addColorStop(0, bands[i]);
        g.addColorStop(1, `${bands[i]}00`);
        ctx.fillStyle = grow ? bands[i] : g;
        ctx.beginPath();
        ctx.moveTo(exit.x, exit.y);
        ctx.lineTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.closePath();
        ctx.fill();
      }
    };

    const draw = () => {
      if (!geo) return;
      const { top, bl, br, chat } = geo;
      const entry = lerp(top, bl, 0.56);
      const exit = lerp(top, br, 0.56 + aim * 0.06);
      // On narrow screens the prism sits near the edge, so the swing shrinks to keep the beam shallow.
      const reach = Math.min(180, h * 0.22, entry.x * 0.45);
      const start: Pt = { x: 0, y: entry.y + aim * reach + Math.min(40, entry.x * 0.2) };

      // Spectrum lands on the chat panel's nearest edge.
      const side = chat.x > exit.x - 4;
      const inset = 18;
      const swing = aim * 0.18;
      let a: Pt, b: Pt;
      if (side) {
        const y0 = chat.y + inset;
        const span = chat.h - inset * 2;
        a = { x: chat.x, y: y0 + span * Math.max(0, 0.04 + swing) };
        b = { x: chat.x, y: y0 + span - span * Math.max(0, 0.04 - swing) };
      } else {
        const x0 = chat.x + inset;
        const span = chat.w - inset * 2;
        a = { x: x0 + span * Math.max(0, 0.06 + swing), y: chat.y };
        b = { x: x0 + span - span * Math.max(0, 0.06 - swing), y: chat.y };
      }

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = dark ? 'lighter' : 'source-over';
      fan(exit, a, b, 26, dark ? 0.07 : 0.05, side);
      fan(exit, a, b, 0, dark ? 0.55 : 0.32, side);

      // Where the light lands: a lit edge per band, with its label.
      ctx.globalAlpha = 1;
      ctx.lineWidth = 2;
      ctx.font = `600 10px ${mono}`;
      const n = bands.length;
      for (let i = 0; i < n; i++) {
        const p0 = lerp(a, b, i / n);
        const p1 = lerp(a, b, (i + 1) / n);
        ctx.strokeStyle = bands[i];
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.stroke();
        const mid = lerp(p0, p1, 0.5);
        ctx.fillStyle = bands[i];
        ctx.textAlign = side ? 'right' : 'center';
        ctx.textBaseline = side ? 'middle' : 'bottom';
        ctx.fillText(BANDS[i].label, side ? mid.x - 10 : mid.x, side ? mid.y : mid.y - 8);
      }

      // The white beam: one soft layer and a hard core.
      ctx.strokeStyle = beam;
      ctx.lineCap = 'round';
      for (const [width, alpha] of [
        [8, 0.08],
        [1.6, 0.95],
      ]) {
        ctx.globalAlpha = alpha;
        ctx.lineWidth = width;
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(entry.x, entry.y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';

      // Angle of incidence against the left face's outward normal.
      const fx = bl.x - top.x;
      const fy = bl.y - top.y;
      const len = Math.hypot(fx, fy);
      const dx = start.x - entry.x;
      const dy = start.y - entry.y;
      const cos = Math.abs((dx * -fy + dy * fx) / len / Math.hypot(dx, dy));
      const text = `θ ${((Math.acos(cos) * 180) / Math.PI).toFixed(1)}°`;
      if (text !== lastReadout && readoutRef.current) {
        readoutRef.current.textContent = text;
        lastReadout = text;
      }
    };

    // Frames run only while the beam is catching up with the cursor.
    let raf = 0;
    let visible = true;
    const loop = () => {
      raf = 0;
      aim += (target - aim) * 0.12;
      if (Math.abs(target - aim) < 0.0015) aim = target;
      draw();
      if (aim !== target && visible) raf = requestAnimationFrame(loop);
    };
    const kick = () => {
      if (!raf && visible) raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      target = Math.max(-1, Math.min(1, (e.clientY / window.innerHeight) * 2 - 1));
      kick();
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) kick();
    });
    let resizeRaf = 0;
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        measure();
        draw();
      });
    });
    const mo = new MutationObserver(() => {
      readColors();
      draw();
    });

    readColors();
    measure();
    draw();
    io.observe(section);
    ro.observe(section);
    if (chatRef.current) ro.observe(chatRef.current);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    if (animated) window.addEventListener('pointermove', onMove, { passive: true });
    // Fonts can shift layout after first paint; re-measure once they settle.
    document.fonts?.ready.then(() => {
      readColors();
      measure();
      draw();
    });

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(resizeRaf);
      io.disconnect();
      ro.disconnect();
      mo.disconnect();
      window.removeEventListener('pointermove', onMove);
    };
  }, [sectionRef, canvasRef, prismRef, chatRef, readoutRef]);
}

const rise = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};
const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prismRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const readoutRef = useRef<HTMLSpanElement>(null);

  useBeam(sectionRef, canvasRef, prismRef, chatRef, readoutRef);

  return (
    <section id="about" ref={sectionRef} className="relative overflow-hidden pb-20 pt-28 sm:pt-32 lg:pb-28">
      <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 z-0" />
      {/* Static light pools where the spectrum spills (no blur filter, no animation) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(40% 50% at 85% 25%, color-mix(in srgb, var(--s-ai) 14%, transparent), transparent 70%), radial-gradient(35% 45% at 5% 60%, color-mix(in srgb, var(--s-api) 10%, transparent), transparent 70%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Name: the one loud thing */}
        <div className="relative">
          <h1 className="font-display text-[clamp(2.6rem,8.6vw,6rem)] text-[var(--ink)]">
            <TypedName lines={['Sean Rizarre', 'Reyes']} />
          </h1>
          <motion.div
            {...rise}
            transition={{ duration: 0.9, delay: 0.5, ease }}
            className="mt-6 max-w-xl xl:absolute xl:bottom-1 xl:right-0 xl:mt-0 xl:max-w-md"
          >
            <p className="text-balance text-xl font-semibold leading-snug text-[var(--ink)] sm:text-2xl">
              Software Engineer shipping full-stack features, APIs and AI end to end.
            </p>
            <p className="mt-3 flex items-center gap-1.5 text-sm text-[var(--ink-3)]">
              <MapPin className="size-4" />
              Makati, Philippines
            </p>
          </motion.div>
        </div>

        <div className="mt-12 grid items-center gap-y-14 lg:mt-14 lg:grid-cols-12 lg:gap-x-8">
          {/* Prism + photo + actions */}
          <motion.div
            {...rise}
            transition={{ duration: 1, delay: 0.3, ease }}
            className="flex flex-col items-center lg:col-span-5 lg:items-start"
          >
            <div ref={prismRef} className="relative aspect-[1/0.866] w-[280px] sm:w-[340px] xl:w-[380px]">
              {/* Cut-glass prism body */}
              <div
                aria-hidden
                className="absolute inset-0 bg-[var(--ground-2)]/85"
                style={{
                  clipPath: 'polygon(50% 0, 100% 100%, 0 100%)',
                  backgroundImage:
                    'linear-gradient(200deg, rgb(255 255 255 / 0.16), transparent 38%), linear-gradient(115deg, transparent 55%, rgb(51 194 255 / 0.10) 72%, rgb(255 90 54 / 0.12) 88%), linear-gradient(0deg, rgb(255 255 255 / 0.06), transparent 18%)',
                }}
              />
              <svg aria-hidden viewBox="0 0 100 86.6" preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible">
                <defs>
                  <linearGradient id="prism-edge" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="var(--beam)" stopOpacity="0.9" />
                    <stop offset="0.55" stopColor="var(--beam)" stopOpacity="0.25" />
                    <stop offset="0.75" stopColor="var(--s-ai)" stopOpacity="0.8" />
                    <stop offset="1" stopColor="var(--s-ui)" stopOpacity="0.8" />
                  </linearGradient>
                  <linearGradient id="prism-fringe" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0.2" stopColor="var(--s-ui)" stopOpacity="0" />
                    <stop offset="0.45" stopColor="var(--s-api)" />
                    <stop offset="0.6" stopColor="var(--s-data)" />
                    <stop offset="0.78" stopColor="var(--s-ai)" />
                    <stop offset="1" stopColor="var(--s-lab)" />
                  </linearGradient>
                </defs>
                {/* The beam's refracted path through the glass, entry face to exit face */}
                <line x1="28" y1="48.5" x2="72" y2="50" stroke="var(--beam)" strokeWidth="1.2" opacity="0.5" vectorEffect="non-scaling-stroke" />
                <line x1="28" y1="48.5" x2="72" y2="50" stroke="var(--beam)" strokeWidth="6" opacity="0.08" vectorEffect="non-scaling-stroke" style={{ filter: 'blur(2px)' }} />
                {/* Exit face disperses: a soft spectral fringe just outside the right face */}
                <line x1="51" y1="1.5" x2="99.6" y2="85.6" stroke="url(#prism-fringe)" strokeWidth="2.4" opacity="0.55" style={{ filter: 'blur(1.6px)' }} />
                <polygon
                  points="50,0.6 99.4,86 0.6,86"
                  fill="none"
                  stroke="url(#prism-edge)"
                  strokeWidth="0.6"
                  vectorEffect="non-scaling-stroke"
                  strokeLinejoin="round"
                  style={{ strokeWidth: 1.25 }}
                />
              </svg>
              {/* Photo sits at the prism's centroid; the beam passes through it */}
              <div className="absolute left-1/2 top-[66.7%] -translate-x-1/2 -translate-y-1/2">
                <MagneticButton
                  className="size-[132px] sm:size-[160px] xl:size-[178px]"
                  innerStrength={0}
                  style={{
                    boxShadow: '0 0 0 3px var(--ground), 0 0 0 4px var(--line-strong), 0 18px 50px -10px rgb(0 0 0 / 0.55)',
                  }}
                >
                  <Avatar className="size-[132px] rounded-none sm:size-[160px] xl:size-[178px]">
                    <AvatarImage src="/images/sean.jpg" alt="Sean Rizarre Reyes" className="object-cover" />
                    <AvatarFallback className="rounded-none bg-[var(--ground-2)] text-4xl font-semibold">SR</AvatarFallback>
                  </Avatar>
                </MagneticButton>
              </div>
              <span
                ref={readoutRef}
                aria-hidden
                className="tabular absolute -bottom-7 left-0 font-mono text-[11px] tracking-wider text-[var(--ink-3)]"
              >
                θ 0.0°
              </span>
            </div>

            <div className="mt-14 flex flex-wrap justify-center gap-2.5 lg:justify-start">
              <MagneticButton baseRadius={26} className="w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group relative inline-flex h-14 w-full items-center justify-center gap-2.5 overflow-hidden bg-[var(--ink)] px-7 text-[15px] font-semibold text-[var(--ground)] transition-shadow duration-300 hover:shadow-[0_10px_40px_-8px_var(--s-ai)] active:scale-[0.97]"
                >
                  <span className="spectrum-soft pointer-events-none absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <Mail className="size-[18px] transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" />
                  Get in Touch
                </button>
              </MagneticButton>
              <MagneticButton baseRadius={26} className="flex-1 border border-[var(--line-strong)] bg-[var(--ground-2)] transition-colors duration-300 hover:border-[var(--ink)] sm:flex-none">
                <a
                  href="https://github.com/Rizarre"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex h-[54px] w-full items-center justify-center gap-2.5 overflow-hidden px-6 text-[15px] font-medium active:scale-[0.97]"
                >
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <Github className="size-[18px] transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                  GitHub
                </a>
              </MagneticButton>
              <MagneticButton baseRadius={26} className="flex-1 border border-[var(--line-strong)] bg-[var(--ground-2)] transition-colors duration-300 hover:border-[#0A66C2] sm:flex-none">
                <a
                  href="https://www.linkedin.com/in/seanrizarre/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex h-[54px] w-full items-center justify-center gap-2.5 overflow-hidden px-6 text-[15px] font-medium transition-colors duration-300 hover:bg-[#0A66C2] hover:text-white active:scale-[0.97]"
                >
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <Linkedin className="size-[18px] transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" />
                  LinkedIn
                </a>
              </MagneticButton>
            </div>
          </motion.div>

          {/* The spectrum lands here */}
          <motion.div
            {...rise}
            transition={{ duration: 1, delay: 0.45, ease }}
            className="w-full lg:col-span-6 lg:col-start-7"
          >
            <HeroChat ref={chatRef} solid />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
