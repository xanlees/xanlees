/* eslint-disable max-lines */
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import { useTable } from "@refinedev/react-table";
import { useMemo } from "react";
import type * as z from "zod";
import { getbranchHolidaySchema, holidaySchema, type IHolidayExpand } from "./lib";
import { useList } from "@refinedev/core";
import { useHolidayContext } from "./context";

import { getErrorMessageNotification } from "@src/common/lib/errorNotification";
import { type ErrorMapMessage, FormMultipart, type IMessages } from "@src/common/interface";

const defaultMessage = "";

export const useTableHoliday = () => {
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
        ],
      },
    },
  });
  return { table };
};

export const useHolidayForm = () => {
  const { state, dispatch } = useHolidayContext();
  const { ...form } = useForm<{ id?: number }>({
    resolver: zodResolver(holidaySchema),
    defaultValues: {
      name: "",
      date: [],
      decription: "",
      type: "",
    },
    refineCoreProps: {
      resource: "holiday",
      meta: FormMultipart,
      onMutationSuccess: (data) => {
        dispatch({ type: "setHoliday", payload: data?.data?.id ?? 0 });
      },
      errorNotification: (data: any) => {
        const responseData = (data as IMessages)?.response?.data;
        return getErrorMessageNotification({ responseData, errorMessages, defaultMessage });
      },
      successNotification: (data) => {
        return { message: "ສ້າງຂໍ້ມູນສ່ວນບຸກຄົນສໍາເລັດ", type: "success", description: "" };
      },
      redirect: false,
    },
    warnWhenUnsavedChanges: true,
  });
  return { form, state };
};

export const errorMessages: ErrorMapMessage[] = [
  {
    val: "Profile with this fullname already exists.",
    message: "ຊື່ຂອງທ່ານມີໃນລະບົບແລ້ວ",
  },
  {
    val: "Profile with this phone number already exists.",
    message: "ເບີໂທນີ້ມີໃນລະບົບແລ້ວ",
  },
];

export function useHolidayList({ date }: { date: string }) {
  const { data } = useList({
    resource: "holiday",
    filters: [
      { field: "date", operator: "eq", value: date },
      { field: "paginate", operator: "eq", value: false },
    ],
    queryOptions: { retry: 0 },
    errorNotification: false,
  });
  return data;
}

export const useBranchHolidayForm = ({ id }: { id?: number }) => {
  const action = id ? "edit" : "create";
  const router = useRouter();
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
