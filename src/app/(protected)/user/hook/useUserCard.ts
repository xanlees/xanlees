import { useTable } from "@refinedev/react-table";
import { type IEducation } from "../../(personal)/index";

export const useUserCard = (profileId: number, filterField: string) => {
  const table = useTable<IEducation>({
    columns: [],
    enableSorting: true,
    enableColumnFilters: true,
    refineCoreProps: {
      errorNotification: false,
      resource: "profile/user-profile",
      filters: {
        permanent: [
          { field: filterField, operator: "eq", value: profileId },
          { field: "expand", operator: "eq", value: "user" },
        ],
      },
    },
  });
  return { table };
};

