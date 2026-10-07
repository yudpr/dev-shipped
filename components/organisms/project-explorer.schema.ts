import { z } from "zod";

export const searchParamsSchema = z.object({
  query: z
    .string()
    .trim()
    .max(100, "Search query is too long")
    .nullable()
    .optional(),
  sort: z
    .enum(["trending", "recent"])
    .optional()
    .catch("recent"), // Automatically falls back to 'recent' if a user modifies the URL manually
});

export const cursorSchema = z.object({
  id: z
    .number(),
  createdAt: z
    .coerce.date(),
  voteCount: z
    .number()
})

export type SearchParamsType = z.infer<typeof searchParamsSchema>
