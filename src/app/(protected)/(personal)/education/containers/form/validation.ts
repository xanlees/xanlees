import * as z from "zod";

const yearLength = 4;

export const graduationSchema = z.object({
  education: z
    .array(
      z.object({
        branch: z.string(),
        graduationId: z.number(),
        profileId: z.number(),
        year: z.string(),
        // .length(yearLength).transform((value) => {
        //   const year = parseInt(value, 10);
        //   if (!isNaN(year)) {
        //     const date = new Date(Date.UTC(year, 0, 1));
        //     console.log(date.toISOString())
        //     return date.toISOString();
        //   }
        //   throw new Error("Invalid Year");
        // }),
      }).transform((val) => {console.log(val);  return val; }),
    ),
}).transform((val) => {
  const listEducation = val.education;
  return listEducation;
});
