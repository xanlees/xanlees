import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import { useTable } from "@refinedev/react-table";
import { useMemo } from "react";

import { holidaySchema, type IHolidayExpand } from "./lib";
import type * as z from "zod";

export const useTableHoliday = () => {
  const columns = useMemo(() => [], []);
  const table = useTable<IHolidayExpand>({
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
