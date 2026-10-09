'use client';

import { ExternalLink } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { Project } from '@/components/project-carousel';

const BANDS = ['--s-ui', '--s-api', '--s-data', '--s-ai', '--s-cloud', '--s-lab'];

/**
 * Detail view for a single project: full-width screenshot on top, long-form
 * write-up below. Driven by `project` being non-null so the carousel only has
 * to track which card was opened.
 */
export function ProjectModal({
  project,
  onOpenChange,
}: {
  project: Project | null;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={project !== null} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-3xl gap-0 overflow-y-auto rounded-[1.25rem] border-[var(--line-strong)] bg-[var(--popover)] p-0 sm:max-w-3xl">
        {project && (
          <>
            {/* Screenshot always uses object-contain here: the point of the modal
                is seeing the whole frame, even for the portrait phone captures. */}
            <div className="relative border-b border-[var(--line)] bg-[var(--ground-2)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={project.image} alt={`${project.title} screenshot`} className="max-h-[50vh] w-full object-contain" />
              <div aria-hidden className="spectrum absolute inset-x-0 bottom-0 h-[2px]" />
            </div>

            <div className="space-y-7 p-6 sm:p-8">
              <DialogHeader className="text-left">
                <DialogTitle className="font-display-normal text-2xl font-bold tracking-[-0.02em] sm:text-3xl">
                  {project.title}
                </DialogTitle>
                <DialogDescription className="sr-only">Details for the {project.title} project</DialogDescription>
              </DialogHeader>

              <p className="max-w-[68ch] leading-relaxed text-[var(--ink-2)]">{project.overview ?? project.description}</p>

              {project.highlights && (
                <ul className="space-y-2.5">
                  {project.highlights.map((highlight, i) => (
                    <li key={highlight} className="flex gap-3 text-[15px] leading-relaxed text-[var(--ink-2)]">
                      <span
                        aria-hidden
                        className="mt-2 size-1.5 shrink-0 rounded-full"
                        style={{ background: `var(${BANDS[i % BANDS.length]})` }}
                      />
                      {highlight}
                    </li>
                  ))}
                </ul>
              )}

              {project.groups && (
                <div className="grid gap-3 sm:grid-cols-3">
                  {project.groups.map((group, i) => (
                    <div key={group.label} className="rounded-xl border border-[var(--line-strong)] p-4">
                      <h4
                        className="font-mono text-[11px] font-semibold uppercase tracking-wider"
                        style={{ color: `var(${BANDS[(i * 2 + 1) % BANDS.length]})` }}
                      >
                        {group.label}
                      </h4>
                      <ul className="mt-2.5 space-y-1">
                        {group.items.map(item => (
                          <li key={item} className="text-sm text-[var(--ink)]">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap items-center gap-2 border-t border-[var(--line)] pt-6">
                {project.tech.map(tech => (
                  <span
                    key={tech}
                    className="rounded-full border border-[var(--line-strong)] px-2.5 py-1 font-mono text-[11px] text-[var(--ink-2)]"
                  >
                    {tech}
                  </span>
                ))}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-4 py-2 text-sm font-medium text-[var(--ground)] transition-transform hover:-translate-y-0.5"
                  >
                    View project
                    <ExternalLink className="size-4" />
                  </a>
                )}
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
