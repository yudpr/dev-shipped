"use server";

import { type ProjectSubmitFormData } from "@/components/molecules/project-submit-form";

type ActionResult =
  | { success: true, message?: string, data?: Record<string, unknown> }
  | { success: false, error: string }

export const addProjectAction = async (data: ProjectSubmitFormData): Promise<ActionResult> => {
  await new Promise(resolve => setTimeout(resolve, 5000));
  console.log(JSON.stringify(data))
  return {
    success: true,
    message: "Project added successfully"
  }
}