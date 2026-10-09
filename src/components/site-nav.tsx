'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ChevronDown, FileText } from 'lucide-react';
import { ResumeMenu } from '@/components/resume-menu';
import { MobileNav } from '@/components/mobile-nav';
import { ThemeToggle } from '@/components/theme-toggle';
import { NAV_ITEMS } from '@/lib/nav';

export function SiteNav() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [active, setActive] = useState('#about');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // Scroll-spy: the section crossing the upper third of the viewport is active.
    const io = new IntersectionObserver(
      entries => {
        for (const e of entries) if (e.isIntersecting) setActive(`#${e.target.id}`);
      },
      { rootMargin: '-30% 0px -65% 0px' }
    );
    NAV_ITEMS.forEach(item => {
      const el = document.querySelector(item.href);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener('scroll', onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <>
      {/* Scroll progress: the spectrum fills in as you read */}
      <motion.div aria-hidden className="spectrum fixed left-0 right-0 top-0 z-[60] h-[3px] origin-left" style={{ scaleX }} />

      <motion.header
        className={`fixed top-0 z-50 w-full transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled
            ? 'border-b border-[var(--line)] bg-[var(--ground)]/75 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          <a href="#about" className="group flex items-center gap-2.5" aria-label="Sean Rizarre Reyes, back to top">
            {/* Wordmark: a tiny prism splitting light */}
            <svg aria-hidden viewBox="0 0 28 24" className="h-6 w-7">
              <path d="M10 2 L18 22 L2 22 Z" fill="none" stroke="var(--ink)" strokeWidth="1.6" strokeLinejoin="round" />
              <path d="M0 15 L7 13" stroke="var(--ink)" strokeWidth="1.4" strokeLinecap="round" />
              {['--s-ui', '--s-api', '--s-data', '--s-ai', '--s-lab'].map((v, i) => (
                <path
                  key={v}
                  d={`M13 13 L27 ${8 + i * 3}`}
                  stroke={`var(${v})`}
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  className="origin-[13px_13px] transition-transform duration-500 group-hover:scale-x-110"
                />
              ))}
            </svg>
            <span className="font-display text-[15px] leading-none tracking-[-0.01em] [font-variation-settings:'wdth'_112]">
              Sean Rizarre Reyes
            </span>
          </a>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Sections">
            {NAV_ITEMS.map(item => {
              const isActive = active === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? 'location' : undefined}
                  className={`relative rounded-full px-3 py-1.5 text-sm transition-colors ${
                    isActive ? 'text-[var(--ink)]' : 'text-[var(--ink-3)] hover:text-[var(--ink)]'
                  } ${item.href === '#recommendations' ? 'hidden lg:inline-block' : ''}`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-band"
                      className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full"
                      style={{ background: `var(${item.band})`, boxShadow: `0 0 12px var(${item.band})` }}
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5">
            <ThemeToggle />
            <ResumeMenu>
              <button
                type="button"
                className="group hidden items-center gap-2 rounded-full border border-[var(--line-strong)] px-4 py-2 text-sm font-medium transition-colors hover:border-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--ground)] data-[state=open]:border-[var(--ink)] sm:flex"
              >
                <FileText className="size-4 transition-transform group-hover:-rotate-6" />
                Resume
                <ChevronDown className="size-3.5 opacity-70 transition-transform group-data-[state=open]:rotate-180" />
              </button>
            </ResumeMenu>
            <MobileNav />
          </div>
        </div>
      </motion.header>
    </>
  );
}
