import { useTable } from "@refinedev/react-table";
import { type IUserProfile } from "../interface";
import { type ExtendedCrudFilter } from "@src/common/interface";
import { useState, useEffect, useMemo } from "react";

export const useTableUserProfile = ({ branchId }: { branchId: number }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<number>(branchId);
  const [initialPeriod, setInitialPeriod] = useState<number>(branchId);
  useEffect(() => {
    if (branchId !== initialPeriod) {
      setSelectedPeriod(branchId);
      setInitialPeriod(branchId);
    }
  }, [branchId, initialPeriod]);
  const permanentFilters: ExtendedCrudFilter[] = useMemo(() => {
    const filters: ExtendedCrudFilter[] = [
      { field: "expand", operator: "eq", value: "profile" },
      { field: "ordering", operator: "eq", value: "latest_check_in" },
      { field: "profile_type", operator: "eq", value: "EMPLOYEE" },
      { field: "user_is_active", operator: "eq", value: true },
    ];
    if (branchId !== 0) {
      filters.unshift({ field: "branch", operator: "eq", value: branchId });
    }
    return filters;
  }, [branchId]);
  const table = useTable<IUserProfile>({
    columns: [],
    enableSorting: true,
    enableColumnFilters: true,
    refineCoreProps: {
      errorNotification: false,
      resource: "profile/user-profile",
      filters: {
        permanent: permanentFilters,
      },
    },
  });
  return { table, selectedPeriod, setSelectedPeriod };
};
