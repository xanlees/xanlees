import * as z from "zod";

interface Education {
  branch: string
  graduationId: number
  year: string
  profileId: number
}

export const graduationSchema = z.object({
  education: z
    .array(
      z.object({
        branch: z.string(),
        graduationId: z.number(),
        profileId: z.number(),
        year: z.date().transform((value) => new Date(value).toISOString()),
      }),
    )
    .transform((val: Education[]) => {
      console.log("val", val);
      return val;
    }),
  // .transform((rel): { education: Education[] } => {
  //   console.log("rel", rel)
  //   const newValue = rel.map(mapEducation);
  //   console.log("newValue", rel)
  //   return newValue;
  // }),
});

const mapEducation = ({ branch, graduationId, year, profileId }: Education) => ({
  year,
  branch,
  profileId,
  graduationId,
});

// export const sObjectMetadataSchema = z
//   .array(graduationSchema.or(graduationSchema.array()))
//   .transform((rel) => {
//     console.log("rel", rel);
//     return Array.isArray(rel) ? rel : [rel];
//   });
