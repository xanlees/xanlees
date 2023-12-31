/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client";

import { List } from "@/shadcn/components/crud";
import { Table, type TableFilterProps } from "@/shadcn/components/table";
import { Checkbox, CommandItem } from "@src/shadcn/elements";
import { useMany, useUserFriendlyName } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { Edit, Eye, Trash2 } from "lucide-react";
import type { IBranch, IPosition } from "./interface";

// eslint-disable-next-line max-lines-per-function
export default function PositionList(): JSX.Element {
  const table = useTable<IPosition>({
    columns: [],
    enableSorting: true,
    enableColumnFilters: true,
    refineCoreProps: {
      resource: "position",
    },
  });

  const position = table.options.data ?? [];
  const branchId = position.map((item) =>
    item?.sectorDetail?.branchId !== undefined ? item.sectorDetail?.branchId : 0,
  );

  const { data: branchData } = useMany<IBranch>({
    resource: "branch",
    ids: branchId,
    queryOptions: {
      enabled: position.length > 0,
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
                  onSelect={() => {
                    alert("Delete Selected");
                  }}
                >
                  Delete Selected ({table.getSelectedRowModel().rows.length}){" "}
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
                onCheckedChange={(value) => {
                  row.toggleSelected(Boolean(value));
                }}
                aria-label="Select row"
                key={`checkbox-${row.original.id}`}
              />
            )}
          />
          <Table.Column
            header={"Position"}
            accessorKey="name"
            id="name"
            enableSorting
            enableHiding
            filter={(props: TableFilterProps) => (
              <Table.Filter.Search {...props} title="Search Position" />
            )}
          />
          <Table.Column
            header={"sectorDetail"}
            accessorKey="sectorDetail.name"
            id="sectorName"
            enableSorting
            enableHiding
            filter={(props: TableFilterProps) => (
              <Table.Filter.Search {...props} title="Search nickname" />
            )}
          />
          <Table.Column
            header={"Branch"}
            id="branchId"
            accessorKey="sectorDetail.branchId"
            enableSorting
            enableHiding
            cell={({ row }) => {
              const displayText = branchData?.data.find(
                (item) => item?.id === row.original.sectorDetail.branchId,
              ) as IBranch;
              return <div>{displayText?.name}</div>;
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
