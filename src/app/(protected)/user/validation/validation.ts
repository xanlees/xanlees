/* eslint-disable max-lines */
import * as z from "zod";
export const userSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().refine(
    (value) => {
      const uppercaseRegex = /[A-Z]/;
      const lowercaseRegex = /[a-z]/;
      const numberRegex = /[0-9]/;
      const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
      return (
        uppercaseRegex.test(value) && lowercaseRegex.test(value) && numberRegex.test(value) && specialCharRegex.test(value)
      );
    },
    {
      message:
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.",
    },
  ),
  isActive: z.union([z.string(), z.boolean()]),
  groups: z.array(z.string()),
});
