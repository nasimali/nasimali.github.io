# 🌐 nasim.dev — Personal Website & Online CV of Nasim Ali

Welcome to the source code of [www.nasim.dev](https://www.nasim.dev) — a fully responsive personal website for **Nasim Ali**, a Full-Stack Software Engineer based in UK.

> This site is powered by **React**, **TypeScript**, **Tailwind CSS**, and **Vite** — with content loaded from a config repo. 🎯

---

## 🚀 Live Site

🌍 Visit → [https://www.nasim.dev](https://www.nasim.dev)

---

## 🛠 Tech Stack

| Tool             | Purpose                                 |
|------------------|-----------------------------------------|
| [React](https://reactjs.org/)         | Frontend library for building UI  |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe codebase                |
| [Tailwind CSS](https://tailwindcss.com/)     | Utility-first styling             |
| [Vite](https://vitejs.dev/)           | Blazing fast build tool           |

---

## 📦 Dynamic Config Architecture

All site content (hero text, about, skills, experience, projects, etc.) is loaded **dynamically** from this repo:  
👉 [`nasimali/nasim-dev-config`](https://github.com/nasimali/nasim-dev-config)

This means you can update the site’s content (JSON) without changing or redeploying the codebase!

### 📁 Content Fetched Includes:
- `skills.json`
- `experience.json`
- `education.json`
- `projects.json`
- `textContent.json`

All content is fetched once on app load via `fetchConfig.ts`.
