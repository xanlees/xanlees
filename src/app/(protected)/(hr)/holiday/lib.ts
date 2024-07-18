import * as z from "zod";
import { type IBranch } from "@career";

export const holidaySchema = z.object({
  holidayName: z.string().min(2, {
    message: "ກະລຸນາໃສ່ຊື່ມື້ພັກ",
  }),
  holidayDate: z.array(z.date().or(z.string()).refine((value) => value != null && value !== "", {
    message: "ກະລຸນາເລືອກວັນ​ເດືອນ​ປີ​ເກີດ",
  })),
  description: z.string().optional(),
  type: z.string().min(2, {
    message: "ກະລຸນາເລືອກປະເພດວັນພັກ",
  }),
});

export interface IHoliday {
  id: number
  branch: number
  holidayName: string
  holidayDate: string[]
  description: string
  type: string
}

export interface IHolidayExpand extends Omit<IHoliday, "branch"> {
  branch: IBranch
}
