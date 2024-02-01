"use client";
import { useMany } from "@refinedev/core";
import type {
  IEmployee,
  IPersonalAddress,
  IProfile,
} from "../interface";

export function usePersonalAddress(personalAddressId: number[], employees: IProfile[]): { data: any } {
  return useMany<IPersonalAddress>({
    resource: "personal_address",
    ids: personalAddressId,
    queryOptions: {
      enabled: employees.length > 0,
    },
  });
}
