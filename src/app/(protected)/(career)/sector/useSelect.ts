import { type BaseOption, useSelect } from "@refinedev/core";

interface IBranch {
  name: string
  id: number
  province: {
    provinceName: string
  }
}

export const useBranchSelect = ({ type }: { type?: string }) => {
  const types = type === "LOTTERY" ? type : "HEADQUARTERS,OFFICE,BRANCH";
  const branch = useSelect<IBranch>({
    resource: "branch",
    optionLabel: "name",
    optionValue: "id",
    filters: [
      { field: "type", operator: "eq", value: types },
      { field: "pageSize", operator: "eq", value: 200 },
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

