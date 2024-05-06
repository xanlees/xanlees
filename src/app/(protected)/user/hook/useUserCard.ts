import { useTable } from "@refinedev/react-table";
import { type CrudFilter } from "@refinedev/core";
import { type IUserProfile } from "../../(personal)/user-profile/interface";

export const useUserCard = ({ profileId, userId, filterField }: { profileId?: number, userId?: number, filterField: string }) => {
  const permanent: CrudFilter[] = [
    { field: "expand", operator: "eq", value: "user" },
  ];
  if (filterField === "profile" && profileId !== undefined && profileId > 0) {
    permanent.push({ field: "profile", operator: "eq", value: profileId });
  }
  if (filterField === "user" && userId !== undefined && userId > 0) {
    permanent.push({ field: "user", operator: "eq", value: userId });
  }
  const table = useTable<IUserProfile>({
    columns: [],
    enableSorting: true,
    enableColumnFilters: true,
    refineCoreProps: {
      errorNotification: false,
      resource: "profile/user-profile",
      filters: {
        permanent,
      },
    },
  });
  return { table };
};
