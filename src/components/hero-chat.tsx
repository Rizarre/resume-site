'use client';

import { FormEvent, forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUp, ArrowDown, FileText, Linkedin, Mail } from 'lucide-react';

type Action = 'email' | 'resume' | 'projects' | 'linkedin';

interface Intent {
  id: string;
  question: string;
  keys: string[];
  answer: string;
  actions?: Action[];
}

// Every answer comes straight from the resume; nothing here is generated.
const INTENTS: Intent[] = [
  {
    id: 'ai',
    question: 'Tell me about the AI chatbot',
    keys: ['ai', 'chatbot', 'chat', 'llm', 'gpt', 'claude', 'vercel', 'sdk', 'bot', 'agent', 'tool'],
    answer:
      "At MediaJel, Sean built AI features end to end with Vercel's AI SDK, including a context-aware chatbot that calls tools to pull in client-specific information. This chat is a scripted nod to that work: every answer here comes from his resume.",
  },
  {
    id: 'stack',
    question: "What's his stack?",
    keys: ['stack', 'tech', 'language', 'framework', 'react', 'typescript', 'skill', 'tools', 'node', 'next'],
    answer:
      'Day to day: TypeScript and JavaScript across React, Next.js and Node.js (Express, NestJS, GraphQL). For data he uses PostgreSQL, MySQL, MongoDB, Snowflake and ClickHouse, shipped on AWS with Docker. He also builds mobile apps with React Native and Expo.',
  },
  {
    id: 'work',
    question: 'What does he do at MediaJel?',
    keys: ['work', 'job', 'experience', 'mediajel', 'company', 'role', 'current', 'do'],
    answer:
      "He's been an L2 Software Engineer at MediaJel in Makati since 2023, building full-stack features, APIs, third-party and tag integrations, and SQL-driven BI reports. He also works hands-on with ad-tech platforms like Google Ads, Nexxen and Salesforce.",
  },
  {
    id: 'open',
    question: 'Is he open to new roles?',
    keys: ['open', 'available', 'hire', 'hiring', 'opportunit', 'remote', 'freelance', 'role'],
    answer:
      "Yes. He's currently available for new opportunities and interesting projects. Email is the fastest way to reach him, and his resume is one click away.",
    actions: ['email', 'resume'],
  },
  {
    id: 'edu',
    question: 'Where did he study?',
    keys: ['study', 'school', 'education', 'university', 'degree', 'college', 'gwa', 'ust', 'graduate'],
    answer:
      'BS in Information Technology at the University of Santo Tomas, class of 2023, specializing in Web & Mobile Development, with a 1.60 GWA (1.00 is the highest on the Philippine scale).',
  },
  {
    id: 'projects',
    question: 'What has he built?',
    keys: ['project', 'portfolio', 'built', 'build', 'app', 'stinjy', 'asea', 'sureprice'],
    answer:
      'A few favorites: Stinjy, a React Native budget tracker; the ASEA Online Platform, a Next.js site with a floor-area estimate calculator; and SurePrice, an Android app that scrapes market prices to find the cheapest store.',
    actions: ['projects'],
  },
  {
    id: 'contact',
    question: 'How do I reach him?',
    keys: ['contact', 'email', 'reach', 'phone', 'call', 'message', 'linkedin', 'talk'],
    answer: 'Email seanrizarre.reyes@gmail.com or connect on LinkedIn. His resume has everything else.',
    actions: ['email', 'linkedin', 'resume'],
  },
];

const GREETING =
  "Hi! I can answer questions about Sean. He's a full-stack software engineer who ships features end to end, from APIs and integrations to AI features. Pick a question or type your own.";

const FALLBACK =
  "I'm a scripted demo, so I only know a few things about Sean. Try one of these questions instead.";

interface Message {
  id: number;
  role: 'assistant' | 'user';
  text: string;
  actions?: Action[];
}

function matchIntent(input: string): Intent | undefined {
  const q = input.toLowerCase();
  let best: { intent: Intent; score: number } | undefined;
  for (const intent of INTENTS) {
    const score = intent.keys.reduce((n, k) => (new RegExp(`\\b${k}`).test(q) ? n + 1 : n), 0);
    if (score > 0 && (!best || score > best.score)) best = { intent, score };
  }
  return best?.intent;
}

const ACTIONS: Record<Action, { label: string; icon: typeof Mail; run: () => void }> = {
  email: { label: 'Email Sean', icon: Mail, run: () => (window.location.href = 'mailto:seanrizarre.reyes@gmail.com') },
  resume: { label: 'Open resume', icon: FileText, run: () => window.open('/Sean-Rizarre-Reyes-Resume.pdf', '_blank') },
  linkedin: { label: 'LinkedIn', icon: Linkedin, run: () => window.open('https://www.linkedin.com/in/seanrizarre/', '_blank') },
  projects: { label: 'See projects', icon: ArrowDown, run: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) },
};

