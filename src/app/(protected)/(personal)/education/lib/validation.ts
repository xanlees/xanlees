import * as z from "zod";

export const graduationSchema = z.object({
  education: z
    .array(
      z.object({
        branch: z.string(),
        graduationId: z.number(),
        profileId: z.number(),
        year: z.date().transform((value) => new Date(value).toISOString()),
      }),
    ),
}).transform((val) => {
  const listEducation = val.education;
  return listEducation;
});
