/* eslint-disable max-nested-callbacks */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import type { IProfile } from "../../../(career)/employee/interface";
import { FilterObjects } from "./useEmployee";

export function usePositionId(employees: IProfile[]) {
  const positionIds = employees.flatMap((profile) =>
    profile.employee.map((emp: { positionId: any }) => emp.positionId ?? 0),
  );
  return [...new Set(positionIds)];
}

export function filterSector({ sectorId }: { sectorId: number[] }): FilterObjects[] {
  const filters: FilterObjects[] = [];
  if (sectorId !== undefined) {
    filters.push({
      field: "id",
      operator: "eq",
      value: sectorId,
    });
  }
  return filters;
}

