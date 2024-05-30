import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useList } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { useTable } from "@refinedev/react-table";

import { holidaySchema, type IHolidayExpand } from "./lib";

import type * as z from "zod";

export const useTableHoliday = () => {
  const table = useTable<IHolidayExpand>({
    columns: [],
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

export const useHolidayForm = ({ id }: { id?: number }) => {
  const action = id ? "edit" : "create";
  const router = useRouter();
  const { ...form } = useForm<z.infer<typeof holidaySchema>>({
    resolver: zodResolver(holidaySchema),
    defaultValues: {
      holidayName: "",
      leaveDate: ["", ""],
      endDate: "",
    },
    refineCoreProps: {
      resource: "holiday",
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

export function useHolidayList({ holidayDate }: { holidayDate: string }) {
  const { data } = useList({
    resource: "holiday",
    filters: [
      {
        field: "holiday_date",
        operator: "eq",
        value: holidayDate,
      },
    ],
    errorNotification: false,
  });
  return data;
}
