"use server";

import { type ProjectSubmitFormData } from "@/components/molecules/project-submit-form";
import { formSchema } from "@/components/molecules/project-submit-form.schema";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

type ActionResult =
  | { success: false, error: string }
  | { 
      success: true, 
      message?: string, 
      data?: {
        isSlugAvailable?: boolean
      }
    }

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
    console.error(error)
    return { success: false, error: "Failed to submit project." }
  }
}

/**
 * Live checking lives in client component so it needs to live as
 * server action then will be imported to client component. Live
 * check should not be cached, so no 'use cache' is used.
 */
export const checkSlugAvailability = async (slug: string): Promise<ActionResult> => {
  const validatedSlug = formSchema.pick({ slug: true }).safeParse({ slug })
  if (!validatedSlug.success) {
    return { success: false, error: validatedSlug.error.issues.map(i => i.message).join("; ") + "." }
  }
  try {
    const result = await db
      .select({ id: projects.id })
      .from(projects)
      .where(eq(projects.slug, validatedSlug.data.slug))
      .limit(1)

    return { success: true, data: { isSlugAvailable: result.length === 0 } }
  } catch (error) {
    console.error(error)
    return { success: false, error: "Database exception occured."}
  }
}
