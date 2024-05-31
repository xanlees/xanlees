import { useTable } from "@refinedev/react-table";
import { type ILeaveExpand } from "./lib";

export const useTableLeave = () => {
  const table = useTable<ILeaveExpand>({
    columns: [],
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
