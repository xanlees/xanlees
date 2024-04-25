import { useTable } from "@refinedev/react-table";
import { type IEmployee } from "../interface";

export const useTableEmployee = (profileId: number) => {
  const table = useTable<IEmployee>({
    columns: [],
    enableSorting: true,
    enableColumnFilters: true,
    refineCoreProps: {
      errorNotification: false,
      resource: "employee",
      filters: {
        initial: [
          { field: "expand", operator: "eq", value: "position_id,branch_id" },
          { field: "profile_id", operator: "eq", value: profileId },
        ],
      },
    },
  });
  return { table };
};

