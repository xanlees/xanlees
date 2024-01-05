/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import type { IEmployee } from "../interface";

export function useCurrentAddressID(employees: IEmployee[]) {
  return employees.map((item) => item?.profileDetail?.personalAddressId !== undefined ? item.profileDetail.personalAddressId : 0,
  );
}
