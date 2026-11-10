# Moncito Hernandez — Portfolio

A personal portfolio website built with **Next.js 16**, **TypeScript**, and **Tailwind CSS v4**, with scroll-driven animation powered by GSAP and Lenis.

## Tech Stack

- **Framework** — Next.js 16 (App Router)
- **Language** — TypeScript
- **Styling** — Tailwind CSS v4
- **Animations** — GSAP (ScrollTrigger, SplitText, CustomEase)
- **Smooth Scroll** — Lenis (`lenis`)

## Features

- Animated preloader with a kinetic intro sequence
- Custom cursor
- Floating navigation bar
- Hero section with GSAP text animations and a live GitHub contribution calendar
- Bento grid layout for the About section
- Recent Projects showcase with tech stack icons
- Clients / testimonials section with infinite moving cards
- Work experience timeline
- Footer with social links
- Fully responsive across all screen sizes

## Sections

| Section         | Description                                             |
| --------------- | ------------------------------------------------------- |
| Hero            | Intro with name, role, GitHub calendar, and CTA buttons |
| Grid            | Bento-style about/skills cards                          |
| Recent Projects | Project cards with live links and tech icons            |
| Clients         | Testimonials carousel and tools used                    |
| Experience      | Work history cards                                      |
| Footer          | Contact and social media links                          |

## Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

```bash
npm run build
npm run start
```

## Project Structure

```
app/             # Next.js App Router (layout, page, globals.css)
components/      # Page sections and UI primitives
  ui/            # Reusable UI components (BentoGrid, FloatingNav, etc.)
data/            # Centralized content (nav, projects, testimonials, experience)
lib/             # Utility helpers
public/          # Static assets (images, SVGs, resume PDF)
```
