import * as z from "zod";

export const branchSchema = z.object({
  name: z.string().min(2, {
    message: "Branch Detail Name must be at least 2 characters.",
  }),
});

export const positionSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  sectorId: z.number().min(1, {
    message: "Sector ID must be a valid positive number.",
  }),
});
