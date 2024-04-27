import { type BaseOption, useSelect, useMany } from "@refinedev/core";
import { type IPosition, type IBranch } from "@career";
type GroupedOptions = Record<number, BaseOption[]>;

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

export const generateGroupedOptions = (positions: IPosition[], branchData: IBranch[]): GroupedOptions => {
  return positions.reduce((acc: GroupedOptions, item) => {
    const branchId = item.sectorId?.branchId ?? 0;
    if (!(branchId in acc)) {
      acc[branchId] = [];
    }

    acc[branchId].push({
      label: `${item.name}`,
      value: item.id,
    });

    return acc;
  }, {});
};

export const usePositionSelect = (type?: string) => {
  // const types = type === "LOTTERY" ? type : "HEADQUARTERS,OFFICE,BRANCH";
  const position = useSelect<IPosition>({
    resource: "position",
    optionLabel: "name",
    optionValue: "id",
    filters: [
      {
        field: "branch_type",
        operator: "eq",
        value: "LOTTERY,HEADQUARTERS,OFFICE,BRANCH",
      },
    ],
  });
  const branchIds = extractBranchIds(position.queryResult.data?.data ?? []);
  const { data: branchData } = fetchBranchData(branchIds);
  const groupedOptions = generateGroupedOptions(position.queryResult.data?.data ?? [], branchData?.data ?? []);
  const options = Object.values(groupedOptions).flat();
  position.options = options;
  return position;
};
