import * as z from "zod";
export const personalAddressSchema = z.object({
  bornDistrictId: z.number().min(0, {
    message: "ກະລຸນາເລືອກເມືອງເກິດ",
  }),
  currentDistrictId: z.number().min(0, {
    message: "ກະລຸນາເລືອກເມືອງຢູ່ປະຈຸບັນ",
  }),
  bornVillage: z.string().min(1, {
    message: "ກະລຸນາປ້ອນຊື່ບ້ານເກິດ",
  }),
  currentVillage: z.string().min(1, {
    message: "ກະລຸນາເລືອກເມືອງຢູ່ປະຈຸບັນ",
  }),
});
