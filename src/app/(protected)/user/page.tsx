"use client";

import { List } from "@/shadcn/components/crud";
import { Table } from "@/shadcn/components/table";
import { useUserFriendlyName } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { type IUser } from "./interface";
import { getSelectColumn } from "@src/common/containers/column/select";
import { getActionsColumn } from "@src/common/containers/column/action";
import { dateJoinedColumn, usernameColumn, groupColumn, statusColumn } from "./containers/column";

export default function UserList(): JSX.Element {
  const table = useTable<IUser>({
    columns: [],
    enableSorting: true,
    enableColumnFilters: true,
    refineCoreProps: {
      resource: "user",
    },
  });
  const friendly = useUserFriendlyName();
  return (
    <div className="mx-auto">
      <List>
        <Table table={table}>
          {getSelectColumn(friendly)}
          {usernameColumn()}
          {statusColumn()}
          {groupColumn()}
          {dateJoinedColumn()}
          {getActionsColumn("user")}
        </Table>
      </List>
    </div>

  );
}
