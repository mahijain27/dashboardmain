import {
  HeroTileSkeleton,
  CourseCardSkeleton,
  ActivityTileSkeleton,
  Skeleton,
} from "@/components/ui/SkeletonCard";

export default function DashboardLoading() {
  return (
    <section
      className="p-5 lg:p-8"
      aria-label="Loading dashboard content"
      aria-busy="true"
    >
      {/* Section header skeleton */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <Skeleton className="h-4 w-24 rounded-lg mb-2" />
          <Skeleton className="h-7 w-40 rounded-xl" />
        </div>
        <Skeleton className="h-8 w-28 rounded-xl" />
      </div>

      {/* Bento grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-auto">
        {/* Hero */}
        <div className="col-span-1 md:col-span-2 lg:col-span-2">
          <HeroTileSkeleton />
        </div>

        {/* Stats */}
        <div className="col-span-1 md:col-span-2 lg:col-span-2">
          <div className="rounded-2xl border border-border-subtle bg-bg-secondary p-5 lg:p-6">
            <Skeleton className="h-4 w-24 rounded-lg mb-4" />
            <div className="grid grid-cols-2 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="p-3 rounded-xl bg-bg-elevated border border-border-subtle">
                  <Skeleton className="h-7 w-7 rounded-lg mb-2" />
                  <Skeleton className="h-6 w-10 rounded-lg mb-1" />
                  <Skeleton className="h-3 w-16 rounded-md" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Course cards */}
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="col-span-1">
            <CourseCardSkeleton />
          </div>
        ))}

        {/* Activity */}
        <div className="col-span-1 md:col-span-2 lg:col-span-2">
          <ActivityTileSkeleton />
        </div>
      </div>
    </section>
  );
}
