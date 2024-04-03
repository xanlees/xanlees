import { type BaseOption, useSelect, useMany } from "@refinedev/core";
import { type IPosition, type IBranch } from "@career";
type GroupedOptions = Record<number, BaseOption[]>;

// const getBranchName = (branchData: IBranch[] | undefined, branchId: number): string => {
//   const branch = branchData?.find((b) => b.id === branchId);
//   return branch?.name ?? "";
// };

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
    // const branchName = getBranchName(branchData, branchId);

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
  const position = useSelect<IPosition>({
    resource: "position",
    optionLabel: "name",
    optionValue: "id",
    filters: [
      {
        field: "type",
        operator: "eq",
        value: type === "agent" ? "ແມ່ຫວຍ" : "ຫ້ອງການ",
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
