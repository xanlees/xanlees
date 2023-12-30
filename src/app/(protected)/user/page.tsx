/* eslint-disable max-lines */
"use client";

import { List } from "@/shadcn/components/crud";
import { Table, type TableFilterProps } from "@/shadcn/components/table"; // Assuming this is the correct import path
import { Badge, Checkbox, CommandItem } from "@src/shadcn/elements";
import { useUserFriendlyName } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { Edit, Eye, Trash2 } from "lucide-react";
import moment from "moment";
import { type IUser } from "./interface";
import { statusBadge } from "./lib/utils";

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
    <div className="w-1/2 mx-auto mt-10">
      <List>
        <Table table={table}>
          <Table.Column
            id={"select"}
            accessorKey="id"
            header={({ table }) => (
              <Table.CheckAll table={table}>
                <CommandItem
                  onSelect={() => { alert("Delete Selected"); }}
                >
                Delete Selected (
                  {table.getSelectedRowModel().rows.length}){" "}
                  {friendly(
                    "Row",
                    table.getSelectedRowModel().rows.length > 1 ? "plural" : "singular",
                  )}
                </CommandItem>
              </Table.CheckAll>
            )}
            cell={({ row }) => (
              <Checkbox
                className="translate-y-[2px]"
                checked={row.getIsSelected()}
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                onCheckedChange={(value) => { row.toggleSelected(!!value); }
                }
                aria-label="Select row"
                key={`checkbox-${row.original.id}`}
              />
            )}
          />
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
          <Table.Column
            accessorKey={"id"}
            id={"actions"}
            cell={({ row: { original } }) => (
              <Table.Actions>
                <Table.ShowAction
                  title="Detail"
                  row={original}
                  resource="user"
                  icon={<Eye size={16} />}
                />
                <Table.EditAction
                  title="Edit"
                  row={original}
                  resource="user"
                  icon={<Edit size={16} />}
                />
                <Table.DeleteAction
                  title="Delete"
                  row={original}
                  withForceDelete={true}
                  resource="user"
                  icon={<Trash2 size={16} />}
                />
              </Table.Actions>
            )}
          />
        </Table>
      </List>
    </div>

  );
}

