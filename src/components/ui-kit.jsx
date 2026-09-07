import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-primary text-primary-foreground hover:brightness-110 shadow-[0_10px_30px_-12px_oklch(0.78_0.13_191/0.8)]",
  accent: "bg-accent text-accent-foreground hover:brightness-110",
  success: "bg-success text-success-foreground hover:brightness-110",
  danger: "bg-destructive text-destructive-foreground hover:brightness-110",
  ghost: "bg-transparent text-foreground border border-border hover:bg-secondary",
  outline: "bg-secondary/40 text-foreground border border-border hover:bg-secondary",
};

const sizes = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  as: As = "button",
  ...props
}) {
  return (
    <As
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}

export function Panel({ className, ...props }) {
  return <div className={cn("panel p-6 sm:p-8", className)} {...props} />;
}

export function Field({ label, error, hint, className, ...props }) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </span>
      <input
        className={cn(
          "h-12 w-full rounded-xl border bg-background/60 px-4 text-[15px] text-foreground placeholder:text-muted-foreground/70 transition-colors focus:outline-none focus:ring-2 focus:ring-ring/60",
          error ? "border-destructive" : "border-input hover:border-ring/50",
        )}
        {...props}
      />
      {error ? (
        <span className="mt-1.5 block text-xs text-destructive">{error}</span>
      ) : hint ? (
        <span className="mt-1.5 block text-xs text-muted-foreground">{hint}</span>
      ) : null}
    </label>
  );
}

export function Eyebrow({ children, className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}
