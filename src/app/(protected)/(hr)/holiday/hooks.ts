import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import { useTable } from "@refinedev/react-table";
import { useMemo } from "react";

import { holidaySchema } from "./lib";
import type * as z from "zod";
import { useList } from "@refinedev/core";

export const useTableHoliday = () => {
  const columns = useMemo(() => [], []);
  const table = useTable({
    columns,
    enableSorting: true,
    enableColumnFilters: true,
    refineCoreProps: {
      resource: "holiday",
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
      name: "",
      date: ["", ""],
      decription: "",
      type: "",
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
