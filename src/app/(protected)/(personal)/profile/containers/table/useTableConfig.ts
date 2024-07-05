import { useTable } from "@refinedev/react-table";
import { type IProfile } from "../../interface/model";
import { useMemo } from "react";

export const useTableProfile = (type: string) => {
  const columns = useMemo(() => [], []);
  const table = useTable<IProfile>({
    columns,
    enableSorting: true,
    enableColumnFilters: true,
    refineCoreProps: {
      errorNotification: false,
      resource: "profile",
      filters: {
        initial: [
          { field: "type", operator: "eq", value: type },
        ],
      },
    },
  });
  return { table };
};

