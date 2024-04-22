"use client";
import { useList, type BaseRecord, type GetListResponse } from "@refinedev/core";
import { type IEmployee } from "../../index";

export function useEmployeeIsLatest<T extends BaseRecord>({ profileId }: { profileId: number[] }): GetListResponse<T> | typeof defaultData {
  const { data } = useList<T>({
    resource: "employee",
    filters: [
      { field: "profile_id", operator: "eq", value: profileId?.join() },
      { field: "is_latest", operator: "eq", value: true },
    ],
    errorNotification: false,
  });
  const defaultData = {
    data: [],
    total: 0,
  };
  return data ?? defaultData;
}
export function useBranchId(user: IEmployee[]): number[] {
  const branchIds = user.map((emp) => emp.branchId).filter((id) => id != null);
  const uniqueBranchIds = new Set(branchIds);

  if (uniqueBranchIds.size === 1) {
    return Array.from(uniqueBranchIds);
  }
  return Array.from(uniqueBranchIds);
}
