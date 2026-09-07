import { cn } from "@/lib/utils";

export function Skeleton({ className }) {
  return <div className={cn("skeleton rounded-xl", className)} />;
}

export function Spinner({ className }) {
  return (
    <span
      className={cn(
        "inline-block size-4 animate-spin rounded-full border-2 border-current border-t-transparent",
        className,
      )}
    />
  );
}

export function ListSkeleton({ rows = 4 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="panel flex items-center gap-4 p-4">
          <Skeleton className="size-12 rounded-2xl" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3.5 w-1/3" />
            <Skeleton className="h-3 w-1/5" />
          </div>
          <Skeleton className="h-9 w-24 rounded-full" />
        </div>
      ))}
    </div>
  );
}
