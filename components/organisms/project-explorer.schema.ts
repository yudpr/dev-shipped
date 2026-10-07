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
    .date(), // Server action is not just a mere function. It is a post method that looks like a function. Behind the scene, server action serializes the JS Object with React's Flight Protocol, not JSON, and React restores the original JS object on the other side. For example, a Date arrives. as a Date. If you had a Zod error means the value did not come through the flight payload such as a URL param, JSON.parse, a non-React caller. Zod '.coerce' hides that and widens the schema to accept strings.
  voteCount: z
    .number()
})
  .nullish()

export type SearchParamsType = z.infer<typeof searchParamsSchema>
