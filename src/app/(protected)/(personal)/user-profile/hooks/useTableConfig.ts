import { useTable } from "@refinedev/react-table";
import { type IUserProfile } from "../interface";

export const useTableUserProfile = () => {
  const table = useTable<IUserProfile>({
    columns: [],
    enableSorting: true,
    enableColumnFilters: true,
    refineCoreProps: {
      errorNotification: false,
      resource: "profile/user-profile",
      filters: {
        initial: [
          { field: "expand", operator: "eq", value: "profile" },
          { field: "ordering", operator: "eq", value: "latest_check_in" },
        ],
      },
    },
  });
  return { table };
};
