import type { IProfile } from "../interface";

export function usePositionId(employees: IProfile[]) {
  console.log("positionId", employees);
  const positionIds = employees.flatMap((profile) =>
    profile.employee.map((emp: { positionId: any; }) => emp.positionId ?? 0)
  );
  return [...new Set(positionIds)];
}
