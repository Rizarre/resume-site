'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string;
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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') go(-1);
      if (e.key === 'ArrowRight') go(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go]);

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
              onClick={() => !isActive && go(offset)}
            >
              <Card
                // Blur lives here as a plain class so the active card has NO filter at all
                // (a filter forces layer rasterization and softens scaled text).
                className={`group/card relative glass overflow-hidden pointer-events-auto transition-[width,filter,box-shadow] duration-500 ease-out ${
                  isActive
                    ? 'w-[300px] sm:w-[380px] lg:w-[430px] hover:w-[320px] sm:hover:w-[410px] lg:hover:w-[470px]'
                    : 'w-[300px] sm:w-[380px] lg:w-[430px] blur-[2px]'
                } ${
                  isActive
                    ? 'shadow-2xl shadow-blue-500/25 cursor-default hover:ring-2 hover:ring-purple-500/60 hover:shadow-[0_25px_70px_-12px] hover:shadow-purple-500/50'
                    : 'cursor-pointer shadow-lg hover:shadow-xl'
                }`}
              >
                {/* Faint gradient tint on the card surface, behind every bit of content */}
                <div className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100 gradient-pan bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />
                <div className="relative z-10 aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-950 dark:to-blue-900 overflow-hidden">
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
                    className={`absolute inset-0 bg-slate-900 transition-opacity duration-500 ${
                      isActive ? 'opacity-0' : 'opacity-25'
                    }`}
                  />
                </div>
                <CardHeader className="relative z-10">
                  <CardTitle className="flex items-center justify-between gap-2">
                    <span className="gradient-pan bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text transition-colors duration-500 group-hover/card:text-transparent">
                      {project.title}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      tabIndex={isActive ? 0 : -1}
                      className={isActive ? '' : 'pointer-events-none opacity-0'}
                      onClick={e => {
                        e.stopPropagation();
                        window.open(project.link, '_blank');
                      }}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map(tech => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="text-xs transition-all duration-500 group-hover/card:border-transparent group-hover/card:bg-gradient-to-r group-hover/card:from-blue-500/15 group-hover/card:to-purple-500/15"
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
        className="group absolute left-0 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full glass flex items-center justify-center shadow-lg transition-all duration-300 hover:bg-blue-600 hover:text-white hover:scale-110 hover:shadow-blue-500/50 active:scale-95"
      >
        <ChevronLeft className="h-6 w-6 transition-transform duration-300 group-hover:-translate-x-0.5" />
      </button>
      <button
        aria-label="Next project"
        onClick={() => go(1)}
        className="group absolute right-0 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full glass flex items-center justify-center shadow-lg transition-all duration-300 hover:bg-blue-600 hover:text-white hover:scale-110 hover:shadow-blue-500/50 active:scale-95"
      >
        <ChevronRight className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-0.5" />
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {projects.map((project, index) => (
          <button
            key={project.title}
            aria-label={`Show ${project.title}`}
            onClick={() => setActive(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === active
                ? 'w-8 bg-gradient-to-r from-blue-500 to-purple-500'
                : 'w-2 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
