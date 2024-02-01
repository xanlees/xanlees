import * as z from "zod";

export const employeeSchema = z.object({
  employee: z
    .array(
      z.object({
        positionId: z.number(),
        profileId: z.string(),
        isLatest: z.boolean().default(false),
        joiningDate: z.date().transform((value) => new Date(value).toISOString()),
      }),
    ),
}).transform((val) => {
  const listEmployee = val.employee;
  return listEmployee;
});