/** `solid` drops the backdrop blur: over an animated canvas it would re-blur every frame. */
export const HeroChat = forwardRef<HTMLDivElement, { solid?: boolean }>(function HeroChat({ solid = false }, ref) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [streamId, setStreamId] = useState<number | null>(null);
  const [shown, setShown] = useState(0);
  const [thinking, setThinking] = useState(false);
  const [asked, setAsked] = useState<string[]>([]);
  const [draft, setDraft] = useState('');
  const logRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);
  const reduced = useRef(false);

  const busy = thinking || streamId !== null;

  const reply = useCallback((text: string, actions?: Action[], delay = 520) => {
    setThinking(true);
    window.setTimeout(
      () => {
        const id = nextId.current++;
        setThinking(false);
        setMessages(m => [...m, { id, role: 'assistant', text, actions }]);
        if (reduced.current) return;
        setShown(0);
        setStreamId(id);
      },
      reduced.current ? 0 : delay
    );
  }, []);

  // Greet once the name has finished arriving.
  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t = window.setTimeout(() => reply(GREETING, undefined, 0), reduced.current ? 0 : 900);
    return () => window.clearTimeout(t);
  }, [reply]);

  // Stream the newest answer a few characters per frame, like a model emitting tokens.
  useEffect(() => {
    if (streamId === null) return;
    const msg = messages.find(m => m.id === streamId);
    if (!msg) return;
    let raf = 0;
    let last = performance.now();
    let count = 0;
    const tick = (now: number) => {
      count = Math.min(msg.text.length, count + Math.max(1, Math.round((now - last) / 11)));
      last = now;
      setShown(count);
      if (count < msg.text.length) raf = requestAnimationFrame(tick);
      else setStreamId(null);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [streamId, messages]);

  // Keep the log pinned to the newest line without moving the page.
  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, shown, thinking]);

  const ask = (question: string, intent?: Intent) => {
    if (busy) return;
    const id = nextId.current++;
    setMessages(m => [...m, { id, role: 'user', text: question }]);
    if (intent) {
      setAsked(a => [...a, intent.id]);
      reply(intent.answer, intent.actions);
    } else {
      reply(FALLBACK);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const q = draft.trim();
    if (!q) return;
    setDraft('');
    ask(q, matchIntent(q));
  };

  const suggestions = INTENTS.filter(i => !asked.includes(i.id)).slice(0, 3);

  return (
    <div
      ref={ref}
      data-spot
      className={`glass flex h-[460px] flex-col overflow-hidden rounded-[1.25rem] sm:h-[480px] ${solid ? 'glass-solid' : ''}`}
    >
      <div className="flex items-center justify-between border-b border-[var(--line)] px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--s-data)] opacity-60 motion-reduce:hidden" />
            <span className="relative inline-flex size-2.5 rounded-full bg-[var(--s-data)]" />
          </span>
          <span className="text-sm font-medium">Ask about Sean</span>
        </div>
        <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--ink-3)]">scripted demo</span>
      </div>

      <div
        ref={logRef}
        role="log"
        aria-live="polite"
        aria-busy={busy}
        className="flex-1 space-y-4 overflow-y-auto px-5 py-5"
      >
        {messages.map(m => {
          const isStreaming = m.id === streamId;
          const text = isStreaming ? m.text.slice(0, shown) : m.text;
          return m.role === 'user' ? (
            <div key={m.id} className="flex justify-end">
              <p className="max-w-[85%] rounded-2xl rounded-br-md bg-[var(--ink)] px-4 py-2.5 text-sm text-[var(--ground)]">
                {m.text}
              </p>
            </div>
          ) : (
            <div key={m.id} className="max-w-[92%]">
              <p className={`text-[15px] leading-relaxed text-[var(--ink-2)] ${isStreaming ? 'caret' : ''}`}>{text}</p>
              {!isStreaming && m.actions && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {m.actions.map(a => {
                    const { label, icon: Icon, run } = ACTIONS[a];
                    return (
                      <button
                        key={a}
                        type="button"
                        onClick={run}
                        className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line-strong)] px-3 py-1.5 text-xs font-medium transition-colors hover:border-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--ground)]"
                      >
                        <Icon className="size-3.5" />
                        {label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
        {thinking && (
          <div className="flex gap-1.5 py-2" aria-label="Typing">
            {[0, 1, 2].map(i => (
              <span
                key={i}
                className="size-1.5 animate-pulse rounded-full bg-[var(--ink-3)]"
                style={{ animationDelay: `${i * 120}ms` }}
              />
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-[var(--line)] px-4 pb-4 pt-3">
        <div className="mb-3 flex gap-2 overflow-x-auto pb-1 pr-6 [mask-image:linear-gradient(90deg,#000_82%,transparent)] [scrollbar-width:none]">
          {suggestions.map(s => (
            <button
              key={s.id}
              type="button"
              disabled={busy}
              onClick={() => ask(s.question, s)}
              className="shrink-0 rounded-full border border-[var(--line-strong)] bg-[var(--glass-bg)] px-3.5 py-1.5 text-[13px] text-[var(--ink-2)] transition-all hover:-translate-y-0.5 hover:border-[var(--s-ai)] hover:text-[var(--ink)] disabled:pointer-events-none disabled:opacity-50"
            >
              {s.question}
            </button>
          ))}
        </div>
        <form onSubmit={onSubmit} className="flex items-center gap-2 rounded-full border border-[var(--line-strong)] bg-[var(--ground)]/60 py-1.5 pl-4 pr-1.5 focus-within:border-[var(--s-ai)]">
          <label htmlFor="hero-chat-input" className="sr-only">
            Ask a question about Sean
          </label>
          <input
            id="hero-chat-input"
            value={draft}
            onChange={e => setDraft(e.target.value)}
            placeholder="Ask about his stack, work, or projects"
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent text-sm text-[var(--ink)] caret-[var(--s-ai)] outline-none placeholder:text-[var(--ink-3)] focus-visible:outline-none"
          />
          <button
            type="submit"
            aria-label="Send question"
            disabled={busy || !draft.trim()}
            className="grid size-9 shrink-0 place-items-center rounded-full bg-[var(--ink)] text-[var(--ground)] transition-all hover:scale-105 disabled:opacity-30"
          >
            <ArrowUp className="size-4" />
          </button>
        </form>
      </div>
    </div>
  );
});
