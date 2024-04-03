import * as z from "zod";
export const PhysicalProfileSchema = z.object({
  nationality: z.string().min(1, {
    message: "ກະລຸນາປ້ອນສັນຊາດ",
  }),
  height: z.string().or(z.undefined()).transform((value) => { return value && value !== "" ? parseInt(value, 10) : null; }),
  weight: z.string().or(z.undefined()).transform((value) => value && value !== "" ? parseInt(value, 10) : null),
  profileId: z.number(),
});
