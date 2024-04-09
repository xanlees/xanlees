"use client";

import { type IProfile } from "../../interface/model";

export function useLatestPositionId(profile: IProfile[]) {
  const latestPosition = profile.map((item: IProfile) => findLatestPosition(item));
  return latestPosition;
}

function findLatestPosition(item: IProfile) {
  const latestEmployee = item.employee.find((emp) => emp.isLatest);
  if (latestEmployee) {
    return latestEmployee.positionId;
  }
  if (!latestEmployee) {
    return item.employee?.[0]?.positionId;
  }
  return [];
}
