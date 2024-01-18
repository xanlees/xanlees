import * as z from "zod";

export const WorkExperienceSchema = z.object({
  company: z.string(),
  position: z.string(),
  time: z.string(),
  salary: z.string(),
  reasonOfResignation: z.string(),
  applicationId: z.number(),
});
