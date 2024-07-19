import * as z from "zod";

export const holidaySchema = z.object({
  name: z.string().min(2, {
    message: "ກະລຸນາໃສ່ຊື່ມື້ພັກ",
  }),
  date: z.array(z.string().min(1, {
    message: "ກະລຸນາເລືອກວັນ​ທີ",
  })),
  decription: z.string().min(2, {
    message: "ກະລຸນາໃສ່ລາຍລະອຽດມື້ພັກ",
  }),
  type: z.string().min(2, {
    message: "ກະລຸນາເລືອກປະເພດວັນພັກ",
  }),
});

export interface IHoliday {
  id: number
  name: string
  date: string[]
  decription: string
  type: string
}

export interface IHolidayExpand extends Omit<IHoliday, "id"> {
}
