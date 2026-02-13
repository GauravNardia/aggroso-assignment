import z from "zod";

export const extractSchema = z.object({
  transcript: z
    .string()
    .min(5, "Transcript must be at least 5 characters.")
})
