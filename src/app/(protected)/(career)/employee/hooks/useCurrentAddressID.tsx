"use client";
import type { IProfile } from "../interface";

export function useCurrentAddressID(employees: IProfile[]) {
  return employees.map((item) => item?.personalAddressId !== undefined ? item.personalAddressId : 0,
  );
}
