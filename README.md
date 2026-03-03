# 🌐 nasim.dev — Personal Website

Welcome to the source code of [www.nasim.dev](https://www.nasim.dev) — a fully responsive personal website for **Nasim Ali**, a Full-Stack Software Engineer based in UK.

> This site is powered by **React**, **TypeScript**, **Tailwind CSS**, and **Vite** 🎯

---

## 🚀 Live Site

🌍 Visit → [https://www.nasim.dev](https://www.nasim.dev)

---

## 🛠 Tech Stack

| Tool                                          | Purpose                          |
| --------------------------------------------- | -------------------------------- |
| [React](https://reactjs.org/)                 | Frontend library for building UI |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe codebase               |
| [Tailwind CSS](https://tailwindcss.com/)      | Utility-first styling            |
| [Vite](https://vitejs.dev/)                   | Blazing fast build tool          |

---

## 🔧 Getting Started

Follow these instructions to get a local copy up and running for development and testing purposes.

### Prerequisites

- **Node.js**: Version `18.x` or newer (v20+ recommended)
- **pnpm**: Version `10.x` or newer  
  Install via npm:
  ```bash
  npm install -g pnpm
  ```
- **Git**: For cloning and version control

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

   Create a `.env` file in the root of the project. See [Environment Variables](#-environment-variables) section for required and optional variables.

   ```bash
   cp .env.example .env   # If .env.example exists, use it as template
   ```

5. **Start development server:**

   ```bash
   pnpm run dev
   ```

   The app will be available at `http://localhost:5173`

## ✨ Features

- 🌓 **Dark/Light Theme Toggle** — Automatic system preference detection with localStorage persistence
- 📡 **Dynamic Content** — All site content fetched from external config repository
- 🔍 **Google Analytics** — Integration with GA4 for usage tracking
- 🤖 **reCAPTCHA** — Spam protection on contact form
- 🍪 **Cookie Consent Banner** — GDPR-compliant consent management
- ⚡ **Scroll Detection** — Active section highlighting in navigation
- 🎨 **Shadcn/ui Components** — Accessible UI components with Radix UI and Tailwind CSS
- 📧 **Email Notifications** — Contact form powered by EmailJS
- 🗜️ **Asset Optimization** — Brotli compression for improved performance

---

## 📦 Dynamic Config Architecture

All site content (hero text, about, skills, experience, projects, etc.) is loaded **dynamically** from this repo:  
👉 [`nasimali/nasim-dev-config`](https://github.com/nasimali/nasim-dev-config)

This means you can update the site's content (JSON) without changing or redeploying the codebase!

### 📁 Content Fetched Includes:

- `skills.json`
- `experience.json`
- `education.json`
- `projects.json`
- `textContent.json`

## All content is fetched once on app load via `fetchConfig.ts`.

## 🚀 Available Scripts

```bash
# Start development server (hot reload enabled)
pnpm run dev

# Build for production (TypeScript check + Vite build)
pnpm run build

# Deploy to GitHub Pages (local with manual token)
pnpm run deploy:local

# Deploy to GitHub Pages (CI/CD with GITHUB_TOKEN)
pnpm run deploy:prod

# Preview production build locally
pnpm preview

# Run ESLint checks
pnpm run lint

# Auto-fix ESLint issues and format code
pnpm run lint:fix
```

---

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Shadcn/ui base components
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── Education.tsx
│   ├── Experience.tsx
│   ├── Hero.tsx
│   ├── Projects.tsx
│   ├── Skills.tsx
│   └── ...
├── hooks/              # Custom React hooks
│   ├── use-active-section.ts   # Scroll position tracking
│   └── use-theme.ts    # Dark/light theme management
├── lib/                # Utilities and helpers
│   ├── fetchConfig.ts  # Dynamic content fetching
│   ├── cookieConsentManager.ts  # Cookie handling
│   ├── scroll.ts
│   ├── types.ts
│   └── utils.ts
└── main.tsx            # App entry point
```

---

## 💻 Development

### Code Quality

This project enforces strict code quality standards:

- **TypeScript** — Full type safety with `tsc` compilation
- **ESLint** — Lint rules with zero-warning policy
- **Prettier** — Automatic code formatting

Run before committing:

```bash
pnpm run lint:fix      # Fix linting issues
pnpm run build         # Verify TypeScript and build
```

### Technology Details

- **Tailwind CSS v4** with JIT compilation
- **Vite** with React Oxc plugin for fast compilation
- **Framer Motion** for animations
- **Lucide React** for icons
- **reCAPTCHA v3** for form protection

---

## 🌐 Deployment

The site is deployed on **GitHub Pages** and uses:

- `gh-pages` npm package for deployment
- Automatic CNAME configuration for `www.nasim.dev`
- Optional CI/CD via GitHub Actions (using `deploy:prod` script)
