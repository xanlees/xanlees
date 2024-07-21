import * as z from "zod";
import { validateDateRangeDateSchema } from "@src/common/lib/validation/validationFormUtils";
import { type IBranch } from "@career";

export const holidaySchema = z.object({
  name: z.string().min(2, {
    message: "ກະລຸນາໃສ່ຊື່ມື້ພັກ",
  }),
  // date: validateDateRangeDateSchema({ required: true, message: "ກະລຸນາເລືອກວັນ​ເດືອນ​ປີ​ພັກ" }),
  decription: z.string().min(2, {
    message: "ກະລຸນາໃສ່ລາຍລະອຽດມື້ພັກ",
  }),
  type: z.string().min(2, {
    message: "ກະລຸນາເລືອກປະເພດວັນພັກ",
  }),
});

const branchHolidaySchema = z.object({
  holiday: z.number().min(1, { message: "ກະລຸນາເລືອກວັນພັກ" }),
  branch: z.number().min(1, { message: "ກະລຸນາເລືອກສາຂາ" }),
});

export const getbranchHolidaySchema = ({ action = "create" }: { action?: "create" | "edit" }) => {
  if (action === "create") {
    return z.object({
      holidayBranch: z.array(branchHolidaySchema),
    }).transform((val) => {
      return val.holidayBranch;
    });
  }
  return branchHolidaySchema;
};

export interface IHoliday {
  id: number
  branch: number
  name: string
  date: string[]
  decription: string
  type: string
}

export interface IHolidayExpand extends Omit<IHoliday, "branch"> {
  branch: IBranch
}
