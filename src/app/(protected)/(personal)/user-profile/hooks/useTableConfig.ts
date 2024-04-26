import { useTable } from "@refinedev/react-table";
import { useMemo } from "react";
import { type IUserProfile } from "../interface";

interface ExtendedCrudFilter {
  field: string
  operator: "eq"
  value: string | number | boolean
}

export const useTableUserProfile = (branch: number) => {
  const permanentFilters: ExtendedCrudFilter[] = useMemo(() => {
    const filters: ExtendedCrudFilter[] = [
      { field: "expand", operator: "eq", value: "profile" },
      { field: "ordering", operator: "eq", value: "latest_check_in" },
      { field: "profile_type", operator: "eq", value: "EMPLOYEE" },
      { field: "user_is_active", operator: "eq", value: true },
    ];
    if (branch !== 0) {
      filters.unshift({ field: "branch", operator: "eq", value: branch });
    }
    return filters;
  }, [branch]);
  const table = useTable<IUserProfile>({
    columns: [],
    enableSorting: true,
    enableColumnFilters: true,
    refineCoreProps: {
      errorNotification: false,
      resource: "profile/user-profile",
      filters: {
        permanent: permanentFilters,
      },
    },
  });
  return { table };
};
