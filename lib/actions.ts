"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function addCourseAction(formData: {
  title: string;
  progress: number;
  iconName: string;
}) {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("courses")
      .insert([
        {
          title: formData.title,
          progress: formData.progress,
          icon_name: formData.iconName,
        },
      ]);

    if (error) {
      console.error("Supabase insert error:", error);
      return { success: false, error: error.message };
    }

    // Revalidate paths so Next.js fetches new data
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/courses");

    return { success: true };
  } catch (err: any) {
    console.error("Exception in addCourseAction:", err);
    return { success: false, error: err.message };
  }
}
