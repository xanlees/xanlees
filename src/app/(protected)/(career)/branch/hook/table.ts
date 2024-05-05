
import { type BaseRecord, type CrudFilter, type GetListResponse, useList } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";

import type { IBranchExpand } from "../interface";

const defaultData = {
  data: [],
  total: 0,
};

export const useBranchTable = ({ type, province }: { type: string, province?: number }) => {
  const permanent: CrudFilter[] = [
    { field: "ordering", operator: "eq", value: "province" },
    { field: "expand", operator: "eq", value: "province" },
    { field: "type", operator: "eq", value: type },
  ];
  if (province !== undefined && province > 0) {
    permanent.push({ field: "province", operator: "eq", value: province });
  }
  const table = useTable<IBranchExpand>({
    columns: [],
    enableSorting: true,
    enableColumnFilters: true,
    refineCoreProps: {
      resource: "branch",
      filters: {
        permanent,
      },
    },
  });
  return { table };
};

export function usePosition<T extends BaseRecord>({ branchIds, pageSize, page = 10 }: { branchIds: number[], pageSize: boolean, page?: number }): GetListResponse<T> | typeof defaultData {
  const filters: CrudFilter[] = [
    { field: "branch_id", operator: "eq", value: branchIds.join() },
    { field: "page_size", operator: "eq", value: page },
  ];
  if (pageSize) {
    filters.push({ field: "fields", operator: "eq", value: "id" });
  }
  const { data } = useList<T>({
    resource: "position",
    filters,
    errorNotification: false,
  });
  return data ?? defaultData;
}

export function useEmployee<T extends BaseRecord>({ positionId, pageSize = 10 }: { positionId: number[], pageSize: number }): GetListResponse<T> | typeof defaultData {
  const filters: CrudFilter[] = [
    { field: "position_id", operator: "eq", value: positionId.join() },
    { field: "page_size", operator: "eq", value: pageSize },
    { field: "expand", operator: "eq", value: "profile_id,position_id" },
    { field: "is_latest", operator: "eq", value: true },
  ];
  const { data } = useList<T>({
    resource: "employee",
    filters,
    errorNotification: false,
  });
  return data ?? defaultData;
}

export function useSector<T extends BaseRecord>({ branchId, pageSize = 10 }: { branchId: number[], pageSize?: number }): GetListResponse<T> | typeof defaultData {
  const filters: CrudFilter[] = [
    { field: "branch_id", operator: "eq", value: branchId.join() },
    { field: "page_size", operator: "eq", value: 200 },
  ];
  const { data } = useList<T>({
    resource: "sector",
    filters,
    errorNotification: false,
  });
  return data ?? defaultData;
}
