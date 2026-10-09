'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProjectModal } from '@/components/project-modal';

export interface ProjectGroup {
  label: string;
  items: string[];
}

export interface Project {
  title: string;
  description: string;
  /** Long-form copy for the detail modal; falls back to `description` when absent */
  overview?: string;
  /** Bullet points called out in the detail modal */
  highlights?: string[];
  /** Labelled columns in the detail modal, e.g. services grouped by role */
  groups?: ProjectGroup[];
  tech: string[];
  /** Omitted for projects with nothing public to link to — the card hides its link button */
  link?: string;
  image: string;
  /** 'contain' letterboxes portrait/mobile screenshots so the whole frame shows */
  fit?: 'cover' | 'contain';
}

/**
 * Coverflow carousel: one project sits centered and enlarged, its neighbours
 * peek in from the left and right, scaled down, tilted and blurred. Clicking a
 * neighbour (or an arrow / dot / arrow key / swipe) rotates it into the middle.
 */
export function ProjectCarousel({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(0);
  const [spacing, setSpacing] = useState(340);
  const [opened, setOpened] = useState<Project | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const count = projects.length;

  // Signed distance from the active card, wrapped so the deck loops the short way.
  const offsetOf = useCallback(
    (index: number) => {
      const half = Math.floor(count / 2);
      return ((index - active + count + half) % count) - half;
    },
    [active, count]
  );

  const go = useCallback(
    (delta: number) => setActive(prev => (prev + delta + count) % count),
    [count]
  );

  // Side cards sit closer together on narrow viewports so they still peek in.
  useEffect(() => {
    const measure = () => {
      const width = stageRef.current?.offsetWidth ?? 0;
      setSpacing(Math.max(180, Math.min(400, width * 0.42)));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Arrow keys rotate the deck, but not while the detail modal has focus —
  // otherwise the carousel shuffles behind the open dialog.
  useEffect(() => {
    if (opened) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') go(-1);
      if (e.key === 'ArrowRight') go(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, opened]);

  return (
    <div className="relative">
      <div
        ref={stageRef}
        className="relative h-[520px] sm:h-[560px] select-none"
        style={{ perspective: 1600 }}
      >
        {projects.map((project, index) => {
          const offset = offsetOf(index);
          const isActive = offset === 0;
          const distance = Math.abs(offset);

          return (
            <motion.div
              key={project.title}
              // Full-bleed flex layer centers the card; `x` then offsets it from center.
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              // willChange:'auto' stops the layer being pinned as a stale bitmap.
              style={{ zIndex: count - distance, willChange: 'auto' }}
              animate={{
                x: offset * spacing,
                scale: isActive ? 1 : 0.78,
                rotateY: offset * -22,
                opacity: distance > 1 ? 0 : 1,
              }}
              transition={{ type: 'spring', stiffness: 210, damping: 26, mass: 0.9 }}
              // Middle card grows via width (a real layout change → text re-renders crisply);
              // it only gets a lift here. Neighbours are blurred anyway, so scaling them is fine.
              whileHover={isActive ? { y: -10 } : { scale: 0.83 }}
              onClick={() => (isActive ? setOpened(project) : go(offset))}
            >
              <Card
                role="button"
                tabIndex={isActive ? 0 : -1}
                aria-label={isActive ? `Open details for ${project.title}` : `Show ${project.title}`}
                onKeyDown={e => {
                  if (e.key !== 'Enter' && e.key !== ' ') return;
                  e.preventDefault();
                  setOpened(project);
                }}
                // Blur lives here as a plain class so the active card has NO filter at all
                // (a filter forces layer rasterization and softens scaled text).
                data-spot={isActive ? '' : undefined}
                className={`group/card relative glass overflow-hidden rounded-[1.25rem] pointer-events-auto transition-[width,filter,box-shadow] duration-500 ease-out ${
                  isActive
                    ? 'w-[300px] sm:w-[380px] lg:w-[430px] hover:w-[320px] sm:hover:w-[410px] lg:hover:w-[470px]'
                    : 'w-[300px] sm:w-[380px] lg:w-[430px] blur-[2px]'
                } ${
                  isActive
                    ? 'cursor-pointer shadow-[0_30px_80px_-24px_rgb(0_0_0/0.55)] hover:shadow-[0_40px_90px_-20px_var(--s-ai)]'
                    : 'cursor-pointer shadow-lg hover:shadow-xl'
                }`}
              >
                {/* Faint gradient tint on the card surface, behind every bit of content */}
                <div className="spectrum-soft gradient-pan pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-[0.07]" />
                <div className="relative z-10 aspect-video overflow-hidden border-b border-[var(--line)] bg-[var(--ground-2)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt={project.title}
                    draggable={false}
                    className={`w-full h-full transition-transform duration-700 ${
                      project.fit === 'contain' ? 'object-contain' : 'object-cover'
                    } ${isActive ? 'scale-100 group-hover/card:scale-105' : 'scale-[1.02]'}`}
                  />
                  {/* Neighbours are dimmed so the eye lands on the middle card */}
                  <div
                    className={`absolute inset-0 bg-[var(--ground)] transition-opacity duration-500 ${
                      isActive ? 'opacity-0' : 'opacity-40'
                    }`}
                  />
                  {/* Hover affordance: the centred card opens a detail view */}
                  {isActive && (
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[var(--ground)]/45 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100">
                      <span className="flex items-center gap-2 rounded-full bg-[var(--ink)] px-4 py-2 text-sm font-medium text-[var(--ground)] shadow-lg">
                        <Maximize2 className="size-4" />
                        View details
                      </span>
                    </div>
                  )}
                </div>
                <CardHeader className="relative z-10">
                  <CardTitle className="flex items-center justify-between gap-2">
                    <span className="font-display-normal relative text-xl font-bold tracking-[-0.01em]">
                      {project.title}
                      {/* The spectrum draws under the title when the card is lit */}
                      <span className="spectrum absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 transition-transform duration-500 group-hover/card:scale-x-100" />
                    </span>
                    {project.link && (
                      <Button
                        variant="ghost"
                        size="sm"
                        aria-label={`Open ${project.title} on GitHub`}
                        tabIndex={isActive ? 0 : -1}
                        className={`rounded-full transition-transform hover:-translate-y-0.5 hover:translate-x-0.5 ${isActive ? '' : 'pointer-events-none opacity-0'}`}
                        onClick={e => {
                          e.stopPropagation();
                          window.open(project.link, '_blank');
                        }}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    )}
                  </CardTitle>
                  <CardDescription className="leading-relaxed text-[var(--ink-2)]">{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map(tech => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="rounded-full border-[var(--line-strong)] px-2.5 font-mono text-[11px] text-[var(--ink-2)] transition-colors duration-500 group-hover/card:border-[var(--ink-3)] group-hover/card:text-[var(--ink)]"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Arrows */}
      <button
        aria-label="Previous project"
        onClick={() => go(-1)}
        className="group absolute left-0 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full glass hidden sm:flex items-center justify-center transition-all duration-300 hover:bg-[var(--ink)] hover:text-[var(--ground)] hover:scale-110 active:scale-95"
      >
        <ChevronLeft className="h-6 w-6 transition-transform duration-300 group-hover:-translate-x-0.5" />
      </button>
      <button
        aria-label="Next project"
        onClick={() => go(1)}
        className="group absolute right-0 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full glass hidden sm:flex items-center justify-center transition-all duration-300 hover:bg-[var(--ink)] hover:text-[var(--ground)] hover:scale-110 active:scale-95"
      >
        <ChevronRight className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-0.5" />
      </button>

      {/* Dots */}
      <div className="mt-4 flex items-center justify-center gap-2">
        <button
          aria-label="Previous project"
          onClick={() => go(-1)}
          className="glass mr-2 grid size-10 place-items-center rounded-full sm:hidden"
        >
          <ChevronLeft className="size-5" />
        </button>
        {projects.map((project, index) => (
          <button
            key={project.title}
            aria-label={`Show ${project.title}`}
            onClick={() => setActive(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === active
                ? 'spectrum w-10'
                : 'w-2 bg-[var(--line-strong)] hover:bg-[var(--ink-3)]'
            }`}
          />
        ))}
        <button
          aria-label="Next project"
          onClick={() => go(1)}
          className="glass ml-2 grid size-10 place-items-center rounded-full sm:hidden"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      <ProjectModal project={opened} onOpenChange={open => !open && setOpened(null)} />
    </div>
  );
}
