import { useEffect, useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Menu, Video, X } from "lucide-react";
import { Button } from "@/components/ui-kit";
import { getToken } from "@/lib/api";

const links = [
  { to: "/", label: "Home" },
  { to: "/meeting", label: "New meeting" },
  { to: "/chat", label: "Chats" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    setSignedIn(!!getToken());
    setOpen(false);
  }, [pathname]);

  const signOut = () => {
    localStorage.removeItem("token");
    setSignedIn(false);
    navigate({ to: "/login" });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-5">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
            <Video className="size-4.5" />
          </span>
          <span className="font-display text-[15px] font-semibold uppercase tracking-[0.16em]">
            Video<span className="text-primary">Calling</span>
          </span>
        </Link>

        <div className="ml-6 hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`rounded-full px-4 py-2 text-sm transition-colors ${
                pathname === l.to
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="ml-auto hidden items-center gap-2 md:flex">
          {signedIn ? (
            <Button size="sm" variant="ghost" onClick={signOut}>
              Sign out
            </Button>
          ) : (
            <>
              <Button size="sm" variant="ghost" onClick={() => navigate({ to: "/login" })}>
                Log in
              </Button>
              <Button size="sm" onClick={() => navigate({ to: "/signup" })}>
                Sign up
              </Button>
            </>
          )}
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          className="ml-auto grid size-10 place-items-center rounded-xl border border-border md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-4.5" /> : <Menu className="size-4.5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border/70 px-5 pb-5 pt-3 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            {signedIn ? (
              <Button size="sm" variant="ghost" className="flex-1" onClick={signOut}>
                Sign out
              </Button>
            ) : (
              <>
                <Button
                  size="sm"
                  variant="ghost"
                  className="flex-1"
                  onClick={() => navigate({ to: "/login" })}
                >
                  Log in
                </Button>
                <Button size="sm" className="flex-1" onClick={() => navigate({ to: "/signup" })}>
                  Sign up
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
