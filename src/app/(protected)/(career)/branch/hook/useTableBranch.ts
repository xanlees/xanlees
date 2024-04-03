import { useTable } from "@refinedev/react-table";
import { type IBranch } from "../interface";

export const useTableBranch = (type: string) => {
  const table = useTable<IBranch>({
    columns: [],
    enableSorting: true,
    enableColumnFilters: true,
    refineCoreProps: {
      errorNotification: false,
      resource: "branch",
      filters: {
        initial: [
          { field: "type", operator: "eq", value: type },
        ],
      },
    },
  });
  return { table };
};
