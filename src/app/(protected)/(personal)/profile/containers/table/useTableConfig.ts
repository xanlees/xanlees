import { useTable } from "@refinedev/react-table";
import { type IProfile } from "../../interface/model";
import { type IEducation } from "../../../education/interface";

export const useTableConfig = (type: string) => {
  const table = useTable<IProfile>({
    columns: [],
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

export const useTableEducation = (profileId: number) => {
  const table = useTable<IEducation>({
    columns: [],
    enableSorting: true,
    enableColumnFilters: true,
    refineCoreProps: {
      errorNotification: false,
      resource: "education",
      filters: {
        initial: [
          { field: "profile_id", operator: "eq", value: profileId },
          { field: "expand", operator: "eq", value: "graduation_id" },
        ],
      },
    },
  });
  return { table };
};
