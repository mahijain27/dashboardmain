import { getCourses } from "@/lib/supabase/queries";
import { CourseCard } from "./CourseCard";
import { StaggerContainer } from "@/components/animations/MotionWrapper";

export async function CourseGrid() {
  const courses = await getCourses();

  if (courses.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
        <p className="text-text-secondary text-sm mb-1">No courses found</p>
        <p className="text-text-muted text-xs">Add some courses in your Supabase table to get started.</p>
      </div>
    );
  }

  return (
    <>
      {courses.map((course, i) => (
        <CourseCard key={course.id} course={course} index={i} />
      ))}
    </>
  );
}
