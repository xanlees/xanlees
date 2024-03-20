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
export interface FilterObjects {
  field: string
  operator: "eq"
  value: string | number | number[]

}

export const useListService = <T extends BaseRecord>({ resource, filters, pageSize }: UseResourceListProps): GetListResponse<T> | typeof defaultData => {
  const { data } = useList<T>({
    resource,
    filters,
    pagination: { pageSize },
    errorNotification: false,
  });
  const defaultData = {
    data: [],
    total: 0,
  };
  return data ?? defaultData;
};
