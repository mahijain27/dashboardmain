import { Suspense } from "react";
import { getCourses } from "@/lib/supabase/queries";
import { CourseCard } from "@/components/dashboard/CourseCard";
import { CourseCardSkeleton } from "@/components/ui/SkeletonCard";
import { BentoCard } from "@/components/ui/BentoCard";
import { BookOpen, GraduationCap, Search, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

export default function MyCoursesPage() {
  return (
    <section className="p-5 lg:p-8 max-w-7xl mx-auto" aria-label="My Courses">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display font-bold text-3xl md:text-4xl text-text-primary tracking-tight">
            My Courses
          </h1>
          <p className="text-text-secondary text-sm mt-1">
            Track and continue your learning journey across all enrolled subjects.
          </p>
        </div>
        
        {/* Course Statistics Quick Summary */}
        <div className="flex items-center gap-3 bg-bg-secondary/40 backdrop-blur-xl border border-border-subtle p-3 rounded-2xl shadow-card">
          <div className="w-10 h-10 rounded-xl bg-accent-violet/10 border border-accent-violet/20 flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-accent-violet" />
          </div>
          <div>
            <p className="text-text-muted text-[10px] font-mono uppercase tracking-wider">Overall Progress</p>
            <p className="text-text-primary text-sm font-bold">4 Active Courses</p>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column: Course Grid (spans 3 cols on desktop) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-bg-secondary/20 backdrop-blur-xl border border-border-subtle rounded-2xl">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="search"
                placeholder="Search courses..."
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-bg-elevated/40 border border-border-subtle text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-glow transition-all duration-200"
              />
            </div>
            
            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
              <button className="px-3 py-1.5 rounded-lg bg-accent-violet/20 border border-accent-violet/30 text-accent-violet text-xs font-semibold whitespace-nowrap">
                All
              </button>
              <button className="px-3 py-1.5 rounded-lg bg-bg-elevated/20 border border-border-subtle text-text-secondary hover:text-text-primary text-xs font-semibold whitespace-nowrap transition-colors duration-150">
                In Progress
              </button>
              <button className="px-3 py-1.5 rounded-lg bg-bg-elevated/20 border border-border-subtle text-text-secondary hover:text-text-primary text-xs font-semibold whitespace-nowrap transition-colors duration-150">
                Completed
              </button>
            </div>
          </div>

          {/* Courses List */}
          <Suspense
            fallback={
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <CourseCardSkeleton key={i} />
                ))}
              </div>
            }
          >
            <CoursesGrid />
          </Suspense>
        </div>

        {/* Right Column: Recommendations & Stats (1 col) */}
        <div className="space-y-6">
          <BentoCard className="p-5 flex flex-col justify-between h-auto gap-4">
            <div>
              <div className="w-9 h-9 rounded-xl bg-accent-violet/10 border border-accent-violet/20 flex items-center justify-center mb-4">
                <Sparkles className="w-4 h-4 text-accent-violet" />
              </div>
              <h3 className="font-display font-semibold text-lg text-text-primary">Recommended Course</h3>
              <p className="text-text-secondary text-xs mt-2 leading-relaxed">
                Unlock advanced skills with our newly released expert path:
              </p>
              
              <div className="mt-4 p-3 bg-bg-elevated/40 border border-border-subtle rounded-xl flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <BookOpen className="w-4 h-4 text-accent-blue" />
                </div>
                <div>
                  <h4 className="text-text-primary text-xs font-semibold">Intro to Next.js 14 App Router</h4>
                  <p className="text-text-muted text-[10px] mt-0.5">18 Modules • Advanced</p>
                </div>
              </div>
            </div>

            <button className="w-full mt-4 py-2.5 rounded-xl bg-gradient-to-r from-accent-violet to-accent-blue text-white text-xs font-bold shadow-glow hover:brightness-110 active:scale-[0.98] transition-all duration-150">
              Explore Course
            </button>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}

async function CoursesGrid() {
  const courses = await getCourses();

  if (courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center rounded-2xl border border-border-subtle border-dashed bg-bg-secondary/10">
        <p className="text-text-secondary text-sm mb-1">No courses found</p>
        <p className="text-text-muted text-xs">Configure your Supabase database to start displaying courses.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {courses.map((course, i) => (
        <CourseCard key={course.id} course={course} index={i} />
      ))}
    </div>
  );
}
