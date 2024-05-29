import * as z from "zod";

export const holidaySchema = z.object({
  holidayName: z.string().min(2, {
    message: "ກະລຸນາໃສ່ຊື່ມື້ພັກ",
  }),
  holidayDate: z.array(z.string().min(1, {
    message: "ກະລຸນາເລືອກວັນ​ທີ",
  })),
});

export interface IHoliday {
  id: number
  holidayName: string
  holidayDate: string[]
}

