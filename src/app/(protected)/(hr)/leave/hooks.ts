import { useTable } from "@refinedev/react-table";
import { type ILeaveExpand } from "./lib";
import { useMemo } from "react";

export const useTableLeave = () => {
  const columns = useMemo(() => [], []);
  const table = useTable<ILeaveExpand>({
    columns,
    enableSorting: true,
    enableColumnFilters: true,
    refineCoreProps: {
      errorNotification: false,
      resource: "leave",
      filters: {
        permanent: [
          { field: "expand", operator: "eq", value: "profile" },
        ],
      },
    },
  });
  return { table };
};
