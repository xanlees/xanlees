"use client";
import { useMany } from "@refinedev/core";
import { type IProfile, type IPersonalAddress } from "../../interface/model";

export function usePersonalAddressDetail(personalAddressId: number[], employees: IProfile[]): { data: any } {
  return useMany<IPersonalAddress>({
    resource: "personal_address",
    ids: personalAddressId,
    queryOptions: {
      enabled: employees.length > 0,
    },
  });
}
