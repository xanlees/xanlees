import { useTable } from "@refinedev/react-table";
import { type IProfile } from "../../interface/model";

export const useTableConfig = () => {
  const table = useTable<IProfile>({
    columns: [],
    enableSorting: true,
    enableColumnFilters: true,
    refineCoreProps: {
      errorNotification: false,
      resource: "profile",
      filters: {
        initial: [
          { field: "type", operator: "eq", value: "EMPLOYEE" },
        ],
      },
    },
  });
  return { table };
};
