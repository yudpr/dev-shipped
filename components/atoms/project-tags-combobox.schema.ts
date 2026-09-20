import z from "zod";

export const optionsSchema = z.object({
  options: z
    .array(z
      .string()
      .trim()
      .min(1, "Tag cannot be empty")
      .max(20, "Tag is too long")
    )
    .refine(
      (items) => new Set(items).size === items.length, 
      { message: "All items must be unique" }
    )
})
