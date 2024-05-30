import * as z from "zod";
import { type IBranch } from "@career";

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
  branch: number
  holidayName: string
  holidayDate: string[]
}

export interface IHolidayExpand extends Omit<IHoliday, "branch"> {
  branch: IBranch
}
