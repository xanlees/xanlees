
import { useTable } from "@refinedev/react-table";
import { type IBranch } from "../interface";
import { provinceName } from "./useProvince";

export const useTableBranch = (type: string) => {
  const table = useTable<IBranch>({
    columns: [],
    enableSorting: true,
    enableColumnFilters: true,
    refineCoreProps: {
      resource: "district",
      filters: {
        initial: [
          { field: "province", operator: "eq", value: provinceName },
          { field: "branch_type", operator: "eq", value: "HEADQUARTERS,BRANCH,OFFICE" },
        ],
      },
    },
  });
  return { table };
};
