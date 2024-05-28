import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import { useTable } from "@refinedev/react-table";

import { holidaySchema } from "./schema";

import type { IHoliday } from "./interface";
import type * as z from "zod";

export const useTableHoliday = () => {
  const table = useTable<IHoliday>({
    columns: [],
    enableSorting: true,
    enableColumnFilters: true,
    refineCoreProps: {
      errorNotification: false,
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
      holidayName: "",
      startDate: "",
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
