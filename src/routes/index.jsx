import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  GraduationCap,
  HeartPulse,
  Landmark,
  Factory,
  ShoppingBag,
  Banknote,
  ShieldCheck,
  Zap,
  Smartphone,
  Layers,
  Server,
  Clock,
} from "lucide-react";
import heroImage from "@/assets/hero-call.jpg";
import { Button, Eyebrow } from "@/components/ui-kit";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Video Calling — Crystal Clear Calls & Real-Time Chat" },
      {
        name: "description",
        content:
          "Instant, secure video meetings and real-time chat. Create a room, share the link and go live in one click — no downloads, no delays.",
      },
      { property: "og:title", content: "Video Calling — Crystal Clear Calls & Real-Time Chat" },
      {
        property: "og:description",
        content:
          "Instant, secure video meetings and real-time chat. Create a room, share the link and go live in one click.",
      },
    ],
  }),
  component: Home,
});

const reasons = [
  { icon: ShieldCheck, title: "Secure communication", text: "Peer-to-peer media with encrypted signalling." },
  { icon: Zap, title: "Fast connection setup", text: "Rooms spin up instantly — no lobby, no waiting." },
  { icon: Smartphone, title: "Mobile & desktop", text: "One link works everywhere, on any browser." },
  { icon: Layers, title: "Scalable solutions", text: "From a 1:1 catch-up to a full team session." },
  { icon: Server, title: "Reliable infrastructure", text: "Resilient signalling with automatic recovery." },
  { icon: Clock, title: "24/7 availability", text: "Always-on rooms whenever your people are." },
];

const industries = [
  { icon: GraduationCap, label: "Education", text: "Real-time classrooms for schools and universities." },
  { icon: Banknote, label: "Financial services", text: "Private advisory calls with a clear audit trail." },
  { icon: Landmark, label: "Government", text: "Accessible public sessions at national scale." },
  { icon: HeartPulse, label: "Healthcare", text: "Secure consultations and patient care from anywhere." },
  { icon: Factory, label: "Manufacturing", text: "Floor-to-office coordination without the travel." },
  { icon: ShoppingBag, label: "Retail", text: "Live shopping and support that feels in-store." },
];

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-grid">
        <div
          className="pointer-events-none absolute -top-40 left-1/2 size-[42rem] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
          style={{ background: "var(--gradient-signal)" }}
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <Eyebrow>
              <span className="size-1.5 rounded-full bg-success" /> Live in one click
            </Eyebrow>
            <h1 className="mt-6 text-4xl leading-[1.05] font-bold sm:text-5xl lg:text-6xl">
              Crystal clear <span className="text-gradient">video calling</span> for everyone.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Connect instantly with friends, family or clients across the globe. Join meetings,
              host sessions and catch up with unmatched clarity — no downloads, no delays.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button as={Link} to="/meeting" size="lg">
                Start a meeting <ArrowRight className="size-4" />
              </Button>
              <Button as={Link} to="/chat" size="lg" variant="ghost">
                Open chats
              </Button>
            </div>
            <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-7">
              {[
                ["1 click", "to go live"],
                ["HD", "audio & video"],
                ["24/7", "availability"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="font-display text-2xl font-semibold text-foreground">{k}</dt>
                  <dd className="mt-1 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="panel overflow-hidden p-2 glow">
              <img
                src={heroImage}
                alt="Video call tiles glowing in a dark room"
                width={1280}
                height={1024}
                className="w-full rounded-[calc(var(--radius)+4px)] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="max-w-2xl">
          <Eyebrow>Why choose us</Eyebrow>
          <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
            Seamless, secure and lightning fast.
          </h2>
          <p className="mt-4 text-muted-foreground">
            No lag, no drops — just a pure connection across devices and platforms.
          </p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="panel p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="grid size-10 place-items-center rounded-xl bg-primary/12 text-primary ring-1 ring-primary/25">
                <Icon className="size-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Industries */}
      <section className="border-y border-border/70 bg-surface/40">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-xl">
              <Eyebrow>Built for every team</Eyebrow>
              <h2 className="mt-5 text-3xl font-bold sm:text-4xl">Where people use it</h2>
            </div>
            <Button as={Link} to="/signup" variant="outline">
              Create free account
            </Button>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map(({ icon: Icon, label, text }) => (
              <div
                key={label}
                className="group rounded-2xl border border-border bg-background/40 p-6 transition-colors hover:border-primary/40"
              >
                <div className="flex items-center gap-3">
                  <Icon className="size-5 text-accent" />
                  <h3 className="font-display text-base font-semibold">{label}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="panel relative overflow-hidden p-10 text-center sm:p-16">
          <div
            className="pointer-events-none absolute inset-x-0 -bottom-24 h-56 opacity-25 blur-3xl"
            style={{ background: "var(--gradient-signal)" }}
          />
          <h2 className="relative text-3xl font-bold sm:text-4xl">Ready when you are.</h2>
          <p className="relative mx-auto mt-4 max-w-lg text-muted-foreground">
            Spin up a room, copy the link, and you're talking in seconds.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <Button as={Link} to="/meeting" size="lg">
              New meeting <ArrowRight className="size-4" />
            </Button>
            <Button as={Link} to="/login" size="lg" variant="ghost">
              Log in
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
