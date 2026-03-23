import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  Building2,
  Cloud,
  CreditCard,
  Layers,
  LockKeyhole,
  Sparkles,
  UsersRound,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Building2,
    title: "Workspaces (multi-tenant)",
    description:
      "Create, switch, and manage multiple organizations with workspace-scoped routes under `/w/[slug]`.",
  },
  {
    icon: LockKeyhole,
    title: "Modern auth",
    description:
      "Email/password and Google OAuth powered by Better Auth, including organization support.",
  },
  {
    icon: UsersRound,
    title: "Members & roles",
    description:
      "Invite members and manage access with roles (built on Better Auth organizations + Prisma).",
  },
  {
    icon: Layers,
    title: "Clean UI system",
    description:
      "Tailwind CSS + shadcn/ui building blocks for a consistent, interview-ready interface.",
  },
  {
    icon: Cloud,
    title: "Media-ready",
    description:
      "Workspace avatars with upload/remove flows (Cloudinary) for a realistic SaaS experience.",
  },
  {
    icon: CreditCard,
    title: "SaaS pages included",
    description:
      "Billing and settings routes included as a foundation for subscriptions and account management.",
  },
];

const steps = [
  {
    title: "Sign up",
    description: "Create an account with email/password or Google.",
  },
  {
    title: "Create a workspace",
    description: "Start with a new organization and pick a slug.",
  },
  {
    title: "Build inside `/w/[slug]`",
    description: "Projects, members, billing, settings — all workspace-scoped.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/2 h-130 w-130 -translate-x-1/2 rounded-full bg-linear-to-br from-primary/25 via-fuchsia-500/15 to-sky-500/15 blur-3xl" />
          <div className="absolute -bottom-45 -right-45 h-130 w-130 rounded-full bg-linear-to-tr from-emerald-500/10 via-primary/10 to-amber-500/10 blur-3xl" />
        </div>

        <header className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
          <div className="flex items-center gap-3">
              <h1 className="text-3xl uppercase font-bold tracking-tighter">Kanboard</h1>
          </div>

          <nav className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link href="/auth/sign-in">Sign in</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/auth/sign-up">
                Get started <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
          </nav>
        </header>

        <section className="relative mx-auto w-full max-w-6xl px-6 pb-16 pt-10">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs text-muted-foreground shadow-sm">
                <span className="size-1.5 rounded-full bg-emerald-400/90" />
                Multi-tenant SaaS starter for interviews
              </div>

              <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
                Build fast with workspaces, auth, and a clean dashboard.
              </h1>

              <p className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
                kanboard is a Next.js app that demonstrates real SaaS fundamentals: organizations
                (workspaces), settings, members, and a modern UI layer — designed to be easy to
                explain in an interview and extend in production.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button asChild size="lg" className="sm:w-auto">
                  <Link href="/auth/sign-up">
                    Create account <ArrowRight className="ml-1 size-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="sm:w-auto">
                  <Link href="/auth/sign-in">Continue to dashboard</Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-3">
                <div className="rounded-lg border bg-card px-4 py-3 shadow-sm">
                  <div className="text-sm font-medium">Next.js 16</div>
                  <div className="text-xs text-muted-foreground">App Router</div>
                </div>
                <div className="rounded-lg border bg-card px-4 py-3 shadow-sm">
                  <div className="text-sm font-medium">Better Auth</div>
                  <div className="text-xs text-muted-foreground">Organizations</div>
                </div>
                <div className="rounded-lg border bg-card px-4 py-3 shadow-sm">
                  <div className="text-sm font-medium">Prisma</div>
                  <div className="text-xs text-muted-foreground">Postgres</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl border bg-card/60 p-4 shadow-sm backdrop-blur supports-backdrop-filter:bg-card/40">
                <div className="rounded-xl border bg-background p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="size-2 rounded-full bg-rose-400/90" />
                      <div className="size-2 rounded-full bg-amber-300/90" />
                      <div className="size-2 rounded-full bg-emerald-400/90" />
                    </div>
                    <div className="text-xs text-muted-foreground">/w/acme/projects</div>
                  </div>

                  <div className="mt-4 grid gap-3">
                    <div className="rounded-lg border bg-card px-4 py-3">
                      <div className="text-sm font-medium">Workspace switcher</div>
                      <div className="text-xs text-muted-foreground">
                        Jump between organizations instantly
                      </div>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-lg border bg-card px-4 py-3">
                        <div className="text-sm font-medium">Members</div>
                        <div className="text-xs text-muted-foreground">Invite & manage access</div>
                      </div>
                      <div className="rounded-lg border bg-card px-4 py-3">
                        <div className="text-sm font-medium">Settings</div>
                        <div className="text-xs text-muted-foreground">Name, slug, avatar</div>
                      </div>
                    </div>
                    <div className="rounded-lg border bg-card px-4 py-3">
                      <div className="text-sm font-medium">Deletion-safe navigation</div>
                      <div className="text-xs text-muted-foreground">
                        After deleting a workspace, users are redirected to the first remaining
                        workspace — or the create-workspace flow if none exist.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="mx-auto w-full max-w-6xl px-6 pb-14">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold tracking-tight">What you can demo quickly</h2>
          <p className="max-w-2xl text-sm text-muted-foreground">
            A focused set of features that lets interviewers see real product behavior without
            wading through noise.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <Card key={f.title} className="relative overflow-hidden">
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="grid size-10 place-items-center rounded-xl border bg-card shadow-sm">
                      <Icon className="size-5 text-primary" />
                    </div>
                    <div className="space-y-0.5">
                      <CardTitle className="text-base">{f.title}</CardTitle>
                      <CardDescription className="text-sm">{f.description}</CardDescription>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-16">
        <div className="rounded-2xl border bg-card/60 p-8 shadow-sm backdrop-blur supports-backdrop-filter:bg-card/40">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold tracking-tight">A clear story in 60 seconds</h2>
              <p className="text-sm text-muted-foreground">
                This project is intentionally structured so you can explain the architecture
                quickly: auth → organizations → workspace routes → settings/members → data layer.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {steps.map((s, idx) => (
                <div
                  key={s.title}
                  className="rounded-xl border bg-background px-5 py-4 shadow-sm"
                >
                  <div className="text-xs font-semibold text-muted-foreground">
                    Step {idx + 1}
                  </div>
                  <div className="mt-1 text-sm font-medium">{s.title}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{s.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="mx-auto w-full max-w-6xl px-6 pb-10">
        <div className="flex flex-col items-start justify-between gap-4 border-t pt-6 sm:flex-row sm:items-center">
          <div className="text-sm text-muted-foreground">
            Kanboard <span className="text-foreground/70">v1</span> — built with Next.js, Better
            Auth, Prisma, and Tailwind.
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href="/auth/sign-in">Sign in</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/auth/sign-up">
                Sign up <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </footer>
    </main>
  );
}
