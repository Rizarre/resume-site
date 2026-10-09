---
name: Sean Rizarre Reyes · Prism Bench
description: A black optical bench where one white beam splits through a glass prism into six bands, one per layer Sean ships.
colors:
  bench-black: "#07080d"
  bench-black-raised: "#0d0f16"
  beam-white: "#ffffff"
  ink-dark: "#f5f7fa"
  ink-dark-2: "#c3c9d4"
  ink-dark-3: "#8a93a3"
  band-ui: "#ff5a36"
  band-api: "#ffb020"
  band-data: "#2de2a6"
  band-ai: "#33c2ff"
  band-cloud: "#5b85ff"
  band-lab: "#a585ff"
  daylight-ground: "#f3f5f8"
  daylight-ground-2: "#e9edf2"
  ink-light: "#0b0d12"
  ink-light-2: "#353c49"
  ink-light-3: "#555d6c"
  band-ui-light: "#c2330f"
  band-api-light: "#8a5700"
  band-data-light: "#067a58"
  band-ai-light: "#066da3"
  band-cloud-light: "#2f5bea"
  band-lab-light: "#7445e0"
typography:
  display:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 8.6vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 125"
  headline:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 5.4vw, 4rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 125"
  quote:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.4rem, 3.2vw, 2.35rem)"
    fontWeight: 600
    lineHeight: 1.18
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 100"
  title:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 100"
  lead:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "11px"
    fontWeight: 600
    letterSpacing: "0.05em"
    fontFeature: "'tnum' 1"
rounded:
  row: "1rem"
  card: "1.25rem"
  panel: "1.5rem"
  cta: "26px"
  pill: "9999px"
spacing:
  gutter-sm: "16px"
  gutter-md: "24px"
  gutter-lg: "32px"
  panel-sm: "24px"
  panel-md: "40px"
  panel-lg: "48px"
  section-sm: "96px"
  section-lg: "128px"
  bench-pitch: "28px"
components:
  button-primary:
    backgroundColor: "{colors.ink-dark}"
    textColor: "{colors.bench-black}"
    rounded: "{rounded.cta}"
    height: "56px"
    padding: "0 28px"
    typography: "{typography.body}"
  button-glass:
    backgroundColor: "rgb(20 23 32 / 0.5)"
    textColor: "{colors.ink-dark}"
    rounded: "{rounded.cta}"
    height: "54px"
    padding: "0 24px"
  chip:
    textColor: "{colors.ink-dark-2}"
    rounded: "{rounded.pill}"
    padding: "6px 14px"
  chip-action:
    textColor: "{colors.ink-dark}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
  chip-action-hover:
    backgroundColor: "{colors.ink-dark}"
    textColor: "{colors.bench-black}"
  glass-panel:
    backgroundColor: "rgb(20 23 32 / 0.5)"
    textColor: "{colors.ink-dark}"
    rounded: "{rounded.panel}"
    padding: "{spacing.panel-md}"
  chat-input:
    backgroundColor: "rgb(7 8 13 / 0.6)"
    textColor: "{colors.ink-dark}"
    rounded: "{rounded.pill}"
    padding: "6px 6px 6px 16px"
  icon-button:
    textColor: "{colors.ink-dark-2}"
    rounded: "{rounded.pill}"
    size: "40px"
  nav-link:
    textColor: "{colors.ink-dark-3}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
  nav-link-active:
    textColor: "{colors.ink-dark}"
---

# Design System: Sean Rizarre Reyes · Prism Bench

## Overview

**Creative North Star: "The Prism Bench"**

The page is an optical bench in a dark lab. The ground is near-black and drilled with a breadboard grid of tapped holes that brighten around the cursor. One white beam enters from the left edge, passes through a cut-glass prism holding Sean's photo, and leaves as a six-band spectrum. Each band is one layer of the stack he ships: UI, API, DATA, AI, CLOUD, LAB. From there the spectrum runs through the rest of the page. Every section, nav link, skill row, rail dot and recommender owns one band. At Contact the bands come back together into a single beam.

Dark is the default and the home of the system: the lab with the lights off. Light mode is the same bench in daylight. Its grounds are cool paper, its ink is near-black and the bands are deepened versions of the same six hues. Surfaces are frosted cut glass, not cards on a page. Under the cursor, a glass panel's edge splits into spectrum, the same thing the prism does to the beam. The single loud element is the name, set in an extra-wide grotesk. Everything else is quieter and leaves room for the light.

The motion grammar is light travelling: wipes run in the direction of travel, ease-outs are exponential, and everything is readable before it animates. With reduced motion on, the page shows the static split. The build rejects the generic dev-portfolio look: a centered avatar, gradient-filled text, and blue-purple glass as the brand.

