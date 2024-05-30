
import { type BaseOption, useSelect } from "@refinedev/core";
import { type IBranchExpand } from "../interface";

export const useBranchSelect = ({ type }: { type?: string }) => {
  const types = type === "LOTTERY" ? type : "HEADQUARTERS,OFFICE,BRANCH";
  const branch = useSelect<IBranchExpand>({
    resource: "branch",
    optionLabel: "name",
    optionValue: "id",
    filters: [
      { field: "type", operator: "eq", value: types },
      { field: "paginate", operator: "eq", value: false },
      { field: "expand", operator: "eq", value: "province" },
    ],
  });
  const options = branch.queryResult.data?.data?.map((item) => {
    return {
      label: `${item?.name ?? ""} - ${item?.province?.provinceName ?? ""}`,
      value: item?.id ?? null,
    };
  });
  branch.options = options as BaseOption[];
  return branch;
};

