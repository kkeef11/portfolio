nextjs-portfolio/
│── app/ # The main App Router directory
│ ├── layout.tsx # Global layout for the app
│ ├── page.tsx # Homepage (Root "/")
│ │
│ ├── projects/ # Projects page
│ │ ├── page.tsx # Uses SSR or CSR dynamically
│ │ ├── ProjectsSSR.tsx # Server Component (SSR)
│ │ ├── ProjectsCSR.tsx # Client Component (CSR)
│ │
│ ├── about/ # About page
│ │ ├── page.tsx # About section (static)
│ │
│ ├── blog/ # Blog section
│ │ ├── page.tsx # Lists all blog posts
│ │ ├── [slug]/ # Dynamic route for blog posts
│ │ │ ├── page.tsx # Fetches blog data via SSR
│ │
│ ├── api/ # API routes (server functions)
│ │ ├── projects/ # CSR API for projects
│ │ │ ├── route.ts # API handler for CSR fetching
│ │
│── components/ # Reusable components
│ ├── RenderModeTab.tsx # Navigation bar
│ ├── Footer.tsx # Footer component
│
│── context/ # Global state management
│ ├── RenderModeContext.tsx # Manages SSR/CSR toggle
│
│── public/ # Static assets (images, icons)
│── styles/ # Global styles (CSS, Tailwind)
│── next.config.js # Next.js config
│── package.json # Dependencies
│── tsconfig.json # TypeScript config
│── README.md # Project documentation
