import * as z from "zod";
export const PhysicalProfileSchema = z.object({
  nationality: z.string().min(1, {
    message: "ກະລຸນາປ້ອນສັນຊາດ",
  }),
  height: z.string().min(1, {
    message: "ກະລຸນາປ້ອນລວງສູງ",
  }),
  weight: z.string().min(1, {
    message: "ກະລຸນາປ້ອນນໍ້າຫນັກ",
  }),
  profileId: z.number(),
});
