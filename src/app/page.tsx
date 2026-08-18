'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { Github, Linkedin, Mail, MapPin, Phone, FileText, ChevronDown, Code2, Layout, Server, Database, Cloud, HardDrive, GraduationCap, Award, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MobileNav } from '@/components/mobile-nav';
import { ThemeToggle } from '@/components/theme-toggle';
import { MagneticButton } from '@/components/magnetic-button';
import { ProjectCarousel } from '@/components/project-carousel';
import { ResumeMenu } from '@/components/resume-menu';

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  // Scroll reveals replay on every pass instead of firing once. With
  // `once: false`, framer resets an element to its `initial` state as soon as it
  // leaves the viewport, so scrolling back up plays the entrance again. `amount`
  // is the fraction that has to be visible to trigger — and to drop below before
  // it re-arms — which keeps the replay from retriggering on tiny scroll jitters.
  const revealOnScroll = { once: false, amount: 0.15 };

  // `span` drives the bento layout on a 6-column grid (lg); featured tiles use the accent glass.
  const skillCategories = [
    {
      title: 'Languages',
      icon: Code2,
      span: 'lg:col-span-2',
      skills: ['JavaScript', 'TypeScript', 'Python', 'Java', 'PHP']
    },
    {
      title: 'Frontend',
      icon: Layout,
      span: 'lg:col-span-4',
      skills: ['React', 'Next.js', 'Vue.js', 'React Native', 'Tailwind', 'Bootstrap', 'HTML', 'CSS']
    },
    {
      title: 'Backend & APIs',
      icon: Server,
      span: 'lg:col-span-3',
      skills: ['Node.js', 'Express', 'NestJS', 'GraphQL', 'Laravel', 'Firebase']
    },
    {
      title: 'Databases',
      icon: Database,
      span: 'lg:col-span-3',
      skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQLite', 'Snowflake', 'ClickHouse']
    },
    {
      title: 'DevOps & Cloud',
      icon: Cloud,
      span: 'lg:col-span-2',
      skills: ['AWS', 'Docker', 'Git', 'Postman']
    },
    {
      title: 'Homelab & Self-Hosting',
      icon: HardDrive,
      span: 'lg:col-span-4',
      featured: true,
      skills: ['Proxmox (VMs)', 'TrueNAS', 'ZFS RAID1 Pool', 'Self-Hosted Apps', 'Networking']
    }
  ];

  const experiences = [
    {
      company: 'MediaJel',
      position: 'L2 Software Engineer',
      duration: '2023 - Present',
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
      ]
    }
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

  const recommendations = [
    {
      name: 'Edward Zuñiga',
      profile: 'https://www.linkedin.com/in/edward-zu%C3%B1iga-47489a244/',
      occupation: 'L2 Software Engineer',
      image: '/images/edward.jpg',
      message: 'I had the privilege of working alongside Sean Rizarre Reyes at MediaJel, where we both served as Level 2 Software Engineers. Sean stood out not only for his technical proficiency, especially in tag integrations using TypeScript, but also for his remarkable interpersonal skills—he has a genuine talent for communicating difficult or complex matters in a way that\'s honest, clear, and never abrasive.\n\nWhat makes Sean a valuable teammate is his ability to connect with people. Whether it\'s providing technical feedback, collaborating across functions, or helping resolve blockers, he always manages to deliver his point with respect and empathy. That emotional intelligence makes him a natural collaborator, mentor, and leader.\n\nOn the technical side, Sean\'s expertise in handling JavaScript and TypeScript tag integrations was a massive asset to our team. His code is clean, reliable, and thoughtfully structured. He\'s the kind of developer who doesn\'t just solve problems—he anticipates them, designs with scalability in mind, and ensures solutions are easy to maintain.\n\nIf you\'re looking for someone who can bridge the gap between strong engineering and empathetic communication, I can\'t recommend Sean enough. He\'s a standout team player, a quick learner, and someone who brings both heart and technical excellence to the table.'
    },
    {
      name: 'Jesus Crisologo Dimazana',
      profile: 'https://www.linkedin.com/in/jcdmz/',
      occupation: 'Software Engineer',
      image: '/images/jcd.jpg',
      message: 'I had the pleasure of working with Sean on several development projects, and I can confidently say he is one of the most reliable and talented developers I\'ve collaborated with. His technical expertise, particularly in full-stack development, is matched by his problem-solving ability and calm, focused approach under pressure.\n\nSean brings not just clean, maintainable code to the table but also a deep understanding of product requirements and user needs. He consistently goes beyond expectations—whether it\'s optimizing performance, refactoring for scalability, or mentoring junior developers with patience and clarity.\n\nHe\'s a team player through and through, contributing thoughtful ideas during discussions and always willing to help unblock teammates. Anyone would be lucky to have Sean on their engineering team.\n\nHighly recommend him for any development or technical leadership role!'
    },
    {
      name: 'Pacholo Amit',
      profile: 'https://www.linkedin.com/in/pacholo-amit/',
      occupation: 'Software Engineer | Integrations Manager',
      image: '/images/pach.jpg',
      message: 'I had the privilege of collaborating with Sean on several critical projects, and I can confidently say he is one of the most reliable and dedicated developers I\'ve ever worked with. From the moment he joined our team, Sean demonstrated a natural ability to coordinate efforts, keep everyone aligned, and tackle challenges head-on. He takes every issue seriously—whether it\'s a production bug or an architectural discussion—and works tirelessly until a robust solution is in place.\n\nSean\'s mastery of JavaScript and TypeScript is truly impressive. He consistently crafts clean, maintainable code and elevates our entire codebase by introducing best practices and thoughtful design patterns. As one of our primary software architects, he has led the development of complex features, optimized performance bottlenecks, and ensured our applications scale smoothly. His rapid learning curve means he quickly adapts to new libraries, frameworks, or tools, allowing the team to stay ahead of emerging trends.\n\nBeyond his technical prowess, Sean excels as a team coordinator. He has an uncanny ability to break down complex tasks, delegate responsibilities appropriately, and ensure everyone feels supported and heard. When the team faced tight deadlines, Sean\'s calm yet assertive leadership style helped us navigate ambiguous requirements and deliver high-quality results on schedule. He is always the first to step up during a crisis—whether it\'s gathering the team for an urgent stand-up, staying late to troubleshoot an issue, or mentoring newer developers who need guidance.\n\nOn a personal level, Sean is an absolute joy to work with. His positive attitude, genuine respect for his colleagues, and willingness to lend a helping hand foster a culture of collaboration and trust. He actively encourages open communication, offers constructive feedback during code reviews, and makes time to celebrate team successes. His infectious enthusiasm and strong work ethic have a ripple effect—raising morale and inspiring everyone around him to contribute their best.\n\nIn short, Sean is a fast learner, an exceptional JavaScript/TypeScript expert, and an outstanding team player. Any organization would benefit immensely from his technical talent, leadership skills, and positive spirit. I wholeheartedly recommend Sean for any role that demands technical excellence, strong coordination, and unwavering dedication.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-[#0c1525] dark:to-[#101d30]">
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left z-[60]"
        style={{ scaleX }}
      />

      {/* Header */}
      <motion.header
        className="fixed top-0 w-full bg-white/80 dark:bg-[#0c1525]/90 backdrop-blur-md z-50 border-b border-slate-200 dark:border-blue-900/60"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              Sean Rizarre Reyes
            </motion.div>
            <nav className="hidden md:flex space-x-8">
              <a href="#about" className="text-slate-600 hover:text-blue-600 transition-colors">About</a>
              <a href="#skills" className="text-slate-600 hover:text-blue-600 transition-colors">Skills</a>
              <a href="#experience" className="text-slate-600 hover:text-blue-600 transition-colors">Experience</a>
              <a href="#education" className="text-slate-600 hover:text-blue-600 transition-colors">Education</a>
              <a href="#projects" className="text-slate-600 hover:text-blue-600 transition-colors">Projects</a>
              <a href="#recommendations" className="text-slate-600 hover:text-blue-600 transition-colors">Recommendations</a>
              <a href="#contact" className="text-slate-600 hover:text-blue-600 transition-colors">Contact</a>
            </nav>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <ResumeMenu>
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden sm:flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  Resume
                  <ChevronDown className="h-3.5 w-3.5 opacity-70" />
                </Button>
              </ResumeMenu>
              <MobileNav />
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section id="about" className="pt-32 pb-20 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 dot-grid" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-blue-400/10 dark:bg-blue-500/20 rounded-full blur-3xl pointer-events-none orb-float" />
        <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-purple-400/10 dark:bg-blue-600/15 rounded-full blur-3xl pointer-events-none orb-float-slow" />
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-pink-400/8 dark:bg-blue-400/12 rounded-full blur-3xl pointer-events-none orb-float" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={revealOnScroll}
          >
            <motion.div variants={fadeInUp} className="mb-8 flex justify-center">
              <MagneticButton
                className="w-48 h-48"
                innerStrength={0}
                style={{
                  // box-shadow follows both the spring translation AND the deformed
                  // border-radius automatically — ring + glow in one declaration
                  boxShadow: '0 0 0 4px white, 0 0 0 5px rgba(99,102,241,0.35), 0 0 40px 12px rgba(99,102,241,0.25)',
                }}
              >
                <Avatar className="w-48 h-48 rounded-none">
                  <AvatarImage src="/images/sean.jpg" alt="Sean Rizarre Reyes" />
                  <AvatarFallback className="text-4xl font-semibold bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-none">
                    SR
                  </AvatarFallback>
                </Avatar>
              </MagneticButton>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              // min-h keeps the heading from collapsing while the animation is
              // still empty, so the hero below it doesn't jump on first paint.
              className="text-5xl md:text-6xl font-bold mb-4 min-h-[1.2em] bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent"
            >
              {/* Real text for crawlers and screen readers — the typed copy is
                  purely decorative and never exists in full on the server. */}
              <span className="sr-only">Sean Rizarre Reyes</span>
              <span aria-hidden="true" className="typed-name">
                <Typewriter
                  words={['Sean Rizarre Reyes']}
                  loop={0}
                  typeSpeed={70}
                  deleteSpeed={45}
                  delaySpeed={2000}
                  cursor
                  // The library's own "blink" fades opacity 1 → 0 across the whole
                  // cycle, so the cursor reads as a dim smear. Disabled here and
                  // replaced with a hard on/off blink in globals.css.
                  cursorBlinking={false}
                  // Drawn as a CSS bar rather than a "|" character on purpose: the
                  // h1 sets `background-clip: text`, which paints its gradient into
                  // every descendant glyph. A text cursor therefore keeps a
                  // gradient-filled copy of itself underneath the yellow, and fading
                  // the yellow just uncovers it instead of hiding the caret. An
                  // element with no glyph contributes nothing to that clip.
                  cursorStyle={<span className="type-caret" />}
                />
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-2"
            >
              Software Engineer
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400 mb-8"
            >
              <MapPin className="h-5 w-5" />
              <span>Makati, Philippines</span>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed"
            >
              Passionate software engineer with experience in full-stack development, API design, software integration, and building AI-powered features. I love turning complex problems into simple, beautiful, and intuitive solutions.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-4 mb-8"
            >
              <MagneticButton baseRadius={28}>
                <Button
                  className="group relative overflow-hidden h-16 px-14 has-[>svg]:px-14 gap-3 text-base bg-blue-600 text-white rounded-none transition-all duration-300 hover:bg-violet-600 hover:shadow-[0_0_32px_-4px] hover:shadow-violet-500/70 active:scale-[0.96]"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <Mail className="size-5 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" />
                  Get in Touch
                </Button>
              </MagneticButton>
              <MagneticButton baseRadius={28}>
                <Button
                  variant="outline"
                  className="group relative overflow-hidden h-16 px-14 has-[>svg]:px-14 gap-3 text-base rounded-none transition-all duration-300 hover:bg-slate-900 hover:text-white hover:border-slate-900 hover:shadow-[0_0_32px_-4px] hover:shadow-slate-900/50 active:scale-[0.96]"
                  onClick={() => window.open('https://github.com/Rizarre', '_blank')}
                >
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <Github className="size-5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                  GitHub
                </Button>
              </MagneticButton>
              <MagneticButton baseRadius={28}>
                <Button
                  variant="outline"
                  className="group relative overflow-hidden h-16 px-14 has-[>svg]:px-14 gap-3 text-base rounded-none transition-all duration-300 hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] hover:shadow-[0_0_32px_-4px] hover:shadow-[#0A66C2]/60 active:scale-[0.96]"
                  onClick={() => window.open('https://www.linkedin.com/in/seanrizarre/', '_blank')}
                >
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <Linkedin className="size-5 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" />
                  LinkedIn
                </Button>
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="flex flex-col items-center mt-12 text-slate-400 dark:text-slate-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <span className="text-xs tracking-widest uppercase mb-2">Scroll</span>
            <motion.div
              className="w-px h-10 bg-gradient-to-b from-slate-400 to-transparent"
              animate={{ scaleY: [1, 0.4, 1], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-slate-50 dark:bg-[#0d1728] relative overflow-hidden">
        {/* Decorative blobs give the frosted tiles something to refract */}
        <div className="blob w-[500px] h-[500px] bg-blue-400/20 dark:bg-blue-600/20 -top-20 -left-20" />
        <div className="blob w-[450px] h-[450px] bg-purple-400/15 dark:bg-purple-700/15 bottom-0 right-0" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={revealOnScroll}
          >
            <h2 className="text-3xl font-bold mb-3">Skills & Technologies</h2>
            <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4" />
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Technologies and tools I work with to bring ideas to life
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5 auto-rows-fr">
            {skillCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.title}
                  className={`${category.span} ${category.featured ? 'sm:col-span-2' : ''}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                  viewport={revealOnScroll}
                  whileHover={{ y: -5 }}
                >
                  <div className={`h-full rounded-2xl p-6 transition-all duration-300 group ${category.featured ? 'glass-accent hover:shadow-2xl hover:shadow-blue-500/20' : 'glass hover:shadow-2xl'}`}>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shrink-0 shadow-md shadow-blue-500/25 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold">{category.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="text-sm py-1.5 px-3 bg-white/60 dark:bg-white/5 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-slate-200/60 dark:border-white/10 transition-colors"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 relative overflow-hidden">
        <div className="blob w-[420px] h-[420px] bg-blue-400/15 dark:bg-blue-600/18 top-20 -left-20" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={revealOnScroll}
          >
            <h2 className="text-3xl font-bold mb-3">Experience</h2>
            <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4" />
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              My professional journey in software development
            </p>
          </motion.div>

          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-6 top-2 bottom-2 w-px bg-gradient-to-b from-blue-500 via-purple-500 to-transparent hidden md:block" />

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  className="relative md:pl-20"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                  viewport={revealOnScroll}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-3.5 top-6 w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 ring-4 ring-white dark:ring-black hidden md:flex items-center justify-center z-10">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>

                  <Card className="glass hover:shadow-2xl transition-all duration-300 group">
                    <CardHeader>
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                        <div>
                          <CardTitle className="text-xl mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {exp.position}
                          </CardTitle>
                          <CardDescription className="text-base font-semibold text-blue-600 dark:text-blue-400">
                            {exp.company}
                          </CardDescription>
                        </div>
                        <div className="flex flex-col md:items-end gap-1 shrink-0">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                            {exp.duration}
                          </span>
                          <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {exp.location}
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                        {exp.description.map((bullet, i) => (
                          <li key={i} className="flex gap-3">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 dark:bg-blue-500 shrink-0" />
                            <span className="text-sm leading-relaxed">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 relative overflow-hidden">
        <div className="blob w-[420px] h-[420px] bg-purple-400/15 dark:bg-purple-700/18 top-10 -right-16" />
        <div className="blob w-[380px] h-[380px] bg-blue-400/15 dark:bg-blue-600/18 bottom-0 -left-16" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={revealOnScroll}
          >
            <h2 className="text-3xl font-bold mb-3">Education</h2>
            <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4" />
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Where I built the foundation for my career
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-5 auto-rows-fr"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={revealOnScroll}
          >
            {/* Main degree tile */}
            <motion.div variants={fadeInUp} className="lg:col-span-2 lg:row-span-2" whileHover={{ y: -5 }}>
              <div className="glass h-full rounded-2xl p-8 flex flex-col justify-between hover:shadow-2xl transition-all duration-300 group">
                <div>
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/25 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                      <GraduationCap className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold leading-tight">BS in Information Technology</h3>
                      <p className="text-blue-600 dark:text-blue-400 font-semibold mt-1">University of Santo Tomas</p>
                      <span className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/50 dark:bg-white/10 border border-slate-200/70 dark:border-white/15 text-slate-600 dark:text-slate-300">
                        <GraduationCap className="h-3 w-3" />
                        Graduated 2023
                      </span>
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Specialized in <span className="font-semibold text-slate-800 dark:text-slate-100">Web &amp; Mobile Development</span>,
                    building a strong foundation in software engineering, full-stack web technologies, and mobile
                    application development that I carry into my professional work today.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mt-6">
                  {['Web Development', 'Mobile Development', 'Software Engineering', 'Databases'].map((focus) => (
                    <Badge
                      key={focus}
                      variant="secondary"
                      className="text-sm py-1.5 px-3 bg-white/60 dark:bg-white/5 border border-slate-200/60 dark:border-white/10"
                    >
                      {focus}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* GWA stat tile */}
            <motion.div variants={fadeInUp} whileHover={{ y: -5 }}>
              <div className="glass-accent h-full rounded-2xl p-6 flex flex-col justify-center items-center text-center hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 group">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md shadow-blue-500/25 mb-3 group-hover:scale-110 transition-transform duration-300">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  1.60
                </div>
                <p className="font-semibold mt-1">General Weighted Average</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">1.00 highest · Philippine scale</p>
              </div>
            </motion.div>

            {/* Specialization tile */}
            <motion.div variants={fadeInUp} whileHover={{ y: -5 }}>
              <div className="glass h-full rounded-2xl p-6 flex flex-col justify-center hover:shadow-2xl transition-all duration-300 group">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md shadow-blue-500/25 mb-3 group-hover:scale-110 transition-transform duration-300">
                  <Smartphone className="h-6 w-6 text-white" />
                </div>
                <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1">Specialization</p>
                <p className="text-lg font-bold leading-tight">Web &amp; Mobile Development</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-slate-50 dark:bg-[#0d1728] relative overflow-hidden">
        <div className="blob w-[480px] h-[480px] bg-purple-400/15 dark:bg-purple-700/15 -top-20 right-0" />
        <div className="blob w-[400px] h-[400px] bg-blue-400/15 dark:bg-blue-600/18 bottom-0 -left-20" />
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={revealOnScroll}
          >
            <h2 className="text-3xl font-bold mb-3">Featured Projects</h2>
            <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4" />
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Some of the projects I&apos;ve worked on that showcase my skills and experience
            </p>
          </motion.div>

          <ProjectCarousel projects={projects} />
        </div>
      </section>

      {/* Recommendations Section */}
      <section id="recommendations" className="py-20 relative overflow-hidden">
        <div className="blob w-[440px] h-[440px] bg-blue-400/12 dark:bg-blue-600/15 top-10 right-0" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={revealOnScroll}
          >
            <h2 className="text-3xl font-bold mb-3">Recommendations</h2>
            <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4" />
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              What my colleagues say about working with me
            </p>
          </motion.div>

          <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-8 max-w-4xl mx-auto">
            {recommendations.map((recommendation, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={revealOnScroll}
              >
                <Card className="glass h-full hover:shadow-2xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12 shadow-md ring-2 ring-white/60 dark:ring-blue-500/30">
                        <AvatarImage src={recommendation.image} alt={recommendation.name} className="object-cover" />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold text-lg">
                          {recommendation.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">
                          <a href={recommendation.profile} target="_blank">
                            {recommendation.name}
                          </a>
                        </CardTitle>
                        <CardDescription className="text-blue-600 dark:text-blue-400 font-medium">
                          {recommendation.occupation}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {recommendation.message.split('\n\n').map((paragraph, i) => (
                        <p key={i} className={i > 0 ? 'mt-4' : ''}>
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-slate-50 dark:bg-[#0d1728] relative overflow-hidden">
        <div className="blob w-[460px] h-[460px] bg-blue-400/18 dark:bg-blue-600/20 -top-16 left-0" />
        <div className="blob w-[400px] h-[400px] bg-purple-400/15 dark:bg-purple-700/15 bottom-0 right-0" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={revealOnScroll}
          >
            <h2 className="text-3xl font-bold mb-3">Let&apos;s Work Together</h2>
            <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4" />
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              I&apos;m always open to discussing new opportunities and interesting projects
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={revealOnScroll}
          >
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-slate-600 dark:text-slate-300">seanrizarre.reyes@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <Phone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-slate-600 dark:text-slate-300">+63 917 866 8799</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold">Location</h3>
                  <p className="text-slate-600 dark:text-slate-300">Makati, Philippines</p>
                </div>
              </div>
            </div>

            <Card className="glass-accent">
              <CardHeader className="text-center">
                <CardTitle className="text-xl mb-2">Ready to Collaborate?</CardTitle>
                <CardDescription className="text-lg">
                  I&apos;m currently available for new opportunities and exciting projects
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center space-y-4">
                  <p className="text-slate-600 dark:text-slate-300">
                    L2 Software Engineer with expertise in full-stack development,
                    specializing in JavaScript, TypeScript, and modern web technologies.
                  </p>

                  <div className="flex flex-wrap justify-center gap-3 py-4">
                    <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                      Full-Stack Development
                    </Badge>
                    <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                      Team Leadership
                    </Badge>
                    <Badge variant="secondary" className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                      Problem Solving
                    </Badge>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <ResumeMenu align="center" matchTriggerWidth>
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      size="lg"
                    >
                      <FileText className="h-5 w-5 mr-2" />
                      View Resume
                      <ChevronDown className="h-4 w-4 ml-2 opacity-80" />
                    </Button>
                  </ResumeMenu>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => window.open('https://github.com/Rizarre', '_blank')}
                    >
                      <Github className="h-4 w-4 mr-2" />
                      GitHub
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => window.open('https://www.linkedin.com/in/seanrizarre/', '_blank')}
                    >
                      <Linkedin className="h-4 w-4 mr-2" />
                      LinkedIn
                    </Button>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => window.location.href = 'mailto:seanrizarre.reyes@gmail.com'}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#09111e] text-white py-12 border-t border-blue-900/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-lg font-semibold">Sean Rizarre Reyes</p>
              <p className="text-slate-300">Software Engineer</p>
            </div>
            <div className="flex space-x-6">
              <a href="https://github.com/Rizarre" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-colors">
                <Github className="h-6 w-6" />
              </a>
              <a href="https://www.linkedin.com/in/seanrizarre/" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="mailto:seanrizarre.reyes@gmail.com" className="text-slate-300 hover:text-white transition-colors">
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
          <Separator className="my-8 bg-blue-900/50" />
          <div className="text-center text-slate-400">
            <p>&copy; {new Date().getFullYear()} Sean Rizarre Reyes. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
