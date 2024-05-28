import * as z from "zod";

interface HolidayProps {
  holidayName: string
  startDate: string | Date
  endDate: string | Date
}

export const holidaySchema = z.object({
  holidayName: z.string().min(2, {
    message: "ກະລຸນາໃສ່ຊື່ມື້ພັກ",
  }),
  startDate: z.date().or(z.string()).refine((value) => {
    return value != null && value !== "";
  }, { message: "ກະລຸນາໃສ່ວັນທີ່ເລີ່ມຕົ້ນ" }),
  endDate: z.date().or(z.string()).refine((value) => {
    return value != null && value !== "";
  }, { message: "ກະລຸນາໃສ່ວັນທີ່ສິ້ນສຸດ" }),
}).refine((value) => {
  const endDate = new Date(value.endDate);
  const startDate = new Date(value.startDate);
  return endDate >= startDate;
}, {
  message: "ວັນທີ່ສິ້ນສຸດຕ້ອງເທົ່າກັນຫລືໃຫຍ່ກວ່າວັນທີ່ເລີ່ມຕົ້ນ",
  path: ["endDate"],
}).transform((val) => {
  return transformDate(val);
});

function transformDate(val: HolidayProps): Record<string, any> {
  if (val.startDate instanceof Date) {
    val.startDate = val.startDate.toISOString();
  }
  if (val.endDate instanceof Date) {
    val.endDate = val.endDate.toISOString();
  }
  return val;
}
