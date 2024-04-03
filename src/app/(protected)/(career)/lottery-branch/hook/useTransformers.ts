/* eslint-disable max-nested-callbacks */
import type { GetListResponse } from "@refinedev/core";
import { type IPosition, type ISector } from "../..";

function mapPosition(position: IPosition, sector: ISector) {
  return {
    ...position,
    sectorDetail: {
      name: sector.name,
      id: sector.id,
      branchId: sector.branchId,
    },
  };
}

export function mapSectorToBranchIds(
  sectorData: GetListResponse<ISector> | undefined,
  positionData: GetListResponse<IPosition> | undefined,
) {
  if (!Array.isArray(sectorData?.data)) {
    return [];
  }
  const positions = positionData?.data ?? [];
  return sectorData?.data.flatMap((sector) => ({
    name: sector.branchId.name,
    id: sector.branchId.id,
    sector: [
      {
        ...sector,
        position: positions
          .filter((position) => position?.sectorId === sector.id)
          .map((position) => mapPosition(position, sector)),
      },
    ],
  }));
}
