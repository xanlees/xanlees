import { useList, type BaseRecord, type GetListResponse } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { type IBranch } from "../../sector/interface";

export const useBranchWorkTimeSettingsTable = () => {
  const table = useTable<IBranch>({
    columns: [],
    enableSorting: true,
    enableColumnFilters: true,
    refineCoreProps: {
      errorNotification: false,
      resource: "branch",
    },
  });
  return { table };
};

export function useWorkTimeSettings<T extends BaseRecord>({ branchId }: { branchId: number[] }): GetListResponse<T> | typeof defaultData {
  const { data } = useList<T>({
    resource: "branch/work-time-settings",
    filters: [
      {
        field: "branch",
        operator: "eq",
        value: branchId.join(),
      },
    ],
    errorNotification: false,
  });
  const defaultData = {
    data: [],
    total: 0,
  };
  return data ?? defaultData;
}

