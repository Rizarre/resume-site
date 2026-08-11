'use client';

import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { Project } from '@/components/project-carousel';

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
      <DialogContent className="glass max-w-3xl max-h-[90vh] overflow-y-auto p-0 gap-0">
        {project && (
          <>
            {/* Screenshot always uses object-contain here: the point of the modal
                is seeing the whole frame, even for the portrait phone captures. */}
            <div className="relative bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-950 dark:to-blue-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.image}
                alt={`${project.title} screenshot`}
                className="w-full max-h-[50vh] object-contain"
              />
            </div>

            <div className="p-6 space-y-6">
              <DialogHeader>
                <DialogTitle className="text-2xl gradient-pan bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {project.title}
                </DialogTitle>
                <DialogDescription className="sr-only">
                  Details for the {project.title} project
                </DialogDescription>
              </DialogHeader>

              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {project.overview ?? project.description}
              </p>

              {project.highlights && (
                <ul className="space-y-2">
                  {project.highlights.map(highlight => (
                    <li
                      key={highlight}
                      className="flex gap-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300"
                    >
                      <span
                        aria-hidden
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                      />
                      {highlight}
                    </li>
                  ))}
                </ul>
              )}

              {project.groups && (
                <div className="grid gap-4 sm:grid-cols-3">
                  {project.groups.map(group => (
                    <div key={group.label} className="glass-accent rounded-lg p-4">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        {group.label}
                      </h4>
                      <ul className="mt-2 space-y-1">
                        {group.items.map(item => (
                          <li
                            key={item}
                            className="text-sm text-slate-700 dark:text-slate-200"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap items-center gap-2 pt-2">
                {project.tech.map(tech => (
                  <Badge key={tech} variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                ))}
                {project.link && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-auto"
                    onClick={() => window.open(project.link, '_blank')}
                  >
                    View project
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
