/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import { useMany } from "@refinedev/core";
import type {
  IEmployee,
  ISector,
} from "../interface";

export function useSector(sectorId: number[], employees: IEmployee[]): { data: any } {
  return useMany<ISector>({
    resource: "sector",
    ids: sectorId,
    queryOptions: {
      enabled: employees.length > 0,
    },
  });
}
