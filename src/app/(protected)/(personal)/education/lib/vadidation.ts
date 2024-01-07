import * as z from "zod";

export const graduationSchema = z.object({
  education: z.object({
    branch: z.string(),
    profileId: z.number(),
    graduationId: z.number(),
    year: z.date().transform((value) => new Date(value).toISOString()),
  }),
});

export const sObjectMetadataSchema = z
  .array(graduationSchema.or(graduationSchema.array()))
  .transform((rel) => {
    console.log("rel", rel);
    return Array.isArray(rel) ? rel : [rel];
  });
