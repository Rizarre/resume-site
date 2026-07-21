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
    const onMove = (e: MouseEvent) => {
      const el = outerRef.current;
      if (!el) return;

      const rect    = el.getBoundingClientRect();
      const centerX = rect.left + rect.width  / 2;
      const centerY = rect.top  + rect.height / 2;
      const dx      = e.clientX - centerX;
      const dy      = e.clientY - centerY;
      const dist    = Math.hypot(dx, dy);

      if (dist < detectionRadius) {
        // t: 0 at edge of radius → 1 at button center
        const t  = 1 - dist / detectionRadius;
        const nx = dx / Math.max(dist, 1);   // unit vector toward cursor
        const ny = dy / Math.max(dist, 1);

        // Move the shell and inner content
        x.set(dx * strength * t);
        y.set(dy * strength * t);
        ix.set(dx * strength * innerStrength * t);
        iy.set(dy * strength * innerStrength * t);

        // --- Border-radius deformation ---
        // Each corner has a "natural direction". The corner most aligned with
        // the cursor direction gets pulled (radius shrinks to near-0).
        // TL=(-1,-1) TR=(1,-1) BR=(1,1) BL=(-1,1), normalised by √2
        const corners: [number, number][] = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
        const maxPull = t * 0.94;

        const radii = corners.map(([ex, ey]) => {
          // Dot product: how much does cursor direction point at this corner?
          const alignment = (nx * ex + ny * ey) / Math.SQRT2; // -1..1
          const pull = Math.max(0, alignment) * maxPull;
          // Lerp from the resting radius → 4 (sharp point)
          return Math.round(baseRadius + (4 - baseRadius) * pull);
        });

        // Apply directly to DOM — no re-render, no lag
        el.style.borderRadius = radii.map(r => `${r}px`).join(' ');
      } else {
        x.set(0);  y.set(0);
        ix.set(0); iy.set(0);
        el.style.borderRadius = `${baseRadius}px`;
      }
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [x, y, ix, iy, strength, innerStrength, detectionRadius, baseRadius]);

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
        className="flex items-center"
        style={{ x: six, y: siy }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
