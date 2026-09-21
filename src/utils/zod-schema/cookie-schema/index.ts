import z from "zod";

export const userDetailsCookieSchema = z.object({
  userId: z.string(),
  email: z.string(),
  fullName: z.string(),
  avatarUrl: z.string(),
  age: z.number(),
  role: z.enum(["basic", "admin"]),
  phone: z.string(),
});

export type TUserDetailsCookieSchema = z.infer<typeof userDetailsCookieSchema>;
