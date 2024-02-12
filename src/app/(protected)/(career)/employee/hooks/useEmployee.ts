import { useList, type BaseRecord, type GetListResponse } from "@refinedev/core";

interface UseResourceListProps {
  resource?: string
  pageSize?: number
  filters?: Array<{
    field: string
    operator: "eq"
    value: string | number | number[]
  }>
}

export const useEmployee = <T extends BaseRecord>({ resource, filters, pageSize }: UseResourceListProps): GetListResponse<T> | typeof defaultData => {
  const { data } = useList<T>({
    resource,
    filters,
    pagination: { pageSize },
    errorNotification: false,
  });
  return data ?? defaultData;
};

export interface FilterObjects {
  field: string
  operator: "eq"
  value: string | number | number[]

}

const defaultData = {
  data: [],
  total: 0,
};

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
