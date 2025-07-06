# 🌐 nasim.dev — Personal Website

Welcome to the source code of [www.nasim.dev](https://www.nasim.dev) — a fully responsive personal website for **Nasim Ali**, a Full-Stack Software Engineer based in UK.

> This site is powered by **React**, **TypeScript**, **Tailwind CSS**, and **Vite** 🎯

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

## 🔧 Getting Started

Follow these instructions to get a local copy up and running for development and testing purposes.

### Prerequisites

- **Node.js**: Version `18.x` or newer
- **pnpm**: Version `10.x` or newer  
  Install via npm:
  ```bash
  npm install -g pnpm
  ```

### 🚀 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/nasimali/nasimali.github.io.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd nasimali.github.io
   ```

3. **Install dependencies using pnpm:**
   ```bash
   pnpm install
   ```

4. **Set up environment variables:**

   Create a `.env` file in the root of the project by copying the example file:
   ```bash
   cp .env.example .env
   ```

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
