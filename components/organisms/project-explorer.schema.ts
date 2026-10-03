import { z } from "zod";

export const searchParamsSchema = z.object({
  query: z
    .string()
    .trim()
    .max(100, "Search query is too long")
    .nullable()
    .transform(val => val === "" ? undefined : val),
  sort: z
    .enum(["trending", "recent"])
    .catch("recent"), // Automatically falls back to 'recent' if a user modifies the URL manually
});

export type SearchParamsType = z.infer<typeof searchParamsSchema>