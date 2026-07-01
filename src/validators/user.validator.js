import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
  }),
});