
import { useTable } from "@refinedev/react-table";
import { provinceName } from "./useProvince";
import { useList, type BaseRecord, type GetListResponse } from "@refinedev/core";
import { type IDistrict } from "@src/app/(protected)/(personal)/address/interface";
import { type IBranch } from "../interface";
import { type ISector } from "../../sector/interface";

export const useTableBranch = (type: string) => {
  const table = useTable<IDistrict>({
    columns: [],
    enableSorting: true,
    enableColumnFilters: true,
    refineCoreProps: {
      resource: "district",
      filters: {
        permanent: [
          { field: "province", operator: "eq", value: provinceName },
          { field: "branch_type", operator: "eq", value: type },
        ],
      },
    },
  });
  return { table };
};

export function useBranch<T extends BaseRecord>({ province, branch, type }: { province: number[], branch: IDistrict[], type: string }): GetListResponse<T> | typeof defaultData {
  const { data } = useList<T>({
    resource: "branch",
    filters: [
      { field: "type", operator: "eq", value: type },
      { field: "province", operator: "eq", value: province.join() },
    ],
    queryOptions: {
      enabled: branch.length > 0,
    },
    errorNotification: false,
  });
  const defaultData = {
    data: [],
    total: 0,
  };
  return data ?? defaultData;
}

export function useSector<T extends BaseRecord>({ branchId }: { branchId: number[] }): GetListResponse<T> | typeof defaultData {
  const { data } = useList<T>({
    resource: "sector",
    filters: [
      { field: "branch_id", operator: "eq", value: branchId?.join() },
    ],
    errorNotification: false,
  });
  const defaultData = {
    data: [],
    total: 0,
  };
  return data ?? defaultData;
}

export function usePosition<T extends BaseRecord>({ sectorId }: { sectorId: number[] }): GetListResponse<T> | typeof defaultData {
  const { data } = useList<T>({
    resource: "position",
    filters: [
      { field: "sector_id", operator: "eq", value: sectorId?.join() },
    ],
    errorNotification: false,
  });
  const defaultData = {
    data: [],
    total: 0,
  };
  return data ?? defaultData;
}

export function useProvinceIds(province: IDistrict[]) {
  const provinceId = province.map((item) => item.id);
  if (provinceId) {
    return provinceId;
  }
  return [];
}
export function useBranchID(branch: IBranch[]) {
  return branch.flatMap((item) => (item?.id !== undefined ? [item.id] : [0]));
}
export function useSectorID(sector: ISector[]) {
  const sectorId = sector.map((item) => item.id);
  if (sectorId) {
    return sectorId;
  }
  return [];
}
