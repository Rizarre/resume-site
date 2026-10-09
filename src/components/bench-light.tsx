'use client';

import { useEffect } from 'react';

/**
 * The optical bench behind the whole page, plus the one pointer listener that
 * powers every cursor-reactive light:
 *  - a small lit tile follows the cursor and lights the breadboard holes under it
 *  - --mx/--my on the hovered [data-spot] element drive its dispersed glass edge
 * Writes are batched into one rAF so nothing re-renders.
 */
export function BenchLight() {
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const tile = document.querySelector<HTMLElement>('.bench-lit');
    let frame = 0;
    let x = 0;
    let y = 0;
    let target: Element | null = null;

    const flush = () => {
      frame = 0;
      if (tile) {
        const tx = Math.round(x - 220);
        const ty = Math.round(y - 220);
        tile.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
        // Counter-shift the dots so they stay locked to the bench grid.
        tile.style.backgroundPosition = `${14 - tx}px ${14 - ty}px`;
        tile.classList.add('on');
      }
      const spot = target?.closest<HTMLElement>('[data-spot]');
      if (spot) {
        const rect = spot.getBoundingClientRect();
        spot.style.setProperty('--mx', `${x - rect.left}px`);
        spot.style.setProperty('--my', `${y - rect.top}px`);
      }
    };

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      target = e.target as Element;
      if (!frame) frame = requestAnimationFrame(flush);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div aria-hidden className="bench" />
      <div aria-hidden className="bench-lit" />
    </>
  );
}
