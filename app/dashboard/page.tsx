import { Suspense } from "react";
import { motion } from "framer-motion";
import { HeroTile } from "@/components/dashboard/HeroTile";
import { CourseGrid } from "@/components/dashboard/CourseGrid";
import { ActivityTile } from "@/components/dashboard/ActivityTile";
import { QuickStatsTile } from "@/components/dashboard/QuickStatsTile";
import { StaggerContainer } from "@/components/animations/MotionWrapper";
import { CourseCardSkeleton } from "@/components/ui/SkeletonCard";
import { SectionHeader } from "@/components/dashboard/SectionHeader";

export const dynamic = "force-dynamic";
export const revalidate = 60;

interface SearchParams {
  filter?: string;
  sort?: string;
}

export default function DashboardPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <section className="p-5 lg:p-8" aria-label="Learning dashboard">
      <SectionHeader />

      {/* Bento Grid */}
      <StaggerContainer
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-auto"
        stagger={0.07}
        delayChildren={0.05}
      >
        {/* Hero tile — spans 2 columns on desktop */}
        <div className="col-span-1 md:col-span-2 lg:col-span-2">
          <HeroTile name="Alex" streak={12} />
        </div>

        {/* Quick stats — spans 2 columns on desktop */}
        <div className="col-span-1 md:col-span-2 lg:col-span-2">
          <QuickStatsTile />
        </div>

        {/* Dynamic course cards from Supabase — each 1 col */}
        <Suspense
          key={`${searchParams.filter || ""}_${searchParams.sort || ""}`}
          fallback={
            <>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="col-span-1">
                  <CourseCardSkeleton />
                </div>
              ))}
            </>
          }
        >
          <CourseGridWrapper searchParams={searchParams} />
        </Suspense>

        {/* Activity graph — spans 2 cols */}
        <div className="col-span-1 md:col-span-2 lg:col-span-2">
          <ActivityTile />
        </div>
      </StaggerContainer>
    </section>
  );
}

// Wrapper to render course cards in grid columns
async function CourseGridWrapper({ searchParams }: { searchParams: SearchParams }) {
  const { getCourses } = await import("@/lib/supabase/queries");
  let courses = await getCourses();

  // 1. Filtering in-memory
  const filter = searchParams.filter;
  if (filter === "completed") {
    courses = courses.filter((c) => c.progress === 100);
  } else if (filter === "in-progress") {
    courses = courses.filter((c) => c.progress > 0 && c.progress < 100);
  }

  // 2. Sorting in-memory
  const sort = searchParams.sort;
  if (sort === "progress") {
    courses = [...courses].sort((a, b) => b.progress - a.progress);
  } else if (sort === "name") {
    courses = [...courses].sort((a, b) => a.title.localeCompare(b.title));
  } else {
    // Default to newest first
    courses = [...courses].sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());
  }

  if (courses.length === 0) {
    return (
      <div className="col-span-1 md:col-span-2 lg:col-span-4 flex flex-col items-center justify-center py-12 text-center rounded-2xl border border-border-subtle border-dashed">
        <p className="text-text-secondary text-sm mb-1">No courses found</p>
        <p className="text-text-muted text-xs">Create or seed the Supabase <code className="font-mono text-accent-violet">courses</code> table to see cards here.</p>
      </div>
    );
  }

  const { CourseCard } = await import("@/components/dashboard/CourseCard");

  return (
    <>
      {courses.map((course, i) => (
        <div key={course.id} className="col-span-1">
          <CourseCard course={course} index={i} />
        </div>
      ))}
    </>
  );
}
