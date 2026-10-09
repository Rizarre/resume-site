'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ChevronDown, Linkedin } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export interface Recommendation {
  name: string;
  profile: string;
  occupation: string;
  image: string;
  /** A sentence lifted verbatim from the message, shown as the pull quote */
  quote: string;
  message: string;
  band: string;
}

const DWELL = 9000;
const ease = [0.16, 1, 0.3, 1] as const;

/**
 * One recommendation at a time: a big pull quote, auto-advancing on a visible
 * timer. Hovering, focusing or expanding the full text pauses it.
 */
export function RecommendationCarousel({ items }: { items: Recommendation[] }) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);
  const count = items.length;
  const paused = expanded || hovered || !inView || reduced;
  const rec = items[index];

  const go = useCallback(
    (delta: number) => {
      setDir(delta);
      setExpanded(false);
      setIndex(i => (i + delta + count) % count);
    },
    [count]
  );

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = window.setTimeout(() => go(1), DWELL);
    return () => window.clearTimeout(t);
  }, [paused, index, go]);

  return (
    <motion.div
      className="relative"
      onViewportEnter={() => setInView(true)}
      onViewportLeave={() => setInView(false)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={() => setHovered(false)}
    >
      <div data-spot className="glass overflow-hidden rounded-[1.5rem] px-6 py-10 sm:px-12 sm:py-14 lg:px-16">
        {/* Band of light along the top in this recommender's color */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px transition-colors duration-700"
          style={{ background: `linear-gradient(90deg, transparent, var(${rec.band}), transparent)` }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-72 w-[70%] -translate-x-1/2 rounded-full opacity-25 blur-3xl transition-colors duration-700"
          style={{ background: `var(${rec.band})` }}
        />

        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.figure
            key={rec.name}
            custom={dir}
            initial={{ opacity: 0, x: dir * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -40 }}
            transition={{ duration: 0.55, ease }}
            className="relative"
          >
            <svg aria-hidden viewBox="0 0 32 24" className="mb-6 h-8 w-10" style={{ color: `var(${rec.band})` }}>
              <path
                fill="currentColor"
                d="M0 24V14.4C0 6.4 4.3 1.6 12 0l1.4 3.2C9 4.6 7 7.4 6.8 11H12v13H0zm19 0V14.4C19 6.4 23.3 1.6 31 0l1 3.2C27.6 4.6 25.7 7.4 25.5 11H31v13H19z"
              />
            </svg>
            <blockquote>
              <p className="font-display-normal text-balance text-[clamp(1.4rem,3.2vw,2.35rem)] font-semibold leading-[1.18] tracking-[-0.02em] text-[var(--ink)]">
                {rec.quote}
              </p>
            </blockquote>

            <figcaption className="mt-10 flex flex-wrap items-center justify-between gap-6">
              <a
                href={rec.profile}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4"
              >
                <Avatar className="size-14 ring-2 ring-[var(--line-strong)] transition-all group-hover:ring-[var(--ink)]">
                  <AvatarImage src={rec.image} alt={rec.name} className="object-cover" />
                  <AvatarFallback className="bg-[var(--ground-2)] font-semibold">
                    {rec.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <span>
                  <span className="flex items-center gap-2 font-semibold text-[var(--ink)]">
                    {rec.name}
                    <Linkedin className="size-4 text-[var(--ink-3)] transition-colors group-hover:text-[#0A66C2]" />
                  </span>
                  <span className="text-sm text-[var(--ink-3)]">{rec.occupation}</span>
                </span>
              </a>

              <button
                type="button"
                onClick={() => setExpanded(e => !e)}
                aria-expanded={expanded}
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line-strong)] px-4 py-2 text-sm font-medium text-[var(--ink-2)] transition-colors hover:border-[var(--ink)] hover:text-[var(--ink)]"
              >
                {expanded ? 'Show less' : 'Read full recommendation'}
                <ChevronDown className={`size-4 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
              </button>
            </figcaption>

            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease }}
                  className="overflow-hidden"
                >
                  <div className="mt-8 max-w-[68ch] space-y-4 border-t border-[var(--line)] pt-8 leading-relaxed text-[var(--ink-2)]">
                    {rec.message.split('\n\n').map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.figure>
        </AnimatePresence>
      </div>

      {/* Controls: avatars double as dots, each with its own dwell timer */}
      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {items.map((item, i) => (
            <button
              key={item.name}
              type="button"
              aria-label={`Show recommendation from ${item.name}`}
              aria-current={i === index}
              onClick={() => {
                if (i === index) return;
                setDir(i > index ? 1 : -1);
                setExpanded(false);
                setIndex(i);
              }}
              className="group flex flex-col items-center gap-2"
            >
              <Avatar
                className={`size-9 transition-all duration-300 ${
                  i === index ? 'opacity-100 ring-2 ring-[var(--ink)]' : 'opacity-50 grayscale group-hover:opacity-90 group-hover:grayscale-0'
                }`}
              >
                <AvatarImage src={item.image} alt="" className="object-cover" />
                <AvatarFallback className="bg-[var(--ground-2)] text-xs">
                  {item.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <span className="relative h-[2px] w-9 overflow-hidden rounded-full bg-[var(--line-strong)]">
                {i === index && (
                  <motion.span
                    key={`${index}-${paused}`}
                    className="absolute inset-y-0 left-0 w-full origin-left"
                    style={{ background: `var(${item.band})` }}
                    initial={{ scaleX: paused ? 1 : 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: paused ? 0 : DWELL / 1000, ease: 'linear' }}
                  />
                )}
              </span>
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Previous recommendation"
            onClick={() => go(-1)}
            className="glass group grid size-11 place-items-center rounded-full transition-all hover:scale-105 hover:bg-[var(--ink)] hover:text-[var(--ground)] active:scale-95"
          >
            <ChevronLeft className="size-5 transition-transform group-hover:-translate-x-0.5" />
          </button>
          <button
            type="button"
            aria-label="Next recommendation"
            onClick={() => go(1)}
            className="glass group grid size-11 place-items-center rounded-full transition-all hover:scale-105 hover:bg-[var(--ink)] hover:text-[var(--ground)] active:scale-95"
          >
            <ChevronRight className="size-5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
