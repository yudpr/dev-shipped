"use server";

import { type ProjectSubmitFormData } from "@/components/molecules/project-submit-form";
import { formSchema } from "@/components/molecules/project-submit-form.schema";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";

type ActionResult =
  | { success: true, message?: string, data?: Record<string, unknown> }
  | { success: false, error: string }

export const addProjectAction = async (data: ProjectSubmitFormData): Promise<ActionResult> => {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { success: false, error: "You must be signed-in to submit." }
    }

    const validatedData = formSchema.safeParse(data)

    if (!validatedData.success) {
      return { success: false, error: "Validation Error:" + validatedData.error.issues.map(i => i.message).join("; ") + "." }
    }
    await db.insert(projects).values({ 
      ...validatedData.data, 
      userId
    })

    return { success: true, message: "Project submitted successfully. Your project will be reviewed shortly." }
  } catch(error) {
    console.log(error)
    return { success: false, error: "Failed to submit project." }
  }
}

/**
 * Live checking lives in client component so it needs to live as
 * server action then will be imported to client component. Live
 * check should not be cached, so no 'use cache' is used.
 */
export const checkSlugAvailability = async (slug: string): Promise<ActionResult> => {
  const value = "testtest"
  console.log(slug)
  if (slug !== value) {
    return {
      success: false,
      error: "Slug is not available"
    }
  }

  return {
    success: true,
    data: {
      slug: value
    }
  }
}
