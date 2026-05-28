import { cn } from "@/components/utils/cn";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn("skeleton rounded-lg", className)}
      aria-hidden="true"
    />
  );
}

export function CourseCardSkeleton() {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-border-subtle bg-bg-secondary p-5 lg:p-6">
      <div className="flex items-start justify-between mb-4">
        <Skeleton className="w-10 h-10 rounded-xl" />
        <Skeleton className="w-12 h-5 rounded-full" />
      </div>
      <Skeleton className="h-5 w-3/4 mb-2 rounded-lg" />
      <Skeleton className="h-3.5 w-1/2 mb-6 rounded-lg" />
      <Skeleton className="h-1.5 w-full rounded-full mb-2" />
      <div className="flex justify-between">
        <Skeleton className="h-3 w-16 rounded-md" />
        <Skeleton className="h-3 w-8 rounded-md" />
      </div>
    </article>
  );
}

export function HeroTileSkeleton() {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-border-subtle bg-bg-secondary p-6 lg:p-8">
      <Skeleton className="h-4 w-32 rounded-lg mb-3" />
      <Skeleton className="h-9 w-56 rounded-xl mb-2" />
      <Skeleton className="h-4 w-48 rounded-lg mb-8" />
      <div className="flex gap-4">
        <Skeleton className="h-14 w-28 rounded-xl" />
        <Skeleton className="h-14 w-28 rounded-xl" />
        <Skeleton className="h-14 w-28 rounded-xl" />
      </div>
    </article>
  );
}

export function ActivityTileSkeleton() {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-border-subtle bg-bg-secondary p-5 lg:p-6">
      <Skeleton className="h-5 w-36 rounded-lg mb-6" />
      <div className="grid grid-cols-[repeat(20,1fr)] gap-1">
        {Array.from({ length: 140 }).map((_, i) => (
          <Skeleton key={i} className="aspect-square rounded-sm" />
        ))}
      </div>
    </article>
  );
}
