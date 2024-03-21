import { type FilterObjects } from "./useEmployee";

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

