'use client';

import { useEffect, useState } from 'react';

const TYPE_MS = 70;
const DELETE_MS = 45;
const HOLD_MS = 2000;
const EMPTY_MS = 450;

/**
 * Types the name out, holds, deletes and loops. Each line reserves its full
 * width with an invisible copy, so typing never shifts the layout (and never
 * moves the prism the beam is aimed at). The real name is in the DOM for
 * crawlers and screen readers; the typed copy is decorative.
 */
export function TypedName({ lines }: { lines: string[] }) {
  const total = lines.reduce((n, l) => n + l.length, 0);
  const [count, setCount] = useState(total);
  const [phase, setPhase] = useState<'typing' | 'holding' | 'deleting' | 'static'>('static');

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setCount(0);
    setPhase('typing');
  }, []);

  useEffect(() => {
    if (phase === 'static') return;
    let t: number;
    if (phase === 'typing') {
      t = window.setTimeout(() => {
        if (count + 1 >= total) {
          setCount(total);
          setPhase('holding');
        } else setCount(count + 1);
      }, TYPE_MS);
    } else if (phase === 'holding') {
      t = window.setTimeout(() => setPhase('deleting'), HOLD_MS);
    } else {
      t = window.setTimeout(
        () => {
          if (count <= 0) setPhase('typing');
          else setCount(count - 1);
        },
        count <= 0 ? EMPTY_MS : DELETE_MS
      );
    }
    return () => window.clearTimeout(t);
  }, [phase, count, total]);

  // The caret sits at the end of the typed text: on the first line whose end it hasn't passed.
  let start = 0;
  let caretLine = lines.length - 1;
  const shown = lines.map((line, i) => {
    const n = Math.max(0, Math.min(line.length, count - start));
    if (caretLine === lines.length - 1 && count <= start + line.length && i < caretLine) caretLine = i;
    start += line.length;
    return line.slice(0, n);
  });
  const animating = phase !== 'static';

  return (
    <>
      <span className="sr-only">{lines.join(' ')}</span>
      {lines.map((line, i) => (
        <span key={line} aria-hidden className={`relative block ${i > 0 ? 'mt-1' : ''}`}>
          <span className="invisible">{line}</span>
          <span className="absolute inset-0 whitespace-nowrap">
            {shown[i]}
            {animating && i === caretLine && <span className="type-caret" />}
          </span>
        </span>
      ))}
    </>
  );
}
