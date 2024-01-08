import * as z from "zod";

export const personalAddressSchema = z.object({
  bornDistrictId: z.number().min(0, {
    message: "Born District ID must be a non-negative number.",
  }),
  currentDistrictId: z.number().min(0, {
    message: "Current District ID must be a non-negative number.",
  }),
  bornVillage: z.string().min(1, {
    message: "Born Village must be at least 1 character.",
  }),
  currentVillage: z.string().min(1, {
    message: "Current Village must be at least 1 character.",
  }),
});

export const graduationSchema = z.object({
  degree: z.string().min(1, {
    message: "Degree must be at least 1 character.",
  }),
  sector: z.string().min(1, {
    message: "Sector must be at least 1 character.",
  }),
});

export const educationSchema = z.object({
  profileId: z.number().min(0, {
    message: "Profile ID must be a non-negative number.",
  }),
  graduationId: z.number().min(0, {
    message: "Graduation ID must be a non-negative number.",
  }),
  branch: z.string().min(1, {
    message: "Branch must be at least 1 character.",
  }),
  sector: z.string().min(1, {
    message: "Sector must be at least 1 character.",
  }),
  year: z.string().refine(
    (value) => {
      const date = new Date(value);
      return !isNaN(date.getTime());
    },
    {
      message: "Invalid year format. It should be a valid date string.",
    },
  ),
});

export const employeeSchema = z.object({
  positionId: z.number().min(1, {
    message: "positionId ID must be a non-negative number.",
  }),
  joiningDate: z.date().transform((value) => (new Date(value)).toISOString()),
  isLatest: z.boolean().default(true),
  profileId: z.number(),
});
