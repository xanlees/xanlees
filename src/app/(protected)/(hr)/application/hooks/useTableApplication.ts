import { useTable } from "@refinedev/react-table";
import { type IApplication } from "../interface";
import { useList, type BaseRecord, type GetListResponse } from "@refinedev/core";
import { useMemo } from "react";

export const useTableApplication = () => {
  const columns = useMemo(() => [], []);
  const table = useTable<IApplication>({
    columns,
    enableSorting: true,
    enableColumnFilters: true,
    refineCoreProps: {
      errorNotification: false,
      resource: "application",
      filters: {
        initial: [
          { field: "expand", operator: "eq", value: "province,profile_id" },
          { field: "application_status", operator: "eq", value: "New,Contacted,Interviewed" },
        ],
      },
    },
  });
  return { table };
};

export function useShowApplication<T extends BaseRecord>({ id }: { id: number }): GetListResponse<T> | typeof defaultData {
  const { data } = useList<T>({
    resource: "application",
    filters: [
      { field: "expand", operator: "eq", value: "province,profile_id" },
      { field: "id", operator: "eq", value: id },
    ],
    errorNotification: false,
  });
  const defaultData = {
    data: [],
    total: 0,
  };
  return data ?? defaultData;
}
