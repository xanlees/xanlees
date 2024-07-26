import { useTable } from "@refinedev/react-table";
import { type ILeaveExpand } from "./lib";
import { useMemo } from "react";

export const useTableLeave = ({ leaveType }: { leaveType?: string }) => {
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
          { field: "leaveType", operator: "eq", value: leaveType },
        ],
      },
    },
  });
  return { table };
};
