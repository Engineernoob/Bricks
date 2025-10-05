# 🧱 Bricks — Build Your Dream App, Brick by Brick

> The next generation of no-code full-stack development.
> Design, connect, and deploy production-ready apps — faster than ever.

<p align="center">
  <img alt="Bricks Logo" src="https://buildwitbricks.com/og-image.png" width="480" />
</p>

<p align="center">
  <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=nextdotjs" /></a>
  <a href="https://clerk.com"><img src="https://img.shields.io/badge/Auth-Clerk-blueviolet?style=flat-square&logo=clerk" /></a>
  <a href="https://neon.tech"><img src="https://img.shields.io/badge/Database-Neon-green?style=flat-square&logo=postgresql" /></a>
  <a href="https://prisma.io"><img src="https://img.shields.io/badge/ORM-Prisma-2D3748?style=flat-square&logo=prisma" /></a>
  <a href="https://uploadthing.com"><img src="https://img.shields.io/badge/Uploads-UploadThing-orange?style=flat-square&logo=cloudflare" /></a>
  <a href="https://polar.sh"><img src="https://img.shields.io/badge/Billing-Polar-pink?style=flat-square&logo=stripe" /></a>
  <a href="https://vercel.com"><img src="https://img.shields.io/badge/Hosted_on-Vercel-black?style=flat-square&logo=vercel" /></a>
</p>

---

## 🚀 Overview

Bricks helps makers, founders, and teams go from **idea → full-stack app in minutes**, without writing code.

Built with **Next.js**, **Clerk**, **Neon**, **Prisma**, **UploadThing**, and **Polar**, Bricks combines power and simplicity to deliver a seamless no-code experience — from prototype to production.

---

## 🧠 Tech Stack

| Layer            | Technology                                                                                    | Purpose                     |
| ---------------- | --------------------------------------------------------------------------------------------- | --------------------------- |
| **Auth**         | [Clerk](https://clerk.com)                                                                    | Authentication & waitlist   |
| **Database**     | [Neon](https://neon.tech) + [Prisma](https://prisma.io)                                       | Scalable Postgres + ORM     |
| **File Uploads** | [UploadThing](https://uploadthing.com)                                                        | Image and asset uploads     |
| **Payments**     | [Polar](https://polar.sh)                                                                     | Billing and subscriptions   |
| **Frontend**     | [Next.js](https://nextjs.org) + [ShadCN/UI](https://ui.shadcn.com) + [GSAP](https://gsap.com) | UI and animation            |
| **Hosting**      | [Vercel](https://vercel.com)                                                                  | Deployment and edge scaling |

---

## 🧩 Features

- 🪄 **Drag-and-Drop Builder** — Visual block editor for full-stack apps
- 🔐 **Auth & Waitlist** — Managed by Clerk
- ☁️ **Database Layer** — Neon + Prisma for structured data
- 📤 **UploadThing** — Seamless media uploads
- 💳 **Polar Integration** — Monetization & subscriptions
- 📰 **Built-in Blog** — Track updates and progress
- 💫 **GSAP Animations** — Smooth interactions everywhere

---

## 📂 Project Structure

src/
├── app/ # App router
│ ├── (marketing)/ # Landing, pricing, waitlist, blog
│ ├── dashboard/ # Authenticated app area
│ └── api/ # Route handlers
├── components/ # UI components
├── landing/ # Hero, CTA, Footer, etc.
├── lib/ # Prisma, Clerk, UploadThing configs
├── content/ # Blog posts (MDX)
└── styles/ # Tailwind + globals

---

## ⚙️ Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/Engineernoob/bricks.git
cd bricks
npm install

2. Run Development Server
npm run dev


Visit http://localhost:3000
 to view the app.

🔑 Environment Variables

Create .env.local in the project root:

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx

# Database
DATABASE_URL="postgresql://user:password@ep.db.neon.tech/dbname?sslmode=require"

# UploadThing
UPLOADTHING_SECRET=xxxx
UPLOADTHING_APP_ID=xxxx

# Polar
POLAR_ACCESS_TOKEN=xxxx

🧾 Scripts
Command	Action
npm run dev	Start development server
npm run build	Build for production
npm run start	Run production server
npm run lint	Check for lint issues
🌍 Deployment

Deploy instantly with Vercel:

Push to GitHub

Import the repo into Vercel

Add your .env.local variables

Click Deploy 🚀

🪴 Roadmap

 Landing page with GSAP animations

 Waitlist + Auth via Clerk

 Dashboard UI (Neon + Prisma)

 Polar integration for billing

 No-code Builder MVP

 Team workspaces & sharing

 Template marketplace

✨ Build in Public

Follow the journey as Bricks evolves.
→ buildwitbricks.com/blog

→ @shebuildsfire on X

🧱 License

This project is licensed under the MIT License.
© 2025 Taahirah Denmark. All rights reserved.
```
