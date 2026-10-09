'use client';

import { CSSProperties, useRef, useEffect, ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Pixel radius from button center at which the effect activates */
  detectionRadius?: number;
  /** How far the button actually travels (0–1 fraction of cursor offset) */
  strength?: number;
  /**
   * How much the inner content lags behind the outer shell (0–1).
   * Use 0 for full-bleed images so the image doesn't slide within the frame.
   * Default: 0.28
   */
  innerStrength?: number;
  /** Resting border-radius in px. Default 9999 (full pill). */
  baseRadius?: number;
}

/**
 * Wraps any button/element and adds:
 *  - Magnetic pull: element drifts toward the cursor when it gets close
 *  - Morphing shape: border-radius deforms asymmetrically toward the cursor
 *  - Jelly inner: inner content lags behind the outer shell (set innerStrength=0 to disable)
 *
 * Child buttons should pass `rounded-none` so the wrapper's clipped shape
 * is the only visible border-radius.
 */
export function MagneticButton({
  children,
  className = '',
  style,
  detectionRadius = 110,
  strength = 0.42,
  innerStrength = 0.28,
  baseRadius = 9999,
}: MagneticButtonProps) {
  const outerRef = useRef<HTMLDivElement>(null);

  // --- Outer shell spring (slow, heavy — the "pull") ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 160, damping: 14, mass: 0.7 });
  const sy = useSpring(y, { stiffness: 160, damping: 14, mass: 0.7 });

  // --- Inner content spring (faster — gives the "jelly lag") ---
  const ix = useMotionValue(0);
  const iy = useMotionValue(0);
  const six = useSpring(ix, { stiffness: 300, damping: 18, mass: 0.3 });
  const siy = useSpring(iy, { stiffness: 300, damping: 18, mass: 0.3 });

  useEffect(() => {
    const el = outerRef.current;
    if (!el || !window.matchMedia('(pointer: fine)').matches) return;

    // The resting centre is cached and only re-read after scroll/resize. Reading
    // layout on every mousemove (for every button) was a big source of jank.
    let cx = 0;
    let cy = 0;
    let dirty = true;
    let engaged = false;
    let lastRadius = '';
    const remeasure = () => {
      const rect = el.getBoundingClientRect();
      // Subtract the live spring offset so the cache is the resting position.
      cx = rect.left + rect.width / 2 - sx.get();
      cy = rect.top + rect.height / 2 - sy.get();
      dirty = false;
    };
    const setRadius = (value: string) => {
      if (value === lastRadius) return;
      lastRadius = value;
      el.style.borderRadius = value;
    };

    const onMove = (e: MouseEvent) => {
      if (dirty) remeasure();
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);

      if (dist < detectionRadius) {
        engaged = true;
        // t: 0 at edge of radius → 1 at button center
        const t = 1 - dist / detectionRadius;
        const nx = dx / Math.max(dist, 1); // unit vector toward cursor
        const ny = dy / Math.max(dist, 1);

        x.set(dx * strength * t);
        y.set(dy * strength * t);
        ix.set(dx * strength * innerStrength * t);
        iy.set(dy * strength * innerStrength * t);

        // Border-radius deformation: the corner most aligned with the cursor
        // direction gets pulled toward a sharp point.
        // TL=(-1,-1) TR=(1,-1) BR=(1,1) BL=(-1,1), normalised by √2
        const corners: [number, number][] = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
        const maxPull = t * 0.94;
        const radii = corners.map(([ex, ey]) => {
          const alignment = (nx * ex + ny * ey) / Math.SQRT2; // -1..1
          const pull = Math.max(0, alignment) * maxPull;
          return Math.round(baseRadius + (4 - baseRadius) * pull);
        });
        setRadius(radii.map(r => `${r}px`).join(' '));
      } else if (engaged) {
        engaged = false;
        x.set(0);  y.set(0);
        ix.set(0); iy.set(0);
        setRadius(`${baseRadius}px`);
      }
    };
    const markDirty = () => {
      dirty = true;
    };

    // Only track the cursor while the button is on (or near) the screen.
    let listening = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !listening) {
          dirty = true;
          window.addEventListener('mousemove', onMove, { passive: true });
          listening = true;
        } else if (!entry.isIntersecting && listening) {
          window.removeEventListener('mousemove', onMove);
          listening = false;
        }
      },
      { rootMargin: '120px' }
    );
    io.observe(el);
    window.addEventListener('scroll', markDirty, { passive: true });
    window.addEventListener('resize', markDirty, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', markDirty);
      window.removeEventListener('resize', markDirty);
    };
  }, [x, y, ix, iy, sx, sy, strength, innerStrength, detectionRadius, baseRadius]);

  return (
    <motion.div
      ref={outerRef}
      className={`inline-flex overflow-hidden ${className}`}
      style={{
        x: sx,
        y: sy,
        // Initial shape; JS will take over from here
        borderRadius: `${baseRadius}px`,
        // Smooth the border-radius transitions between frames
        transition: 'border-radius 90ms ease-out',
        willChange: 'transform, border-radius',
        ...style,
      }}
    >
      <motion.div
        className="flex w-full items-center"
        style={{ x: six, y: siy }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
