import { type FilterObjects } from "./useEmployee";

export function filterEmployee({ profileId }: { profileId?: number }): FilterObjects[] {
  const filters: FilterObjects[] = [];
  if (profileId !== undefined) {
    filters.push({
      field: "profile_id",
      operator: "eq",
      value: profileId,
    });
  }
  return filters;
}

export function filterProfile({ profileId }: { profileId?: number }): FilterObjects[] {
  const filters: FilterObjects[] = [];
  if (profileId !== undefined) {
    filters.push({
      field: "id",
      operator: "eq",
      value: profileId,
    });
  }
  return filters;
}

