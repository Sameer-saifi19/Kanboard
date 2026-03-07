# Prod SaaS

**Version 1 (v1)** — A multi-tenant SaaS application with workspace-based organization management.

A full-stack demo app built to showcase authentication, multi-workspace (organization) flows, and modern React/Next.js patterns. Suitable for portfolio or technical interviews.

---

## Tech Stack

| Layer | Technologies |
|-------|--------------|
| **Framework** | Next.js 16 (App Router), React 19 |
| **Language** | TypeScript |
| **Auth** | [Better Auth](https://www.better-auth.com/) — email/password + Google OAuth, organization plugin |
| **Database** | PostgreSQL with Prisma ORM |
| **UI** | Tailwind CSS 4, Radix UI, shadcn/ui, Lucide icons |
| **Forms & validation** | React Hook Form, Zod |
| **State** | Zustand |
| **Media** | Cloudinary (workspace avatars) |
| **Notifications** | Sonner (toast) |

---

## Features

- **Authentication** — Sign up, sign in, sign out; Google OAuth and email/password
- **Workspaces (organizations)** — Create, switch, and delete workspaces; each user can belong to multiple workspaces
- **Workspace settings** — Update name/slug, workspace image (upload/remove via Cloudinary), delete workspace with redirect to first remaining workspace or create-workspace flow
- **User profile** — Profile page with avatar and editable details
- **Workspace-scoped routes** — Dashboard layout with sidebar and navbar; routes under `/w/[slug]` (e.g. projects, members, billing, settings)
- **Create workspace** — Dedicated flow when user has no workspaces; redirect after workspace deletion to first workspace or create-workspace page

---

## Project Structure

```
├── app/
│   ├── (main)/          # Authenticated dashboard layout (sidebar, navbar)
│   │   ├── layout.tsx
│   │   ├── u/[id]/      # User profile
│   │   └── w/[slug]/    # Workspace routes (projects, members, billing, settings)
│   ├── auth/            # Sign in / sign up
│   ├── create-workspace/
│   └── ...
├── components/          # UI components, forms, modals, global (navbar, sidebar, workspace switch)
├── lib/                 # Auth config, Prisma client, utilities
├── schema/              # Zod schemas (auth, workspace)
├── server/              # Server actions (workspace, user)
└── prisma/              # Schema and migrations
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- PostgreSQL database

### 1. Install dependencies

```bash
pnpm install
```

### 2. Environment variables

Create a `.env` file in the project root with:

```env
# Database (Prisma)
DATABASE_URL="postgresql://user:password@localhost:5432/your_db"

# Better Auth
BETTER_AUTH_URL="http://localhost:3000"
BETTER_AUTH_SECRET="your-secret-key"

# Google OAuth (optional)
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# Cloudinary (optional, for workspace images)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."
```

### 3. Database setup

```bash
pnpm prisma db push
pnpm prisma generate
```

Or use the project script:

```bash
pnpm prisma
```

### 4. Run the app

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). Use **Sign up** or **Sign in** to access the dashboard and workspace flows.

---

## Scripts

| Command | Description |
|--------|-------------|
| `pnpm dev` | Start Next.js dev server |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm prisma` | Push schema and generate Prisma client |
| `pnpm lint` | Run ESLint |

---

## License

Private / portfolio use.
