import { type BaseOption, useSelect, useMany } from "@refinedev/core";
import type { IPosition } from "@src/app/(protected)/(career)/branch/interface";
import type { IBranch } from "../../../(career)/sector/interface";

type GroupedOptions = Record<number, BaseOption[]>;

const getBranchName = (branchData: IBranch[] | undefined, branchId: number): string => {
  const branch = branchData?.find((b) => b.id === branchId);
  return branch?.name ?? "";
};

export const usePositionSelect = () => {
  const position = useSelect<IPosition>({
    resource: "position",
    optionLabel: "name",
    optionValue: "id",
  });

  const branchId = position.queryResult.data?.data.flatMap((item) =>
    item?.sectorDetail?.branchId !== undefined
      ? [item?.sectorDetail?.branchId]
      : [0],
  );

  const { data: branchData } = useMany<IBranch>({
    resource: "branch",
    ids: branchId ?? [],
  });

  const groupedOptions = position.queryResult.data?.data.reduce((acc: GroupedOptions, item) => {
    const branchId = item.sectorDetail?.branchId ?? 0;
    const branchName = getBranchName(branchData?.data, branchId);

    if (!(branchId in acc)) {
      acc[branchId] = [];
    }

    acc[branchId].push({
      label: `${item.name} - ${branchName}`,
      value: item.id,
    });

    return acc;
  }, {});
  const options = (groupedOptions != null) ? Object.values(groupedOptions).flat() : [];
  position.options = options;
  return position;
};
