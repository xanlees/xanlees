
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import { useTable } from "@refinedev/react-table";
import { useMemo } from "react";
import { getbranchHolidaySchema, holidaySchema } from "./schema";
import { type IHolidayExpand } from "./interface";
import { useList } from "@refinedev/core";
import { type z } from "zod";

export const useTableHoliday = ({ type }: { type?: string }) => {
  const columns = useMemo(() => [], []);
  const table = useTable<IHolidayExpand>({
    columns,
    enableSorting: true,
    enableColumnFilters: true,
    refineCoreProps: {
      errorNotification: false,
      resource: "holiday",
      filters: {
        permanent: [
          { field: "expand", operator: "eq", value: "branch" },
          { field: "type", operator: "eq", value: type },
        ],
      },
    },
  });
  return { table };
};

export const useHolidayForm = ({ id }: { id?: number }) => {
  const action = id ? "edit" : "create";
  const { ...form } = useForm<z.infer<typeof holidaySchema>>({
    resolver: zodResolver(holidaySchema),
    defaultValues: {
      holidayName: "",
      holidayDate: [],
      description: "",
      type: "",
    },
    refineCoreProps: {
      resource: "holiday",
      action,
      id,
      redirect: false,
    },
    warnWhenUnsavedChanges: true,
  });
  return { form };
};

export function useHolidayList({ holidayDate }: { holidayDate: string }) {
  const { data } = useList({
    resource: "holiday",
    filters: [
      { field: "holiday_date", operator: "eq", value: holidayDate },
      { field: "paginate", operator: "eq", value: false },
    ],
    queryOptions: { retry: 0 },
    errorNotification: false,
  });
  return data;
}

export const useBranchHolidayForm = ({ id }: { id?: number }) => {
  const router = useRouter();
  const action = id ? "edit" : "create";
  const defaultValues = action === "create"
    ? { holidayBranch: [{ holiday: 0, branch: 0 }] }
    : { holiday: 0, branch: 0 };
  const { ...form } = useForm<any>({
    resolver: zodResolver(getbranchHolidaySchema({ action })),
    defaultValues,
    refineCoreProps: {
      resource: "holiday/holiday-branch",
      redirect: false,
      action,
      id,
      onMutationSuccess: () => {
        router.back();
      },
    },
    warnWhenUnsavedChanges: true,
  });
  return { form };
};

export function useBranchHolidayList({ holiday = "" }: { holiday?: string }) {
  const { data } = useList({
    resource: "holiday/holiday-branch",
    filters: [
      { field: "holiday", operator: "eq", value: holiday },
      { field: "paginate", operator: "eq", value: false },
      { field: "expand", operator: "eq", value: "branch" },
    ],
    errorNotification: false,
  });
  return data;
}
