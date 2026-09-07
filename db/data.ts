export const allProjects = [
  {
    id: 1,
    name: "GitPulse",
    slug: "gitpulse",
    tagline: "Real-time GitHub analytics and Slack notifications.",
    description: "Real-time analytics dashboard for GitHub repositories with instant Slack alerts for critical PR reviews.",
    websiteUrl: "https://gitpulse.example.com",
    tags: ["DevTools", "React", "Analytics", "Automation"],
    createdAt: new Date(Date.now() - 654 * 24 * 60 * 60 * 1000 - 2 * 60 * 1000), // ~21 months ago
    approvedAt: new Date(Date.now() - 654 * 24 * 60 * 60 * 1000 + 1 * 45 * 60 * 1000), // 1 hour 45 mins later
    status: "approved" as const,
    submittedBy: "hello@example.com",
    voteCount: 342,
  },
  {
    id: 2,
    name: "SchemaForge",
    slug: "schemaforge",
    tagline: "Drag-and-drop database schema design to code builder.",
    description: "A visual, drag-and-drop database schema builder that instantly exports production-ready Prisma and TypeORM code.",
    websiteUrl: "https://schemaforge.example.com",
    tags: ["Database", "Next.js", "Prisma", "TypeScript", "SQL"],
    createdAt: new Date(Date.now() - 250 * 24 * 60 * 60 * 1000 - 7 * 60 * 1000), // ~8 months ago
    approvedAt: new Date(Date.now() - 250 * 24 * 60 * 60 * 1000 + 5 * 47 * 60 * 1000), // 5 hours 47 mins later
    status: "approved" as const,
    submittedBy: "dev@example.com",
    voteCount: 289,
  },
  {
    id: 3,
    name: "MockingJay API",
    slug: "mockingjay-api",
    tagline: "Instant mock REST & GraphQL API servers locally.",
    description: "Blazing fast local mock server generator that builds functional REST and GraphQL endpoints from a single JSON file.",
    websiteUrl: "https://mockingjay-api.example.com",
    tags: ["API", "Node.js", "GraphQL", "Backend"],
    createdAt: new Date(Date.now() - 692 * 24 * 60 * 60 * 1000 - 18 * 60 * 1000), // ~23 months ago
    approvedAt: new Date(Date.now() - 692 * 24 * 60 * 60 * 1000 + 3 * 37 * 60 * 1000), // 3 hours 37 mins later
    status: "approved" as const,
    submittedBy: "founder@example.com",
    voteCount: 512,
  },
  {
    id: 4,
    name: "TailwindShine",
    slug: "tailwindshine",
    tagline: "Optimize and clean up raw Tailwind classes instantly.",
    description: "A lightweight browser extension that optimizes and minifies messy Tailwind utility classes directly inside inspect element.",
    websiteUrl: "https://tailwindshine.example.com",
    tags: ["CSS", "Extension", "Tailwind", "Frontend"],
    createdAt: new Date(Date.now() - 32 * 24 * 60 * 60 * 1000 - 5 * 60 * 1000), // 32 days ago
    approvedAt: new Date(Date.now() - 32 * 24 * 60 * 60 * 1000 + 3 * 13 * 60 * 1000), // 3 hours 13 mins later
    status: "approved" as const,
    submittedBy: "build@example.com",
    voteCount: 198,
  },
  {
    id: 5,
    name: "QueryBuddy",
    slug: "querybuddy",
    tagline: "Convert natural language prompts into optimized SQL syntax.",
    description: "An AI-powered SQL assistant that translates plain English prompts into highly optimized Postgres and MySQL queries.",
    websiteUrl: "https://querybuddy.example.com",
    tags: ["AI", "Database", "PostgreSQL", "LLM", "SQL"],
    createdAt: new Date(Date.now() - 517 * 24 * 60 * 60 * 1000 - 21 * 60 * 1000), // ~17 months ago
    approvedAt: new Date(Date.now() - 517 * 24 * 60 * 60 * 1000 + 1 * 35 * 60 * 1000), // 1 hour 35 mins later
    status: "approved" as const,
    submittedBy: "build@example.com",
    voteCount: 421,
  },
  {
    id: 6,
    name: "DockerLean",
    slug: "dockerlean",
    tagline: "Terminal user interface for auditing Docker layer footprint.",
    description: "A terminal user interface (TUI) tool that visualizes Docker layer sizes and safely strips out unused dependencies.",
    websiteUrl: "https://dockerlean.example.com",
    tags: ["DevOps", "Go", "Docker", "CLI", "TUI"],
    createdAt: new Date(Date.now() - 665 * 24 * 60 * 60 * 1000 - 23 * 60 * 1000), // ~22 months ago
    approvedAt: new Date(Date.now() - 665 * 24 * 60 * 60 * 1000 + 18 * 26 * 60 * 1000), // 18 hours 26 mins later
    status: "approved" as const,
    submittedBy: "build@example.com",
    voteCount: 315,
  },
  {
    id: 7,
    name: "CronSniper",
    slug: "cronsniper",
    tagline: "Visual cron expression builder and execution debugger.",
    description: "A simple visual debugger for complex cron expressions with dynamic timezone previews and execution history mapping.",
    websiteUrl: "https://cronsniper.example.com",
    tags: ["Utils", "Vue", "Cron", "Timezone"],
    createdAt: new Date(Date.now() - 459 * 24 * 60 * 60 * 1000 - 20 * 60 * 1000), // ~15 months ago
    approvedAt: new Date(Date.now() - 459 * 24 * 60 * 60 * 1000 + 9 * 51 * 60 * 1000), // 9 hours 51 mins later
    status: "approved" as const,
    submittedBy: "dev@example.com",
    voteCount: 87,
  },
  {
    id: 8,
    name: "LogStreamer",
    slug: "logstreamer",
    tagline: "Securely stream remote container logs over WebSockets.",
    description: "Lightweight self-hosted WebSocket server built for streaming containerized logs securely across multiple remote clusters.",
    websiteUrl: "https://logstreamer.example.com",
    tags: ["DevOps", "Rust", "WebSockets", "Logging", "Security"],
    createdAt: new Date(Date.now() - 163 * 24 * 60 * 60 * 1000 - 22 * 60 * 1000), // ~5 months ago
    approvedAt: new Date(Date.now() - 163 * 24 * 60 * 60 * 1000 + 14 * 21 * 60 * 1000), // 14 hours 21 mins later
    status: "approved" as const,
    submittedBy: "hello@example.com",
    voteCount: 143,
  },
  {
    id: 9,
    name: "Markdownify",
    slug: "markdownify",
    tagline: "Canvas-style canvas layout for writing technical docs.",
    description: "A collaborative, canvas-style editor built specifically for planning and drafting comprehensive developer documentation.",
    websiteUrl: "https://markdownify.example.com",
    tags: ["Productivity", "Svelte", "Markdown", "Documentation", "Editor"],
    createdAt: new Date(Date.now() - 159 * 24 * 60 * 60 * 1000 - 18 * 60 * 1000), // ~5 months ago
    approvedAt: new Date(Date.now() - 159 * 24 * 60 * 60 * 1000 + 11 * 6 * 60 * 1000), // 11 hours 6 mins later
    status: "approved" as const,
    submittedBy: "dev@example.com",
    voteCount: 64,
  },
  {
    id: 10,
    name: "FlexiMock",
    slug: "fleximock",
    tagline: "Seamlessly mock global fetch calls in code tests.",
    description: "A simple library to seamlessly intercept and mock native fetch calls during integration testing environments.",
    websiteUrl: "https://fleximock.example.com",
    tags: ["Testing", "JS", "Mocking", "Fetch", "TestingLibrary"],
    createdAt: new Date(Date.now() - 389 * 24 * 60 * 60 * 1000 - 3 * 60 * 1000), // ~13 months ago
    approvedAt: new Date(Date.now() - 389 * 24 * 60 * 60 * 1000 + 12 * 54 * 60 * 1000), // 12 hours 54 mins later
    status: "approved" as const,
    submittedBy: "hello@example.com",
    voteCount: 95,
  },
  {
    id: 11,
    name: "DocuScan AI",
    slug: "docuscan-ai",
    tagline: "Extract structured JSON from scanned receipts and PDFs.",
    description: "An open-source pipeline that leverages small language models to parse unstructured document images into perfectly typed schemas.",
    websiteUrl: "https://example.com",
    tags: ["AI", "Parser", "OpenSource", "Next.js"],
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000 - 15 * 60 * 1000), // 3 hours 15 minutes ago
    approvedAt: null, // Not yet approved
    status: "pending" as const,
    submittedBy: null,
    voteCount: null,
  },
  {
    id: 12,
    name: "CSSWind",
    slug: "csswind",
    tagline: "Instantly compile raw vanilla CSS into Tailwind utilities.",
    description: "A fast, browser-based compiler that takes any standard CSS stylesheet and outputs the closest semantic Tailwind equivalent.",
    websiteUrl: "https://example.com",
    tags: ["Frontend", "Tailwind", "CSS", "Utilities"],
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000 - 42 * 60 * 1000), // 1 hour 42 minutes ago
    approvedAt: null, // Rejected
    status: "rejected" as const,
    submittedBy: null,
    voteCount: null,
  }
];
