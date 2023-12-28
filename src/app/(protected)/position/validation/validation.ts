import * as z from "zod";

export const positionSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  id: z.number().min(1, {
    message: "ID must be a valid positive number.",
  }),
  sectorId: z.number().min(1, {
    message: "Sector ID must be a valid positive number.",
  }),
});

export const sectorSchema = z.object({
  id: z.number().min(1, {
    message: "Sector  ID must be a valid positive number.",
  }),
  name: z.string().min(2, {
    message: "Sector Detail Name must be at least 2 characters.",
  }),
});

export const branchSchema = z.object({
  id: z.number().min(1, {
    message: "Branch Detail ID must be a valid positive number.",
  }),
  name: z.string().min(2, {
    message: "Branch Detail Name must be at least 2 characters.",
  }),
});
