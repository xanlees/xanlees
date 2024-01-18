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
