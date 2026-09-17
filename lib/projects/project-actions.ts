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