import * as z from "zod";

export const graduationSchema = z.object({
  degree: z.string().min(1, {
    message: "Degree must be at least 1 character.",
  }),
  sector: z.string().min(1, {
    message: "Sector must be at least 1 character.",
  }),
});
