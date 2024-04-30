import { type BaseOption, useSelect, useMany } from "@refinedev/core";
import { type IPosition, type IBranch } from "@career";

export const fetchBranchData = (branchIds: number[]) => {
  return useMany<IBranch>({
    resource: "branch",
    ids: branchIds,
  });
};

export const extractBranchIds = (positions: IPosition[]): number[] => {
  return positions.flatMap((item) =>
    item?.sectorId?.branchId !== undefined ? [item.sectorId.branchId] : [0],
  );
};

export const generateGroupedOptions = (positions: IPosition[], branchData: IBranch[]): BaseOption[] => {
  const branchIdToName = branchData.reduce<Record<number, string>>((acc, branch) => {
    acc[branch.id] = branch.name;
    return acc;
  }, {});
  return positions.map((item) => {
    const branchName = branchIdToName[item?.sectorId?.branchId] ?? "";
    const sectorName = item?.sectorId?.name ?? "";
    const label = `${item.name}, ${sectorName}, ${branchName}`;
    return {
      label,
      value: item.id,
    };
  });
};

export const usePositionSelect = (type?: string) => {
  const types = type === "LOTTERY" ? type : "HEADQUARTERS,OFFICE,BRANCH";
  const position = useSelect<IPosition>({
    resource: "position",
    optionLabel: "name",
    optionValue: "id",
    filters: [
      { field: "branch_type", operator: "eq", value: types },
      { field: "page_size", operator: "eq", value: 1500 },
    ],
  });
  const branchIds = extractBranchIds(position.queryResult.data?.data ?? []);
  const { data: branchData } = fetchBranchData(branchIds);
  const groupedOptions = generateGroupedOptions(position.queryResult.data?.data ?? [], branchData?.data ?? []);
  const options = Object.values(groupedOptions).flat();
  position.options = options;
  return position;
};
