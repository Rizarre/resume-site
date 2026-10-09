'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, FileText, Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '@/lib/nav';

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        className="grid size-10 place-items-center rounded-full text-[var(--ink-2)] transition-colors hover:bg-[var(--line)] hover:text-[var(--ink)]"
      >
        {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, y: -8, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 right-0 top-full border-b border-[var(--line)] bg-[var(--ground)]/95 backdrop-blur-xl"
          >
            <nav className="space-y-1 px-4 py-4">
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.3 }}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-[var(--ink-2)] transition-colors hover:bg-[var(--line)] hover:text-[var(--ink)]"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="h-3 w-[3px] rounded-full" style={{ background: `var(${item.band})` }} />
                  {item.label}
                </motion.a>
              ))}
              <a
                href="/Sean-Rizarre-Reyes-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[var(--ink)] px-3 py-3 font-medium text-[var(--ground)]"
                onClick={() => setIsOpen(false)}
              >
                <FileText className="size-4" />
                Open Resume
              </a>
              <a
                href="/Sean-Rizarre-Reyes-Resume.pdf"
                download="Sean-Rizarre-Reyes-Resume.pdf"
                className="flex items-center justify-center gap-2 rounded-full border border-[var(--line-strong)] px-3 py-3 font-medium text-[var(--ink)]"
                onClick={() => setIsOpen(false)}
              >
                <Download className="size-4" />
                Download Resume
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
