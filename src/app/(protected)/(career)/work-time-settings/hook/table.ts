import { useTable } from "@refinedev/react-table";
import { type IBranch } from "../../sector/interface";

export const useBranchWorkTimeSettingsTable = ({ type }: { type: string }) => {
  const table = useTable<IBranch>({
    columns: [],
    enableSorting: true,
    enableColumnFilters: true,
    refineCoreProps: {
      errorNotification: false,
      resource: "branch",
      filters: {
        permanent: [
          { field: "expand", operator: "eq", value: "province,work_time_settings" },
          { field: "type", operator: "eq", value: type },
        ],
      },
    },
  });
  return { table };
};

