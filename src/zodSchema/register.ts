import z from "zod";

export const registerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  phone: z.string().min(11),
});

export type User = z.infer<typeof registerSchema>;
