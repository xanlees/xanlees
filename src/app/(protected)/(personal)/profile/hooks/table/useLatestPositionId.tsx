"use client";
import type { IProfile } from "../../../../(career)/employee/interface";

export function useLatestPositionId(profile: IProfile[]) {
  const latestPosition = profile.map((item: IProfile) => findLatestPosition(item));
  return latestPosition;
}
function findLatestPosition(item: IProfile) {
  const latestEmployee = item.employee.find((emp) => emp.isLatest);
  return (latestEmployee !== undefined) ? latestEmployee.positionId : 0;
}
