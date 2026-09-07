import { Link } from "@tanstack/react-router";
import { Github, Video } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border/70 bg-surface/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
              <Video className="size-4.5" />
            </span>
            <span className="font-display text-[15px] font-semibold uppercase tracking-[0.16em]">
              Video Calling
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Connect with anyone, anywhere. Secure, fast and reliable calls and chat — no downloads,
            no waiting rooms.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Product
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link to="/" className="text-foreground/80 hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link to="/meeting" className="text-foreground/80 hover:text-primary">
                New meeting
              </Link>
            </li>
            <li>
              <Link to="/chat" className="text-foreground/80 hover:text-primary">
                Chats
              </Link>
            </li>
            <li>
              <Link to="/signup" className="text-foreground/80 hover:text-primary">
                Create account
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Built by
          </h4>
          <a
            href="https://github.com/vinay-2203"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm text-foreground/80 hover:text-primary"
          >
            <Github className="size-4" /> Vinay Kumar
          </a>
        </div>
      </div>

      <div className="border-t border-border/70 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Video Calling. All rights reserved.
      </div>
    </footer>
  );
}
