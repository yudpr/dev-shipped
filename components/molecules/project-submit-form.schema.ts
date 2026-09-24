import z from "zod";

export const formSchema = z.object({
  name: z 
    .string()
    .min(3, "Project Name must be at least 3 characters")
    .max(100, "Project Name must be at most 100"),
  slug: z 
    .string()
    .min(3, "Slug must be at least 3 characters")
    .max(100, "Slug must be at most 100")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "Slug must be lowercase alphanumeric characters separated by single hyphens, without leading or trailing dashes",
    }),
  tagline: z 
    .string()
    .min(5, "Tagline must be at least 5 characters")
    .max(280, "Tagline must be at most 280"),
  description: z 
    .string()
    .min(5, "Description must be at least 5 characters")
    .max(5000, "Description must be at most 5000"),
  websiteUrl: z
    .string(),
  tags: z
    .array(z.string().min(1).max(20))
    .min(1, "Please add at least one tag")
    .max(10, "You can only choose up to 10 tags")
})
