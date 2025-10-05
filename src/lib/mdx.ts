export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  content: string;
}

// Static blog posts data for client-side rendering
const blogPosts: BlogPost[] = [
  {
    slug: "future-of-no-code",
    title: "The Future of No-Code: Bricks and the Next Wave of Builders",
    excerpt:
      "A look at how Bricks is shaping the future of no-code — empowering anyone to turn ideas into production-ready apps with AI, design, and simplicity at its core.",
    date: "2025-10-05",
    readTime: "4 min read",
    author: "Taahirah Denmark",
    content: `The next generation of no-code tools is here — and it’s not just about speed, it’s about **intelligence**.
    Bricks combines AI, design systems, and developer-grade architecture so creators can ship apps faster than ever.

    ### Why It Matters
    No-code isn’t replacing developers; it’s expanding what’s possible for everyone else.
    When you can go from **idea → database → deploy** in a single afternoon, you start thinking differently about creativity and execution.

    ### What’s Next
    We’re building toward a future where AI understands your intent, your data, and your UI — and assembles the pieces for you. Bricks is that foundation.`,
  },
  {
    slug: "behind-the-scenes",
    title: "Behind the Scenes: Building Bricks from Scratch",
    excerpt:
      "How Bricks started as a late-night experiment and evolved into a fully featured AI-powered builder for modern web apps.",
    date: "2025-10-03",
    readTime: "6 min read",
    author: "Taahirah Denmark",
    content: `
    Every product has a story — Bricks began as mine.
    It started with a simple frustration: building apps was too repetitive, too scattered, too slow.
    So I asked, *what if we could build like we think?*

    ### The Early Days
    The first prototype was built in a weekend: a drag-and-drop editor wired to Supabase and GSAP animations. It wasn’t pretty, but it worked.

    Today, Bricks uses:
    - **Next.js + ShadCN** for the design system
    - **Neon + Prisma** for the database layer
    - **UploadThing** for media
    - **Polar + Clerk** for billing and authentication

    ### What Drives the Build
    Bricks is more than a tool — it’s a reflection of every builder who dreams of shipping without waiting for permission.`,
  },
  {
    slug: "design-language",
    title: "Designing the Bricks Visual Language",
    excerpt:
      "The philosophy behind Bricks’ design — clarity, calmness, and confidence. Every pixel has a purpose.",
    date: "2025-09-30",
    readTime: "5 min read",
    author: "Taahirah Denmark",
    content: `
    The Bricks interface is intentionally minimal.
    Every shade, corner radius, and animation exists to help you think clearly and build confidently.

    ### The Core Principles
    1. **Calm UI:** Reduce visual noise, focus attention.
    2. **Cohesion:** Every component feels like it belongs to the same family.
    3. **Momentum:** Subtle animations that *feel alive*, not distracting.

    ### From Prototype to Personality
    Bricks isn’t trying to look futuristic — it’s timeless, inspired by productivity tools like Notion and Linear.
    Because great design should fade into the background and let your creativity take center stage.`,
  },
  {
    slug: "community-first",
    title: "Why Bricks is Built in Public",
    excerpt:
      "Building in public keeps us honest, transparent, and close to the people who actually use Bricks every day.",
    date: "2025-09-28",
    readTime: "4 min read",
    author: "Taahirah Denmark",
    content: `
    I’ve always believed that *building in public* is the best growth strategy — not just for marketing, but for alignment.

    By sharing our roadmap, updates, and even our mistakes, we:
    - Build trust with early adopters
    - Attract creators who value transparency
    - Keep our priorities real — focused on solving user pain

    Bricks is not just software; it’s a conversation with its community. Every feature starts with a “what if” from our builders.`,
  },
  {
    slug: "roadmap-2025",
    title: "The Bricks 2025 Roadmap",
    excerpt:
      "A look at what’s next for Bricks — AI-assisted app generation, better team collaboration, and full-stack deployments made effortless.",
    date: "2025-09-25",
    readTime: "5 min read",
    author: "Taahirah Denmark",
    content: `
    Here’s what’s on the horizon for Bricks:

    ### Q4 2025
    - **AI Blueprinting:** Generate full-stack app structures from plain text prompts.
    - **Team Workspaces:** Invite collaborators and assign roles.
    - **One-click Deployments:** Push to production with real-time logs and metrics.

    ### Q1 2026
    - **Integrations Marketplace**
    - **Advanced Components Library**
    - **Public Templates + Remixing**

    This roadmap isn’t static — it’s shaped by feedback from you, our builders.
    You don’t just use Bricks. You help define it.`,
  },
  {
    slug: "launch-reflections",
    title: "Bricks Launch Reflections",
    excerpt:
      "What we learned shipping the first public release of Bricks — from design systems to deployment challenges.",
    date: "2025-09-20",
    readTime: "3 min read",
    author: "Taahirah Denmark",
    content: `
    Launching Bricks publicly was both terrifying and exhilarating.

    ### What Worked
    - The design system (ShadCN + Tailwind) made UI iteration seamless.
    - GSAP + Typed.js gave the landing page real personality.
    - Community waitlist feedback directly shaped our onboarding flow.

    ### What We’d Do Differently
    - Start the docs earlier
    - Automate releases sooner
    - Simplify the database schema from day one

    Every launch teaches something. For Bricks, it taught us that clarity, not perfection, moves you forward.`,
  },
];

export async function getAllPosts(): Promise<BlogPost[]> {
  return Promise.resolve(blogPosts);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug) || null;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
