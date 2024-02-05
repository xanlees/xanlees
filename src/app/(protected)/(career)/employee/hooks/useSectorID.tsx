/* eslint-disable max-nested-callbacks */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import type { IProfile } from "../interface";

export function usePositionId(employees: IProfile[]) {
  const positionIds = employees.flatMap((profile) =>
    profile.employee.map((emp: { positionId: any }) => emp.positionId ?? 0),
  );
  return [...new Set(positionIds)];
}
