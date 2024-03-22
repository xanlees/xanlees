import { useMany } from "@refinedev/core";
import { type IProfile } from "../../interface/model";
import type { IPosition } from "@career";

export function useLatestPositionDetail(positionId: number[], employees: IProfile[]): { data: any } {
  const nonZeroPositionId = positionId.filter((id) => id !== 0);
  return useMany<IPosition>({
    resource: "position",
    ids: nonZeroPositionId,
    queryOptions: {
      enabled: employees.length > 0,
    },
  });
}
