"use client";

import { List } from "@/shadcn/components/crud";
import { Table } from "@/shadcn/components/table";
import { useTable } from "@refinedev/react-table";
import { type IUser } from "./interface";
import { SequenceColumn } from "@src/common/containers/column/select";
import { getActionsColumn } from "@src/common/containers/column/action";
import { dateJoinedColumn, usernameColumn, groupColumn, statusColumn } from "./containers/column";
import { useMemo } from "react";

export default function UserList(): JSX.Element {
  const columns = useMemo(() => [], []);
  const table = useTable<IUser>({
    columns,
    enableSorting: true,
    enableColumnFilters: true,
    refineCoreProps: {
      resource: "user",
    },
  });
  return (
    <div className="mx-auto">
      <List>
        <Table table={table}>
          {SequenceColumn()}
          {usernameColumn()}
          {statusColumn()}
          {groupColumn()}
          {dateJoinedColumn()}
          {getActionsColumn({ resource: "user" })}
        </Table>
      </List>
    </div>

  );
}
