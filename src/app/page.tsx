'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView, useScroll, useSpring } from 'framer-motion';
import { Check, ChevronDown, Copy, FileText, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { BenchLight } from '@/components/bench-light';
import { SiteNav } from '@/components/site-nav';
import { Hero } from '@/components/hero';
import { MagneticButton } from '@/components/magnetic-button';
import { ProjectCarousel } from '@/components/project-carousel';
import { RecommendationCarousel, type Recommendation } from '@/components/recommendation-carousel';
import { ResumeMenu } from '@/components/resume-menu';

const ease = [0.16, 1, 0.3, 1] as const;

// Scroll reveals replay on every pass instead of firing once: framer resets an
// element to its `initial` state when it leaves the viewport, so scrolling back
// plays the entrance again. Every `initial` stays partly visible, so nothing is
// ever hidden if an observer doesn't fire.
const revealOnScroll = { once: false, amount: 0.15 };

// The spectrum, short to long wavelength order matches the hero's split.
const skillBands = [
  {
    title: 'Languages',
    tag: 'SOURCE',
    band: '--beam',
    skills: ['JavaScript', 'TypeScript', 'Python', 'Java', 'PHP'],
  },
  {
    title: 'Frontend',
    tag: 'UI',
    band: '--s-ui',
    skills: ['React', 'Next.js', 'Vue.js', 'React Native', 'Tailwind', 'Bootstrap', 'HTML', 'CSS'],
  },
  {
    title: 'Backend & APIs',
    tag: 'API',
    band: '--s-api',
    skills: ['Node.js', 'Express', 'NestJS', 'GraphQL', 'Laravel', 'Firebase'],
  },
  {
    title: 'Databases',
    tag: 'DATA',
    band: '--s-data',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQLite', 'Snowflake', 'ClickHouse'],
  },
  {
    title: 'AI Features',
    tag: 'AI',
    band: '--s-ai',
    skills: ['Vercel AI SDK', 'LLM tool calling', 'Context-aware chatbots'],
  },
  {
    title: 'DevOps & Cloud',
    tag: 'CLOUD',
    band: '--s-cloud',
    skills: ['AWS', 'Docker', 'Git', 'Postman'],
  },
  {
    title: 'Homelab & Self-Hosting',
    tag: 'LAB',
    band: '--s-lab',
    skills: ['Proxmox (VMs)', 'TrueNAS', 'ZFS RAID1 Pool', 'Self-Hosted Apps', 'Networking'],
  },
];

const experiences = [
  {
    company: 'MediaJel',
    position: 'L2 Software Engineer',
    duration: '2023 – Present',
    location: 'Makati, Philippines',
    description: [
      'Developed and maintained full-stack features end-to-end, contributing to both front-end interfaces and back-end services that power core product functionality.',
      'Designed, built, and maintained APIs that support key product features and enable smooth communication between systems.',
      'Handled software integrations to connect internal platforms with third-party services, ensuring data and workflows move seamlessly between tools.',
      'Implemented tag integrations to support tracking, analytics, and data collection across web properties.',
      "Built AI features end-to-end using Vercel's AI SDK, including a context-aware chatbot powered by tools that pull in client-specific information.",
      'Worked on business intelligence tasks, writing SQL queries and shaping data into structured formats to produce reports that support decision-making.',
      'Gained hands-on experience with ad technology platforms like Google Ads and Nexxen, along with Salesforce, supporting campaign setup, management, and troubleshooting.',
      'Collaborated closely with teammates across roles to deliver reliable, maintainable code and improve existing systems over time.',
    ],
  },
];

const projects = [
  {
    title: 'Hyperion Homelab Dashboard',
    description: 'A self-hosted dashboard running on TrueNAS that brings every service in my homelab into a single view, with live health checks, server stats, and update tracking.',
    overview:
      'Hyperion is the TrueNAS server I run at home, and this dashboard is the front door to it. Rather than remembering a dozen ports and addresses, every service I self-host sits on one page with a live health check beside it, so a container that has stopped responding is obvious the moment I open the tab. The same page carries the host\'s own CPU, memory and disk usage, tracks upstream releases for each app so nothing quietly falls behind, and pulls in the clock, weather and feeds I actually read. Access from outside the house runs over Tailscale, which keeps the whole stack reachable anywhere without exposing it to the public internet.',
    highlights: [
      'Live status and response-time checks on every service, so a failed container surfaces immediately',
      'Host telemetry for the TrueNAS box itself — CPU, memory, disk and uptime at a glance',
      'Release tracking that flags when a container has fallen behind its upstream version',
      'Remote access through Tailscale rather than public port forwarding',
      'Entire layout defined declaratively in YAML and kept under version control'
    ],
    groups: [
      { label: 'Media', items: ['Jellyfin', 'Jellyseerr', 'Songstress'] },
      {
        label: 'Automation',
        items: ['Radarr', 'Sonarr', 'Prowlarr', 'Bazarr', 'Navidrome', 'qBittorrent']
      },
      { label: 'Server & Access', items: ['TrueNAS', 'Tailscale'] }
    ],
    tech: ['Glance', 'Docker', 'TrueNAS', 'YAML'],
    image: '/images/projects/glance.jpg'
  },
  {
    title: 'Stinjy',
    description: 'A simple and intuitive budget management application built with React Native and Expo, designed to help users stay on top of their finances throughout the year.',
    overview:
      'Stinjy is built around the way people actually check their money: open the app, see where the month stands, close it again. Account balances, the month\'s income and expense totals, and a breakdown of spending by category all live on the first screen, so there is no digging through menus to answer "how much have I spent". It is written in React Native with Expo, so a single codebase covers both platforms, and it stores everything on-device in SQLite, which keeps the app usable without a network connection.',
    highlights: [
      'Balances, monthly totals and spending by category on a single screen',
      'On-device SQLite storage, so the app keeps working offline',
      'One React Native and Expo codebase across platforms',
      'Typed end to end with TypeScript'
    ],
    tech: ['TypeScript', 'SQLite', 'React Native', 'Expo'],
    link: 'https://github.com/Rizarre/Stinjy-Budget-Tracker',
    image: '/images/projects/stinjy.png',
    fit: 'contain' as const
  },
  {
    title: 'ASEA Online Platform',
    description: 'A website for showcasing the work of ASEA iWork Builders Co. with a built in calculator for computing estimated amount of floor area.',
    overview:
      'A company site for ASEA iWork Builders Co. that does more than list services. Alongside the portfolio of completed work, it carries a built-in calculator that estimates floor area, letting a prospective client get a rough sense of scope before they ever pick up the phone. Built on Next.js so the presentation pages load quickly while the calculator stays interactive on the same site.',
    highlights: [
      'Showcase of the company\'s completed builds and services',
      'Built-in calculator that estimates floor area for prospective clients',
      'Server-rendered with Next.js for fast first loads'
    ],
    tech: ['JavaScript', 'Next.js'],
    link: 'https://github.com/Rizarre/ASEA-Project',
    image: '/images/projects/asea.jpg'
  },
  {
    title: 'SurePrice',
    description: 'An Android Mobile Application that utilizes web scraping to compare market prices on markets to see which location has the cheapest product.',
    overview:
      'SurePrice answers one specific question: where is this product cheapest right now? The app scrapes listings from several markets, normalises them into entries that can actually be compared side by side, and then surfaces which location is selling the searched item for the least. The scraping and data-collection side is handled in Python, while the Android client that people interact with is written in Java.',
    highlights: [
      'Scrapes and normalises product listings from multiple markets',
      'Compares prices across locations to surface the cheapest option',
      'Python for scraping and data collection, Java for the Android client'
    ],
    tech: ['Python', 'Java', 'Android'],
    link: 'https://github.com/Rizarre/SurePrice-Mobile-Prog',
    image: '/images/projects/sureprice.png',
    fit: 'contain' as const
  }
];

const recommendations: Recommendation[] = [
  {
    name: 'Edward Zuñiga',
    profile: 'https://www.linkedin.com/in/edward-zu%C3%B1iga-47489a244/',
    occupation: 'L2 Software Engineer',
    image: '/images/edward.jpg',
    band: '--s-api',
    quote:
      "If you're looking for someone who can bridge the gap between strong engineering and empathetic communication, I can't recommend Sean enough.",
    message:
      "I had the privilege of working alongside Sean Rizarre Reyes at MediaJel, where we both served as Level 2 Software Engineers. Sean stood out not only for his technical proficiency, especially in tag integrations using TypeScript, but also for his remarkable interpersonal skills—he has a genuine talent for communicating difficult or complex matters in a way that's honest, clear, and never abrasive.\n\nWhat makes Sean a valuable teammate is his ability to connect with people. Whether it's providing technical feedback, collaborating across functions, or helping resolve blockers, he always manages to deliver his point with respect and empathy. That emotional intelligence makes him a natural collaborator, mentor, and leader.\n\nOn the technical side, Sean's expertise in handling JavaScript and TypeScript tag integrations was a massive asset to our team. His code is clean, reliable, and thoughtfully structured. He's the kind of developer who doesn't just solve problems—he anticipates them, designs with scalability in mind, and ensures solutions are easy to maintain.\n\nIf you're looking for someone who can bridge the gap between strong engineering and empathetic communication, I can't recommend Sean enough. He's a standout team player, a quick learner, and someone who brings both heart and technical excellence to the table.",
  },
  {
    name: 'Jesus Crisologo Dimazana',
    profile: 'https://www.linkedin.com/in/jcdmz/',
    occupation: 'Software Engineer',
    image: '/images/jcd.jpg',
    band: '--s-data',
    quote:
      "I can confidently say he is one of the most reliable and talented developers I've collaborated with.",
    message:
      "I had the pleasure of working with Sean on several development projects, and I can confidently say he is one of the most reliable and talented developers I've collaborated with. His technical expertise, particularly in full-stack development, is matched by his problem-solving ability and calm, focused approach under pressure.\n\nSean brings not just clean, maintainable code to the table but also a deep understanding of product requirements and user needs. He consistently goes beyond expectations—whether it's optimizing performance, refactoring for scalability, or mentoring junior developers with patience and clarity.\n\nHe's a team player through and through, contributing thoughtful ideas during discussions and always willing to help unblock teammates. Anyone would be lucky to have Sean on their engineering team.\n\nHighly recommend him for any development or technical leadership role!",
  },
  {
    name: 'Pacholo Amit',
    profile: 'https://www.linkedin.com/in/pacholo-amit/',
    occupation: 'Software Engineer | Integrations Manager',
    image: '/images/pach.jpg',
    band: '--s-ai',
    quote:
      'Sean is a fast learner, an exceptional JavaScript/TypeScript expert, and an outstanding team player.',
    message:
      "I had the privilege of collaborating with Sean on several critical projects, and I can confidently say he is one of the most reliable and dedicated developers I've ever worked with. From the moment he joined our team, Sean demonstrated a natural ability to coordinate efforts, keep everyone aligned, and tackle challenges head-on. He takes every issue seriously—whether it's a production bug or an architectural discussion—and works tirelessly until a robust solution is in place.\n\nSean's mastery of JavaScript and TypeScript is truly impressive. He consistently crafts clean, maintainable code and elevates our entire codebase by introducing best practices and thoughtful design patterns. As one of our primary software architects, he has led the development of complex features, optimized performance bottlenecks, and ensured our applications scale smoothly. His rapid learning curve means he quickly adapts to new libraries, frameworks, or tools, allowing the team to stay ahead of emerging trends.\n\nBeyond his technical prowess, Sean excels as a team coordinator. He has an uncanny ability to break down complex tasks, delegate responsibilities appropriately, and ensure everyone feels supported and heard. When the team faced tight deadlines, Sean's calm yet assertive leadership style helped us navigate ambiguous requirements and deliver high-quality results on schedule. He is always the first to step up during a crisis—whether it's gathering the team for an urgent stand-up, staying late to troubleshoot an issue, or mentoring newer developers who need guidance.\n\nOn a personal level, Sean is an absolute joy to work with. His positive attitude, genuine respect for his colleagues, and willingness to lend a helping hand foster a culture of collaboration and trust. He actively encourages open communication, offers constructive feedback during code reviews, and makes time to celebrate team successes. His infectious enthusiasm and strong work ethic have a ripple effect—raising morale and inspiring everyone around him to contribute their best.\n\nIn short, Sean is a fast learner, an exceptional JavaScript/TypeScript expert, and an outstanding team player. Any organization would benefit immensely from his technical talent, leadership skills, and positive spirit. I wholeheartedly recommend Sean for any role that demands technical excellence, strong coordination, and unwavering dedication.",
  },
];

/** Section title with a beam that wipes in after it, in the direction of travel. */
function SectionHeading({ title, lead, band }: { title: string; lead: string; band: string }) {
  return (
    <div className="mb-14 sm:mb-16">
      <div className="flex items-end gap-6">
        <motion.h2
          initial={{ opacity: 0.25, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={revealOnScroll}
          transition={{ duration: 0.9, ease }}
          className="font-display min-w-0 break-words text-[clamp(1.75rem,5.4vw,4rem)] sm:shrink-0"
        >
          {title}
        </motion.h2>
        <motion.span
          aria-hidden
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={revealOnScroll}
          transition={{ duration: 1.4, delay: 0.25, ease }}
          className="mb-[0.6em] hidden h-px flex-1 origin-left sm:block"
          style={{ background: `linear-gradient(90deg, var(${band}), transparent)`, boxShadow: `0 0 10px var(${band})` }}
        />
      </div>
      <motion.p
        initial={{ opacity: 0.4 }}
        whileInView={{ opacity: 1 }}
        viewport={revealOnScroll}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="mt-5 max-w-xl text-lg text-[var(--ink-2)]"
      >
        {lead}
      </motion.p>
    </div>
  );
}

/** GWA on the Philippine scale, drawn as a measurement so non-PH readers get it instantly. */
function GwaScale() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-60px' });
  const [value, setValue] = useState(3);
  const gwa = 1.6;
  const best = 1;
  const pass = 3;
  const pos = ((pass - value) / (pass - best)) * 100;

  useEffect(() => {
    // Replays like every other reveal: rewind when it leaves the viewport.
    if (!inView) return setValue(pass);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return setValue(gwa);
    const controls = animate(pass, gwa, { duration: 1.8, ease, onUpdate: setValue });
    return () => controls.stop();
  }, [inView]);

  return (
    <div ref={ref}>
      <p className="font-display tabular text-[clamp(4rem,10vw,6rem)]" aria-label={`GWA ${gwa.toFixed(2)}`}>
        {value.toFixed(2)}
      </p>
      <p className="mt-3 font-semibold">General Weighted Average</p>
      <div className="mt-8" aria-hidden>
        <div className="relative h-2 rounded-full bg-[var(--line)]">
          <div
            className="absolute inset-y-0 right-0 rounded-full"
            style={{ left: `${pos}%`, background: 'linear-gradient(90deg, var(--s-ai), var(--s-cloud) 60%, transparent)' }}
          />
          <div
            className="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[var(--ground)] bg-[var(--beam)] shadow-[0_0_18px_var(--s-ai)]"
            style={{ left: `${pos}%` }}
          />
        </div>
        <div className="tabular mt-3 flex justify-between font-mono text-[11px] text-[var(--ink-3)]">
          <span>1.00 highest</span>
          <span>3.00 passing</span>
        </div>
      </div>
      <p className="mt-4 text-sm text-[var(--ink-3)]">Philippine scale: lower is better.</p>
    </div>
  );
}

const RAIL_BANDS = ['--s-ui', '--s-api', '--s-data', '--s-cloud', '--s-lab'];

/** A hairline of one band's light along a panel's top edge. */
function BandEdge({ band }: { band: string }) {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, var(${band}) 30%, var(${band}) 70%, transparent)` }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/4 h-48 w-1/2 rounded-full opacity-[0.14] blur-3xl"
        style={{ background: `var(${band})` }}
      />
    </>
  );
}

/** The bullets light up as the beam travels down the rail. */
function ExperienceRail({ bullets }: { bullets: string[] }) {
  const ref = useRef<HTMLUListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <ul ref={ref} className="relative space-y-7 pl-9">
      <span aria-hidden className="absolute bottom-2 left-[5px] top-2 w-px bg-[var(--line-strong)]" />
      <motion.span
        aria-hidden
        className="absolute bottom-2 left-[5px] top-2 w-px origin-top"
        style={{
          scaleY: fill,
          background: 'linear-gradient(var(--beam), var(--s-api) 30%, var(--s-data) 55%, var(--s-ai) 80%, var(--s-lab))',
          boxShadow: '0 0 12px var(--s-ai)',
        }}
      />
      {bullets.map((bullet, i) => {
        const isAi = bullet.includes('AI SDK');
        return (
          <motion.li
            key={i}
            initial={{ opacity: 0.28 }}
            whileInView={{ opacity: 1 }}
            viewport={revealOnScroll}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <span
              aria-hidden
              className="absolute -left-9 top-[0.45em] size-[11px] rounded-full border-2 border-[var(--ground)]"
              style={{
                background: `var(${isAi ? '--s-ai' : RAIL_BANDS[i % RAIL_BANDS.length]})`,
                boxShadow: `0 0 ${isAi ? 16 : 8}px var(${isAi ? '--s-ai' : RAIL_BANDS[i % RAIL_BANDS.length]})`,
              }}
            />
            <p
              className={`max-w-[68ch] leading-relaxed ${
                isAi ? 'text-lg font-medium text-[var(--ink)]' : 'text-[var(--ink-2)]'
              }`}
            >
              {bullet}
            </p>
          </motion.li>
        );
      })}
    </ul>
  );
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText('seanrizarre.reyes@gmail.com');
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1800);
        } catch {
          window.location.href = 'mailto:seanrizarre.reyes@gmail.com';
        }
      }}
      className="inline-flex items-center gap-2 rounded-full border border-[var(--line-strong)] px-4 py-2 text-sm font-medium text-[var(--ink-2)] transition-colors hover:border-[var(--ink)] hover:text-[var(--ink)]"
    >
      {copied ? <Check className="size-4 text-[var(--s-data)]" /> : <Copy className="size-4" />}
      <span aria-live="polite">{copied ? 'Copied' : 'Copy email'}</span>
    </button>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <BenchLight />
      <SiteNav />

      <main className="relative z-10">
        <Hero />

        {/* Skills: the split light, one band per layer */}
        <section id="skills" className="relative py-24 sm:py-32">
          <div aria-hidden className="blob orb-float-slow -left-40 top-40 h-[480px] w-[480px] bg-[var(--s-data)]" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="Skills"
              lead="Technologies and tools I work with to bring ideas to life, layer by layer."
              band="--s-api"
            />

            <div className="space-y-3">
              {skillBands.map((row, i) => (
                <motion.div
                  key={row.title}
                  data-spot
                  initial={{ opacity: 0.4, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={revealOnScroll}
                  transition={{ duration: 0.9, delay: i * 0.06, ease }}
                  className="glass group overflow-hidden rounded-2xl"
                  style={{ '--band': `var(${row.band})` } as React.CSSProperties}
                >
                  {/* The band's light, spilling in from the left */}
                  <motion.div
                    aria-hidden
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={revealOnScroll}
                    transition={{ duration: 1.3, delay: 0.15 + i * 0.06, ease }}
                    className="pointer-events-none absolute inset-0 origin-left opacity-[0.13] transition-opacity duration-500 group-hover:opacity-25"
                    style={{ background: 'linear-gradient(90deg, var(--band), transparent 55%)' }}
                  />
                  <div className="relative grid items-center gap-4 px-5 py-5 sm:px-7 md:grid-cols-[minmax(0,20rem)_1fr] md:gap-8">
                    <div className="flex items-baseline gap-4">
                      <span className="w-12 shrink-0 font-mono text-[11px] font-semibold tracking-wider" style={{ color: 'var(--band)' }}>
                        {row.tag}
                      </span>
                      <h3 className="font-display-normal text-xl font-bold tracking-[-0.01em]">{row.title}</h3>
                    </div>
                    <ul className="flex flex-wrap gap-2 pl-16 md:pl-0">
                      {row.skills.map(skill => (
                        <li
                          key={skill}
                          className="rounded-full border border-[var(--line-strong)] bg-[var(--ground)]/40 px-3.5 py-1.5 text-sm text-[var(--ink-2)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--band)] hover:text-[var(--ink)] hover:shadow-[0_6px_20px_-6px_var(--band)]"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="relative py-24 sm:py-32">
          <div aria-hidden className="blob orb-float right-0 top-1/3 h-[420px] w-[420px] bg-[var(--s-ai)]" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading title="Experience" lead="My professional journey in software development." band="--s-data" />

            {experiences.map(exp => (
              <div key={exp.company} data-spot className="glass overflow-hidden rounded-[1.5rem] p-6 sm:p-10 lg:p-12">
                <BandEdge band="--s-data" />
                <div className="grid gap-10 lg:grid-cols-[18rem_1fr] lg:gap-16">
                  <div className="lg:sticky lg:top-28 lg:self-start">
                    <p className="font-display text-[clamp(2.4rem,5vw,3.4rem)]" style={{ color: 'var(--s-data)' }}>
                      {exp.company}
                    </p>
                    <h3 className="mt-4 text-xl font-semibold">{exp.position}</h3>
                    <div className="mt-5 space-y-2 text-sm text-[var(--ink-3)]">
                      <p className="tabular font-mono text-[13px] text-[var(--ink-2)]">{exp.duration}</p>
                      <p className="flex items-center gap-1.5">
                        <MapPin className="size-3.5" />
                        {exp.location}
                      </p>
                    </div>
                  </div>
                  <ExperienceRail bullets={exp.description} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section id="education" className="relative py-24 sm:py-32">
          <div aria-hidden className="blob orb-float-slow -left-20 bottom-0 h-[380px] w-[380px] bg-[var(--s-cloud)]" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading title="Education" lead="Where I built the foundation for my career." band="--s-ai" />

            <motion.div
              data-spot
              initial={{ opacity: 0.4, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={revealOnScroll}
              transition={{ duration: 0.9, ease }}
              className="glass grid overflow-hidden rounded-[1.5rem] lg:grid-cols-[1.5fr_1fr]"
            >
              <BandEdge band="--s-ai" />
              <div className="p-6 sm:p-10 lg:p-12">
                <h3 className="font-display-normal text-[clamp(1.8rem,3.6vw,2.6rem)] font-bold leading-tight tracking-[-0.02em]">
                  BS in Information Technology
                </h3>
                <p className="mt-2 text-lg font-medium" style={{ color: 'var(--s-ai)' }}>
                  University of Santo Tomas
                </p>
                <p className="tabular mt-1 font-mono text-[13px] text-[var(--ink-3)]">Graduated 2023</p>
                <p className="mt-6 max-w-[60ch] leading-relaxed text-[var(--ink-2)]">
                  Specialized in <span className="font-semibold text-[var(--ink)]">Web &amp; Mobile Development</span>, building a
                  strong foundation in software engineering, full-stack web technologies, and mobile application development
                  that I carry into my professional work today.
                </p>
                <ul className="mt-8 flex flex-wrap gap-2">
                  {['Web Development', 'Mobile Development', 'Software Engineering', 'Databases'].map(focus => (
                    <li key={focus} className="rounded-full border border-[var(--line-strong)] px-3.5 py-1.5 text-sm text-[var(--ink-2)]">
                      {focus}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t border-[var(--line)] p-6 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
                <GwaScale />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="relative py-24 sm:py-32">
          <div aria-hidden className="blob orb-float right-10 top-20 h-[480px] w-[480px] bg-[var(--s-cloud)]" />
          <div aria-hidden className="blob orb-float-slow -left-20 bottom-0 h-[400px] w-[400px] bg-[var(--s-ui)]" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="Projects"
              lead="Some of the projects I've worked on that showcase my skills and experience."
              band="--s-cloud"
            />
          </div>
          <div className="relative mx-auto max-w-[100rem] px-4 sm:px-6 lg:px-8">
            <ProjectCarousel projects={projects} />
          </div>
        </section>

        {/* Recommendations */}
        <section id="recommendations" className="relative py-24 sm:py-32">
          <div aria-hidden className="blob orb-float left-1/3 top-20 h-[440px] w-[440px] bg-[var(--s-lab)]" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="Recommendations"
              lead="What my colleagues say about working with me."
              band="--s-lab"
            />
            <div className="mx-auto max-w-5xl">
              <RecommendationCarousel items={recommendations} />
            </div>
          </div>
        </section>

        {/* Contact: the spectrum recombines into one beam */}
        <section id="contact" className="relative overflow-hidden pb-24 pt-16 sm:pb-32">
          <svg aria-hidden viewBox="0 0 1200 120" preserveAspectRatio="none" className="mb-16 h-20 w-full sm:h-28">
            {['--s-ui', '--s-api', '--s-data', '--s-ai', '--s-cloud', '--s-lab'].map((v, i) => (
              <motion.path
                key={v}
                d={`M0 ${10 + i * 20} C 300 ${10 + i * 20}, 420 60, 640 60`}
                fill="none"
                stroke={`var(${v})`}
                strokeWidth="1.5"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.9 }}
                viewport={revealOnScroll}
                transition={{ duration: 1.4, delay: i * 0.06, ease }}
              />
            ))}
            <motion.path
              d="M640 60 L1200 60"
              fill="none"
              stroke="var(--beam)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={revealOnScroll}
              transition={{ duration: 1, delay: 1.1, ease }}
              style={{ filter: 'drop-shadow(0 0 6px var(--beam))' }}
            />
          </svg>

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0.25, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={revealOnScroll}
              transition={{ duration: 1, ease }}
              className="font-display text-[clamp(2.6rem,8vw,6rem)]"
            >
              Let&apos;s work
              <br />
              together.
            </motion.h2>
            <p className="mt-6 max-w-xl text-lg text-[var(--ink-2)]">
              I&apos;m always open to discussing new opportunities and interesting projects, and I&apos;m currently available
              for new roles.
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-4">
              <a
                href="mailto:seanrizarre.reyes@gmail.com"
                className="group font-display-normal relative break-all text-[clamp(1.35rem,4.2vw,3rem)] font-semibold tracking-[-0.02em]"
              >
                seanrizarre.reyes@gmail.com
                <span className="spectrum absolute -bottom-1 left-0 h-[3px] w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
              </a>
              <CopyEmail />
            </div>

            <div className="mt-12 flex flex-wrap gap-3">
              <MagneticButton baseRadius={26}>
                <ResumeMenu align="start">
                  <button
                    type="button"
                    className="group relative inline-flex h-14 items-center gap-2.5 overflow-hidden bg-[var(--ink)] px-8 text-[15px] font-semibold text-[var(--ground)] transition-shadow duration-300 hover:shadow-[0_10px_40px_-8px_var(--s-ai)]"
                  >
                    <span className="spectrum-soft pointer-events-none absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
                    <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    <FileText className="size-[18px] transition-transform duration-300 group-hover:-rotate-6" />
                    View Resume
                    <ChevronDown className="size-4 opacity-70 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                  </button>
                </ResumeMenu>
              </MagneticButton>
              {[
                { href: 'https://github.com/Rizarre', label: 'GitHub', icon: Github },
                { href: 'https://www.linkedin.com/in/seanrizarre/', label: 'LinkedIn', icon: Linkedin },
              ].map(({ href, label, icon: Icon }) => (
                <MagneticButton
                  key={label}
                  baseRadius={26}
                  className={`border border-[var(--line-strong)] bg-[var(--glass-bg)] backdrop-blur-md transition-colors duration-300 ${
                    label === 'LinkedIn' ? 'hover:border-[#0A66C2]' : 'hover:border-[var(--ink)]'
                  }`}
                >
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative inline-flex h-[54px] items-center gap-2.5 overflow-hidden px-7 text-[15px] font-medium transition-colors duration-300 ${
                      label === 'LinkedIn' ? 'hover:bg-[#0A66C2] hover:text-white' : ''
                    }`}
                  >
                    <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    <Icon className="size-[18px] transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                    {label}
                  </a>
                </MagneticButton>
              ))}
            </div>

            <dl className="mt-16 flex flex-wrap gap-x-12 gap-y-4 border-t border-[var(--line)] pt-8">
              {[
                { icon: Phone, term: 'Phone', value: '+63 917 866 8799', href: 'tel:+639178668799' },
                { icon: MapPin, term: 'Location', value: 'Makati, Philippines' },
              ].map(({ icon: Icon, term, value, href }) => (
                <div key={term} className="flex min-w-0 items-center gap-3">
                  <Icon className="size-5 shrink-0 text-[var(--ink-3)]" />
                  <dt className="sr-only">{term}</dt>
                  <dd className="min-w-0 break-words font-medium">
                    {href ? (
                      <a href={href} className="underline-offset-4 hover:underline">
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-[var(--line)]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-10 sm:flex-row sm:px-6 lg:px-8">
          <div className="text-center sm:text-left">
            <p className="font-display text-base [font-variation-settings:'wdth'_112]">Sean Rizarre Reyes</p>
            <p className="mt-1 text-sm text-[var(--ink-3)]">
              Software Engineer · &copy; {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
          <div className="flex gap-2">
            {[
              { href: 'https://github.com/Rizarre', label: 'GitHub', icon: Github },
              { href: 'https://www.linkedin.com/in/seanrizarre/', label: 'LinkedIn', icon: Linkedin },
              { href: 'mailto:seanrizarre.reyes@gmail.com', label: 'Email', icon: Mail },
            ].map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="grid size-11 place-items-center rounded-full text-[var(--ink-3)] transition-all hover:-translate-y-0.5 hover:bg-[var(--line)] hover:text-[var(--ink)]"
              >
                <Icon className="size-5" />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
