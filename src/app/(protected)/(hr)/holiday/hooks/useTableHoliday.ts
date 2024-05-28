import { useTable } from "@refinedev/react-table";
import type { IHoliday } from "../interface";

export const useTableHoliday = () => {
  const table = useTable<IHoliday>({
    columns: [],
    enableSorting: true,
    enableColumnFilters: true,
    refineCoreProps: {
      errorNotification: false,
      resource: "holiday",
    },
  });
  return { table };
};
