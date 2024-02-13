import type { IEmployee } from "../../../(career)/employee/interface";
export function usePositionId(employees: IEmployee[]) {
  const positionIds: number[] = employees?.map((employee) =>
    employee?.positionId?.sectorId ?? 0,
  );
  const uniquePositionIds: number[] = [...new Set(positionIds)].filter((id) => id !== 0);
  return uniquePositionIds;
}
