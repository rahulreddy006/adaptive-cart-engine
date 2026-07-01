import { z } from "zod";

export const addItemSchema = z.object({
  headers: z.object({
    "x-user-id": z.string(),
  }),
  body: z.object({
    productId: z.string().min(1),
    name: z.string().min(2),
    price: z.number().positive(),
    quantity: z.number().int().positive(),
    category: z.string().min(2),
  }),
});