**Key Characteristics:**
- Dark-first near-black bench (#07080d) with a 28px breadboard hole grid lit around the cursor
- One white beam and a six-band hard-stop spectrum that encodes skill layers wherever it appears
- Frosted cut-glass panels whose edges split into spectrum under the cursor
- Extra-wide Archivo (wdth 125, weight 800) for display, Geist for reading, Geist Mono only for readouts
- Magnetic, morphing controls whose corners sharpen toward the cursor
- Light reveals: clip and scale wipes in the direction of travel, ease-out cubic-bezier(0.16, 1, 0.3, 1)

## Colors

A near-monochrome bench with one white beam and six spectral bands that work as data, not decoration.

### Primary
- **Beam White** (beam-white): the light source. It draws the hero beam, the core of each glow, the recombined beam at Contact, the GWA marker, and the "SOURCE" (Languages) skill row. In light mode the beam flips to ink-light so it stays visible on daylight ground.
- **Bench Ink** (ink-dark / ink-light): primary text, and the fill of the primary button and the user's chat bubbles. Ink on ground is the highest-contrast pair on the page and marks the main action.

### Secondary: the six bands
Order is fixed and always matches the hero split: **UI Red-Orange** (band-ui), **API Amber** (band-api), **DATA Green** (band-data), **AI Cyan** (band-ai), **CLOUD Blue** (band-cloud), **LAB Violet** (band-lab). Each has a deeper `-light` twin for daylight mode. Section ownership: About and Contact are UI, Skills is API, Experience is DATA, Education is AI, Projects is CLOUD, Recommendations is LAB. AI Cyan also does system duty as the focus ring, the input caret, the focused input border and the hover glow under primary buttons. API Amber is the text-selection highlight.

### Neutral
- **Bench Black** (bench-black): the page ground in dark mode, and the theme-color.
- **Bench Black Raised** (bench-black-raised): avatar fallbacks, project image wells, secondary fills.
- **Daylight Ground** / **Daylight Ground 2** (daylight-ground, daylight-ground-2): the same roles in light mode.
- **Ink 2** (ink-dark-2 / ink-light-2): body copy, leads, chip text.
- **Ink 3** (ink-dark-3 / ink-light-3): meta text, readouts, inactive nav, icons at rest.
- **Lines** (ink at 9% / 18% alpha in dark, 10% / 20% in light): hairline dividers (`--line`) and chip, input and outline-button strokes (`--line-strong`).
- **Glass** (rgb(20 23 32 / 0.5) in dark, rgb(255 255 255 / 0.62) in light): the frosted panel fill.

### Named Rules
**The Band Means Layer Rule.** A band color is never decorative. It always points to its layer (UI, API, DATA, AI, CLOUD, LAB) or to the section that owns it. Do not add a seventh hue. White is the beam, not a band.

**The Spectrum Order Rule.** Wherever several bands appear together (progress bar, dots, wordmark, rails, the Contact recombination), they run UI → API → DATA → AI → CLOUD → LAB, short to long wavelength.

**The Dark Is Home Rule.** Tokens are designed dark-first. Light mode redefines the same names; it never adds new roles.

## Typography

**Display Font:** Archivo variable, width axis (ui-sans-serif fallback)
**Body Font:** Geist (ui-sans-serif, system-ui fallback)
**Label/Mono Font:** Geist Mono (ui-monospace fallback)

**Character:** An extra-wide, heavy grotesk does the shouting and a neutral modern sans does the reading. The mono face is kept for things that are measured: the θ readout, dates, GWA ticks, band tags, tech chips and the "scripted demo" disclosure.

### Hierarchy
- **Display** (Archivo wdth 125, 800, clamp 2.6–6rem, line-height 0.92, -0.025em): the hero name across two lines and the "Let's work together." close. On load the name widens from wdth 62 / 300 weight to wdth 125 / 800 over 1.4s ("spread").
- **Headline** (same face, clamp 1.75–4rem): section titles. A one-band hairline wipes in after the title. Experience uses the same voice for the company name (clamp 2.4–3.4rem, in its band), and Education uses it for the GWA figure (clamp 4–6rem, tabular).
- **Quote** (Archivo wdth 100, 600, clamp 1.4–2.35rem, 1.18, -0.02em): recommendation pull quotes and the contact email.
- **Title** (Archivo wdth 100, 700, 1.25rem, -0.01em): skill row titles, project titles, degree title (scaled up with clamp).
- **Lead** (Geist 400, 1.125rem): the paragraph under each section title, max ~36rem, in Ink 2.
- **Body** (Geist 400, 1rem, 1.625): experience bullets and long recommendation text, capped at 60–68ch.
- **Label** (Geist Mono 600, 11px, ~0.05em tracking, tabular figures): band tags, readouts, scale ticks, tech chips.

### Named Rules
**The One Loud Thing Rule.** Only the name, the section titles and the close use the wdth-125 display voice. Everything else uses Archivo at normal width or Geist.

**The Mono Is Measurement Rule.** Geist Mono is for values, readouts and data tags. Never use it for prose or headings.

## Layout

The content column is capped at 1280px (max-w-7xl), with 16 / 24 / 32px side gutters at phone / sm / lg. The project carousel breaks out to 1600px. Sections stack with 96px vertical padding (128px from sm up). Each opens with a left-aligned headline whose band hairline runs out to the right edge, followed by a lead and 56–64px of space before the content.

In the hero, the name sits top-left. On xl screens the one-line claim and location sit beside the second line of the name. Below them is a 12-column grid: prism and CTAs take five columns, and the chat takes columns 7–12, which is where the spectrum lands. Below lg everything stacks (name, claim, prism, CTAs, chat) and the spectrum fans downward onto the top edge of the chat. Experience pins its company block (sticky, 18rem column) beside a beam rail of bullets. Education splits 1.5fr / 1fr, with a hairline between the halves. The fixed bench grid (28px pitch) sits behind all content at z-0, and content lives at z-10.

**The Left-Origin Rule.** Light enters from the left. Section titles, beams, band wipes and skill-row fills all start at the left and travel right (origin-left). Headings never center.

## Elevation & Depth

Depth comes from layered translucency, not stacked shadows. From back to front the layers are the bench, its cursor-lit holes, blurred light pools, frosted glass and content. Glass is blurred 18px and saturated to 160%, with a 1px border and an inset top highlight. It also carries one soft ambient shadow, tuned separately for each theme. Shadows otherwise appear as colored glows of the active band: under a hovered primary button (AI Cyan), under hovered skill chips (their own band), and around active nav underlines and rail dots.

### Shadow Vocabulary
- **Glass ambient** (dark: `0 1px 2px rgb(0 0 0 / 0.4), 0 18px 40px -12px rgb(0 0 0 / 0.6)`; light: `0 1px 2px rgb(11 13 18 / 0.06), 0 12px 32px -8px rgb(11 13 18 / 0.14)`): every glass surface at rest.
- **Band glow** (`0 10px 40px -8px var(--s-ai)` on primary buttons; `0 6px 20px -6px var(--band)` on chips; `0 0 12px var(--band)` on lines and dots): the state response on hover or active.
- **Active card lift** (`0 30px 80px -24px rgb(0 0 0 / 0.55)`, hover `0 40px 90px -20px var(--s-ai)`): the centered project card only.

### Named Rules
**The Light Pools Rule.** The floating blurred orbs (blur 90px, opacity 0.22 in light and 0.16 in dark) represent spectrum landing on the bench. Each one takes the color of a band, never an off-system hue, and they drift slowly (9s / 14s) behind content.

**The Dispersed Edge Rule.** Interactive glass carries `data-spot`. Under the cursor, its 1px border turns into a radial spectrum (beam → amber → green → cyan → violet) and a faint caustic lights its interior. This is the system's hover language for surfaces.

## Shapes

Glass is softly rounded and controls are fully round. Panels (experience, education, recommendations) use the panel radius. Project cards and the chat use the card radius. Skill rows use the row radius. Chips, nav links, icon buttons, the chat input and the scroll dots are pills. Magnetic CTAs rest at a 26px radius and deform toward the cursor: the corner facing the pointer pulls to a 4px point. The prism is the one hard silhouette, an equilateral triangle (clip-path) with a spectral edge stroke, and the photo inside it is square-cornered.

## Components

### Buttons
- **Shape:** 26px resting radius inside a magnetic wrapper that drifts toward the cursor (strength 0.42 within 110px) and sharpens its nearest corner.
- **Primary** (Get in Touch, View Resume): ink fill, ground-colored text, 56px tall, 15px semibold, leading icon. On hover a white shine sweeps across (700ms), a soft spectrum underline grows from the left (500ms), an AI Cyan glow appears underneath, and the icon tilts. Active state scales to 0.97.
- **Glass outline** (GitHub, LinkedIn): glass fill with a backdrop blur, a strong-line border and a 54px height. On hover the border turns to ink and the same shine sweep runs.
- **Pill outline** (Resume in nav, Copy email, Read full, chat actions): a 1px strong-line pill. Hover sets the border to ink, and nav and chat actions also fill with ink.
- **Icon buttons** (theme toggle, menu, footer links, carousel arrows): 40–48px circles. At rest they are transparent or glass. Hover fills with the line color or ink, and the icon rotates or nudges.

### Chips
- **Style:** a pill with a strong-line border, a faint ground fill, 14px Geist in Ink 2. Tech chips on project cards switch to 11px Geist Mono.
- **State:** on hover a chip lifts 2px, its border takes the row's band color, the text goes to ink and a band glow appears underneath.

### Cards / Containers
- **Glass panel:** glass fill, 1px glass border, inset highlight, ambient shadow and a dispersed edge on hover. Panel padding is 24 / 40 / 48px by breakpoint. Panels tied to one band carry a 1px band hairline along the top edge, with a blurred band pool behind it.
- **Skill row:** a glass row with its band's light spilling in from the left (13% opacity, 25% on hover). On the left sits a 48px mono band tag in the band color next to the title; the chips sit on the right.

### Inputs / Fields
- **Chat input:** a pill on a 60% ground fill with a strong-line border. On focus-within the border turns AI Cyan and the caret is AI Cyan. A circular ink send button sits flush at the right.
- **Focus (global):** a 2px AI Cyan outline at 3px offset on every focus-visible element.

### Navigation
- **Bar:** fixed and transparent at the top of the page. Once the page scrolls past 24px it becomes 75% ground with a backdrop blur and a hairline bottom border. A 3px hard-stop spectrum progress bar tracks scroll across the very top.
- **Wordmark:** a small prism glyph splitting five band lines, set beside the name in Archivo at wdth 112.
- **Links:** pills in 14px Geist, Ink 3 at rest and ink when active. The active section gets a 2px underline in its own band with a matching glow, and the underline springs between links.
- **Mobile:** below md, a menu button opens a full-width 95% ground sheet. Each link carries a 3px band tick, and a full-width ink Resume pill sits at the bottom.

### Hero Beam (signature)
A single canvas measures the real prism and chat panel. It draws a white beam from the viewport's left edge into the prism's left face, a faint refracted path through the glass, and a six-band fan that lands on the chat's nearest edge, with a mono label per band. The cursor's height steers the angle of incidence, the spectrum swings with it, and a live readout (θ in Geist Mono) prints under the prism. On touch devices the beam drifts slowly by itself. With reduced motion it renders once as a static split. In dark mode the bands draw additively ('lighter' compositing). Drawing pauses when the hero is offscreen.

### Hero Chat
A glass panel that the spectrum lands on. Its header has a pulsing DATA-green live dot, the title "Ask about Sean" and an uppercase mono "scripted demo" disclosure. The user's bubbles are ink pills with a tight bottom-right corner. Answers stream in Ink 2 with a blinking caret, followed by pill action buttons. Suggestion chips scroll sideways under a fade mask.

### Carousels
- **Projects (coverflow):** the centered card is sharp and lifted. Neighbors are blurred 2px and clickable. The active dot stretches into a 40px hard-stop spectrum bar. Arrows and keyboard keys work, and on mobile the arrows move beside the dots.
- **Recommendations:** an auto-advancing glass quote panel tinted with the recommender's band. The pager is a row of avatar thumbnails (grayscale when inactive), each with a 2px dwell bar that fills in that recommender's band. "Read full" expands the complete text inline.

### Experience Rail
A 1px rail beside the bullets. A spectrum beam fills it top to bottom with scroll, and the bullets light up from 28% opacity as it passes. Dots cycle through the bands. The AI SDK bullet is promoted: AI Cyan dot, stronger glow, larger ink text.

## Do's and Don'ts

### Do:
- **Do** tie every band color to its layer or owning section, and keep the order UI → API → DATA → AI → CLOUD → LAB wherever bands appear together.
- **Do** build surfaces from the glass recipe (glass fill, 18px blur at 160% saturation, 1px glass border, inset highlight, ambient shadow) and mark interactive ones with `data-spot` so their edge disperses.
- **Do** start reveals from the left, in the direction light travels, using cubic-bezier(0.16, 1, 0.3, 1). Scroll reveals start at 25–40% opacity so content is readable before it animates. Only the hero's load entrance (name spread, claim, prism, chat, done within about 1.5s) starts from 0.
- **Do** keep wdth 125 for the name, section titles and the close. Everything else uses Archivo at wdth 100 or Geist.
- **Do** use Geist Mono with tabular figures for readouts, dates and data tags.
- **Do** give every effect a reduced-motion path that shows the finished static state.
- **Do** keep small text at 4.5:1 or better against its ground in both themes.

### Don't:
- **Don't** use gradient-filled text. Spectrum appears as lines, bars, edges, fills and light, never inside letterforms.
- **Don't** let blue and violet carry the brand alone. They are two bands of six, and a blue-purple glass portfolio is the explicit anti-reference.
- **Don't** center the hero around the avatar. The name leads from the top-left, and the photo lives inside the prism.
- **Don't** add hues outside the bench neutrals, the beam and the six bands.
- **Don't** use hard offset shadows. Depth is translucency, ambient shadow and band glow.
