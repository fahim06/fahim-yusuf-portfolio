# Fahim Yusuf — Personal Portfolio

[![Live Site](https://img.shields.io/badge/Live-fahimyusuf.com.bd-4ecca3?style=flat&logo=safari&logoColor=white)](https://fahimyusuf.com.bd/)
[![CI](https://github.com/fahim06/fahim-yusuf-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/fahim06/fahim-yusuf-portfolio/actions/workflows/ci.yml)
[![Security Scan](https://github.com/fahim06/fahim-yusuf-portfolio/actions/workflows/security.yml/badge.svg)](https://github.com/fahim06/fahim-yusuf-portfolio/actions/workflows/security.yml)
[![React](https://img.shields.io/badge/React-19.2-blue?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.2-purple?logo=vite&logoColor=white)](https://vite.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern, high-performance developer portfolio and personal website for **Fahim Yusuf** — Software Engineer & AI/ML Researcher. Live at [fahimyusuf.com.bd](https://fahimyusuf.com.bd/). Built with React, Vite, and serverless backend functionality for contact management.

---

## 🌟 Highlights

- **Visual Design:** Dark-mode editorial aesthetic inspired by modern minimalist creative development.
- **Interactive Micro-Animations:** Custom lerp cursor, wireframe vector geometry, interactive 3D particle sphere, and animated tab interfaces.
- **Accessibility & SEO:**
  - Validated semantic HTML5 structure with ARIA landmark navigation.
  - JSON-LD Structured Data Schema (`WebSite`, `Person`, `CollegeOrUniversity`).
  - Optimized Open Graph & Twitter Card social previews.
  - Support for `prefers-reduced-motion` and keyboard skip-navigation.
- **Contact Center & Serverless API:**
  - End-to-end contact form with client and server-side validation.
  - Vercel Serverless Function handler (`/api/send`) using Nodemailer over Gmail SMTP.
  - Automated confirmation replies to visitors.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, Vanilla CSS3 (Custom Properties & Design Tokens), Vite 8
- **Typography:** Cormorant Garamond (Editorial Serif), Space Grotesk (Sans-Serif), Space Mono (Monospace)
- **Backend / API:** Node.js, Vercel Serverless Functions (`/api/send.js`), Nodemailer
- **Code Quality:** Oxlint

---

## 📁 Directory Structure

```text
fahim-yusuf-portfolio/
├── api/                  # Vercel Serverless Functions (Production API)
│   └── send.js           # POST /api/send contact form mailer
├── public/               # Static assets, manifests, icons & SEO files
│   ├── favicon.svg       # Vector monogram favicon
│   ├── og-image.jpg      # 1200x630 social sharing card
│   ├── robots.txt        # Web crawler directives
│   ├── site.webmanifest  # Progressive web manifest
│   └── sitemap.xml       # XML sitemap index
├── src/
│   ├── assets/           # Media & visual assets
│   ├── components/       # Modular UI components & scoped stylesheets
│   │   ├── About.jsx     # Bio, Education, Tabs, and Stats
│   │   ├── Contact.jsx   # Interactive contact form & direct reach-out
│   │   ├── Footer.jsx    # Footer credits, Privacy, and A11y statements
│   │   ├── Hero.jsx      # Dynamic landing headline & animated background
│   │   ├── Navbar.jsx    # Minimalist navigation & full-screen menu
│   │   ├── Projects.jsx  # Interactive project showcase grid & modal dialogs
│   │   └── Services.jsx  # Areas of expertise & 3D wireframe visuals
│   ├── data/
│   │   └── portfolio.js  # Centralized portfolio data model
│   ├── hooks/
│   │   └── useIntersection.js # Custom IntersectionObserver hook
│   ├── App.jsx           # Main application root & custom cursor
│   ├── index.css         # Global design tokens, typography & reset styles
│   └── main.jsx          # React DOM entry point
├── .env.example          # Environment variables template
├── .gitignore            # Git exclusion rules (safeguards secrets)
├── package.json          # Project metadata, dependencies & npm scripts
├── server.js             # Local development API proxy server (port 3001)
├── vercel.json           # Vercel deployment routing configuration
└── vite.config.js        # Vite build & development proxy configuration
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version `18.x` or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) / [pnpm](https://pnpm.io/)

### 1. Clone the repository

```bash
git clone https://github.com/fahim06/portfolio.git
cd portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root based on `.env.example`:

```bash
cp .env.example .env
```

Fill in your configuration:

```env
EMAIL_USER=your.gmail@gmail.com
EMAIL_PASS=your-16-char-gmail-app-password
EMAIL_TO=your.gmail@gmail.com
```

> **Note:** For Gmail, `EMAIL_PASS` must be a 16-character **Google App Password** generated from your Google Account security settings with 2-Factor Authentication enabled.

---

## 💻 Development & Build Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server (frontend only) |
| `npm run dev:api` | Starts the local backend API server on port 3001 |
| `npm run dev:full` | Starts both the local API server and Vite concurrently |
| `npm run build` | Builds the production bundle to `/dist` |
| `npm run preview` | Locally previews the production build |
| `npm run lint` | Runs the Oxlint static code analysis suite |

---

## 🌐 Deployment (Vercel & Custom Domain)

This portfolio is configured for continuous deployment on **Vercel** with custom domain [fahimyusuf.com.bd](https://fahimyusuf.com.bd/):

1. **GitHub Integration:** Every push to `main` triggers automated CI validation, security scans, and production deployment via GitHub Actions (`.github/workflows/deploy.yml`).
2. **Environment Variables:** Set in Vercel Project Settings and GitHub Secrets:
   - `EMAIL_USER`: Your Gmail address
   - `EMAIL_PASS`: Your Gmail App Password
   - `EMAIL_TO`: Notification destination address
3. **Custom Domain:** Assigned to `https://fahimyusuf.com.bd/` with automatic SSL certification and DNS routing.
4. **Branch Protection:** The `main` branch is protected by strict CI/CD gates (see [.github/BRANCH_PROTECTION.md](.github/BRANCH_PROTECTION.md)).

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

---

## 📬 Contact

**Fahim Yusuf**  

- Email: [fahim.yusuf06@gmail.com](mailto:fahim.yusuf06@gmail.com)  
- GitHub: [@fahim06](https://github.com/fahim06)  
- LinkedIn: [in/fahim06](https://www.linkedin.com/in/fahim06/)
