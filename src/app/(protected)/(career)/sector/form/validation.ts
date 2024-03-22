import * as z from "zod";

export const sectorSchema = z.object({
  branchId: z.number().min(1, {
    message: "branchId  ID must be a valid positive number.",
  }),
  name: z.string().min(2, {
    message: "Sector Detail Name must be at least 2 characters.",
  }),
});
