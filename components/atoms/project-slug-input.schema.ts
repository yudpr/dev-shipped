import z from "zod";
import slugify from "slugify"

export const slugSchema = z.object({
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .max(100, "Slug must be at most 100")
    .transform((value) => 
      slugify(value, { lower: true, strict: true, trim: true })
    )
})
