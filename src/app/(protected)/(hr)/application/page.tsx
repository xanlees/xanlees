
"use client";
import { List } from "@/shadcn/components/crud";
import { Table } from "@/shadcn/components/table";
import { useUserFriendlyName } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { getSelectColumn } from "@src/common/containers/column/select";
import { getActionsColumn } from "@src/common/containers/column/action";
import type { IApplication } from "./interface";
const resource = "application";
export default function ApplicationList(): JSX.Element {
  const table = useTable<IApplication>({
    columns: [],
    enableSorting: true,
    enableColumnFilters: true,
    refineCoreProps: { resource },
  });
  // const application = table.options.data ?? [];
  const friendly = useUserFriendlyName();
  return (
    <List>
      <Table table={table}>
        {getSelectColumn(friendly)}
        {getActionsColumn(resource)}
      </Table>
    </List>
  );
}
