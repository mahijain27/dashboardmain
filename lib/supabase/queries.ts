import { createClient } from "./server";
import type { Course } from "@/types/database";

export async function getCourses(): Promise<Course[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Supabase error fetching courses:", JSON.stringify(error));
      // If table is missing or any other error, return empty list so UI can render fallback.
      return [];
    }

    return data ?? [];
  } catch (err) {
    console.error("Unexpected exception fetching courses:", err);
    return [];
  }
}
