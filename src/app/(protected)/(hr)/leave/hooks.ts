import { useRouter } from "next/navigation";
import type * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import { useTable } from "@refinedev/react-table";

import { leaveSchema, type ILeaveExpand } from "./lib";

export const useTableLeave = () => {
  const table = useTable<ILeaveExpand>({
    columns: [],
    enableSorting: true,
    enableColumnFilters: true,
    refineCoreProps: {
      errorNotification: false,
      resource: "leave",
      filters: {
        permanent: [
          { field: "expand", operator: "eq", value: "profile" },
        ],
      },
    },
  });
  return { table };
};

export const useHolidayForm = ({ id }: { id?: number }) => {
  const action = id ? "edit" : "create";
  const router = useRouter();
  const { ...form } = useForm<z.infer<typeof leaveSchema>>({
    resolver: zodResolver(leaveSchema),
    defaultValues: {
      leaveName: "",
      leaveDate: ["", ""],
      endDate: "",
    },
    refineCoreProps: {
      resource: "leave",
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
