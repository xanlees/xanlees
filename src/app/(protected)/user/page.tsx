"use client";

import { List } from "@/shadcn/components/crud";
import { Table, type TableFilterProps } from "@/shadcn/components/table"; // Assuming this is the correct import path
import { Badge } from "@src/shadcn/elements";
import { useUserFriendlyName } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import moment from "moment";
import { type IUser } from "./interface";
import { statusBadge } from "./lib/utils";
import { getSelectColumn } from "@src/common/containers/column/select";
import { getActionsColumn } from "@src/common/containers/column/action";

// eslint-disable-next-line max-lines-per-function
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
        <div className="w-1/2 mx-auto">
          <Table table={table}>
            {getSelectColumn(friendly)}
            <Table.Column
              header="Username"
              id="username"
              accessorKey="username"
              enableSorting
              enableHiding
              filter={(props: TableFilterProps) => (
                <Table.Filter.Search {...props} title="Search Username" />
              )}
            />
            <Table.Column
              header="Status"
              id="isActive"
              accessorKey="isActive"
              enableSorting
              enableHiding
              cell={(props) => {
                const status = props.getValue() as unknown as boolean;
                return statusBadge(status);
              }}
            />
            <Table.Column
              header="Permission"
              id="groups"
              accessorKey="groups"
              enableSorting
              enableHiding
              cell={(props) => {
                const groups = props.getValue() as unknown as string[];
                return (
                  groups.map((value: string, index) => {
                    return <Badge key={`badge-${index}`}>{value}</Badge>;
                  }));
              }}
            />
            <Table.Column
              header="Created At"
              id="dateJoined"
              accessorKey="dateJoined"
              enableSorting
              enableHiding
              cell={(props) => {
                const dateValue = props.getValue();
                if (typeof dateValue === "string") {
                  return moment(dateValue).format("DD MMM YYYY");
                }
                return "";
              }}
            />
            {getActionsColumn("user")}
          </Table>
        </div>

      </List>
    </div>

  );
}

