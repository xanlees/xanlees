"use client";
import type { IProfile } from "../../../(career)/employee/interface";

export function useCurrentAddressID(employees: IProfile[]) {
  return employees.map((item) => item?.personalAddressId?.id !== undefined ? item.personalAddressId?.id : 0,
  );
}
