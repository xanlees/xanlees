/* eslint-disable @typescript-eslint/naming-convention */
import * as z from "zod";

export const WorkExperienceSchema = z.object({
  work_experience: z
    .array(
      z.object({
        company: z.string().min(1, {
          message: "ກະລຸນາປ້ອນຊື່ບໍລິສັດ",
        }),
        position: z.string().min(1, {
          message: "ກະລຸນາປ້ອນຕໍາແໜ່ງ",
        }),
        time: z.string().min(1, {
          message: "ກະລຸນາລາຍະເວລາທີເຮັດວຽກ",
        }),
        salary: z.string().min(1, {
          message: "ກະລຸນາປ້ອນເງິນເດືອນ",
        }).transform((val) => Number(val.replace(/,/g, ""))),
        reasonOfResignation: z.string()?.nullable(),
        applicationId: z.number(),
      }),
    ),
}).transform((val) => {
  const workExperienceList = val.work_experience;
  return workExperienceList;
});
