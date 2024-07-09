import { useTable } from "@refinedev/react-table";
import { type IEmployee } from "../interface";
import { useMemo } from "react";

export const useTableEmployee = (profileId: number) => {
  const columns = useMemo(() => [], []);
  const table = useTable<IEmployee>({
    columns,
    enableSorting: true,
    enableColumnFilters: true,
    refineCoreProps: {
      errorNotification: false,
      resource: "employee",
      filters: {
        permanent: [
          { field: "expand", operator: "eq", value: "position_id,branch_id" },
          { field: "profile_id", operator: "eq", value: profileId },
        ],
      },
    },
  });
  return { table };
};

