import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

/** Slim progress bar shown while a route is loading. */
export default function RouteProgress() {
  const [mounted, setMounted] = useState(false);
  const isLoading = useRouterState({ select: (s) => s.status === "pending" });

  useEffect(() => setMounted(true), []);

  const active = mounted && isLoading;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-0.5 transition-opacity duration-300"
      style={{ opacity: active ? 1 : 0 }}
    >
      <div
        className="h-full w-full origin-left animate-progress"
        style={{ background: "var(--gradient-signal)" }}
      />
    </div>
  );
}
