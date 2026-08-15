# Muhammed Fasil K — Portfolio Website

Personal portfolio of **Muhammed Fasil K**, Unity Developer & Performance Engineer based in Abu Dhabi, UAE. Built with Next.js and featuring an immersive, game-inspired UI with particle effects, animated sections, and a cinematic start screen.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| UI | React 18 |
| Animations | [Framer Motion](https://www.framer.com/motion/) |
| 3D / Particles | [Three.js](https://threejs.org/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Styling | CSS Modules + Global CSS |
| Fonts | Orbitron · Inter · Share Tech Mono (Google Fonts) |
| Output | Static export (`next export`) |

## Project Structure

```
src/
├── app/
│   ├── layout.js          # Root layout, metadata, Google Fonts
│   ├── page.js            # Main page — orchestrates all sections
│   ├── globals.css        # Global styles & design tokens
│   └── projects/          # Individual project detail pages
│       ├── cutovia/
│       ├── ibees/
│       └── jungle-safari/
└── components/
    ├── StartScreen/       # Cinematic entry screen
    ├── Navbar/            # Fixed navigation bar
    ├── HeroSection/       # Hero with parallax & particle background
    ├── ParticleBackground/# Three.js particle canvas
    ├── PerformanceHUD/    # Live FPS / perf overlay widget
    ├── ImpactStrip/       # Key metrics banner
    ├── AboutSection/      # About me
    ├── ExperienceSection/ # Work history timeline
    ├── HowIWorkSection/   # Workflow / process section
    ├── ProjectsSection/   # Project cards grid
    ├── SkillsSection/     # Skills & tools
    └── ContactSection/    # Contact form / links
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
```

The static output is generated in the `out/` directory, ready to deploy to any static host (GitHub Pages, Vercel, Netlify, etc.).

## Sections

- **Start Screen** — Full-screen cinematic intro before the main content fades in
- **Hero** — Name, title, key performance metrics, and CTA buttons with mouse-parallax effect
- **Impact Strip** — Quick-glance highlight numbers (FPS boost, memory savings, platforms)
- **About** — Background and introduction
- **Experience** — Professional timeline
- **How I Work** — Development process and workflow
- **Projects** — Featured projects (Cutovia, iBees, Jungle Safari) with individual detail pages
- **Skills** — Technologies and tools
- **Contact** — Ways to reach out

## Deployment

This project is configured for **static export** (`output: 'export'` in `next.config.js`), so the built `out/` folder can be dropped onto any static hosting platform without a Node.js server.
