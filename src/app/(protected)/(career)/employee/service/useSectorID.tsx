/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import type { IEmployee } from "../interface";

export function useSectorID(employees: IEmployee[]) {
  return employees.map((item) => item?.positionDetail?.sectorId !== undefined ? item.positionDetail.sectorId : 0,
  );
}
