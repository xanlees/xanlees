import * as z from "zod";

export const formSchema = z.object({
  test: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  test1: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});
