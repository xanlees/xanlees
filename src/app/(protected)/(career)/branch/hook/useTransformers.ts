/* eslint-disable max-nested-callbacks */
import type { GetListResponse } from "@refinedev/core";
import type { ISector, IPosition } from "../..";

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
export function mapSectorToBranchDetails(
  sectorData: GetListResponse<ISector> | undefined,
  positionData: GetListResponse<IPosition> | undefined,
) {
  if (!Array.isArray(sectorData?.data)) {
    return [];
  }
  const positions = positionData?.data ?? [];
  return sectorData?.data.flatMap((sector) => {
    const sectorId = sector.id; // Store sector.id to prevent unintended type mismatches
    return {
      name: sector.branchId.name,
      id: sector.branchId.id,
      sector: [
        {
          ...sector,
          position: positions
            .filter((position) => position?.sectorId === sectorId) // Ensure both sides are compatible types
            .map((position) => mapPosition(position, sector)),
        },
      ],
    };
  });
}
