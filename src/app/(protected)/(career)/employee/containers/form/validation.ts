import * as z from "zod";

export const employeeSchema = z.object({
  employee: z
    .array(
      z.object({
        positionId: z.number().min(1, {
          message: "ກະລຸນາເລືອກຕໍາແໜ່ງ",
        }),
        profileId: z.string().min(1, {
          message: "ກະລຸນາສ້າງໂປຣໄຟລກ່ອນ",
        }),
        isLatest: z.boolean().default(false),
        joiningDate: z.date().transform((value) => new Date(value).toISOString()),
      }),
    ),
}).transform((val) => {
  const listEmployee = val.employee;
  return listEmployee;
});
