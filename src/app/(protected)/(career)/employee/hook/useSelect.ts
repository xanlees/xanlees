import { type BaseOption, useSelect, useList, type BaseRecord, type GetListResponse } from "@refinedev/core";
import { type IPosition, type IBranch } from "@career";

export const usePositionSelect = (type?: string) => {
  const types = type === "LOTTERY" ? type : "HEADQUARTERS,OFFICE,BRANCH";
  const position = useSelect<IPosition>({
    resource: "position",
    optionLabel: "name",
    optionValue: "id",
    filters: [
      { field: "branch_type", operator: "eq", value: types },
      { field: "paginate", operator: "eq", value: false },
    ],
  });
  const branchIds = extractBranchIds(position.queryResult.data?.data ?? []);
  const { data: branchData } = fetchBranchData<IBranch>({ branchIds });
  const groupedOptions = generateGroupedOptions(position.queryResult.data?.data ?? [], branchData ?? []);
  const options = Object.values(groupedOptions).flat();
  position.options = options;
  return position;
};

const extractBranchIds = (positions: IPosition[]): number[] => {
  const allBranchIds = positions.flatMap((item) =>
    item?.sectorId?.branchId !== undefined ? [item.sectorId.branchId] : [0],
  );
  return [...new Set(allBranchIds)];
};

function fetchBranchData<T extends BaseRecord>({ branchIds }: { branchIds: number[] }): GetListResponse<T> | typeof defaultData {
  const { data } = useList<T>({
    resource: "branch",
    filters: [
      { field: "paginate", operator: "eq", value: false },
      { field: "id", operator: "eq", value: branchIds },
    ],
    errorNotification: false,
  });
  const defaultData = { data: [], total: 0 };
  return data ?? defaultData;
}

const generateGroupedOptions = (positions: IPosition[], branchData: IBranch[]): BaseOption[] => {
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
