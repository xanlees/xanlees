import * as z from "zod";
import { validateDateRangeDateSchema } from "@src/common/lib/validation/validationFormUtils";

export const holidaySchema = z.object({
  holidayName: z.string().min(2, {
    message: "ກະລຸນາໃສ່ຊື່ມື້ພັກ",
  }),
  holidayDate: validateDateRangeDateSchema({ required: true, message: "ກະລຸນາເລືອກວັນ​ເດືອນ​ປີ​ພັກ" }),
  description: z.string().min(2, {
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
