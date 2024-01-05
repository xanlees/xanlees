/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import { useMany } from "@refinedev/core";
import type {
  IEmployee,
  IPersonalAddress,
} from "../interface";

export function usePersonalAddress(personalAddressId: number[], employees: IEmployee[]): { data: any } {
  return useMany<IPersonalAddress>({
    resource: "personal_address",
    ids: personalAddressId,
    queryOptions: {
      enabled: employees.length > 0,
    },
  });
}
