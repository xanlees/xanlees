/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
"use client";

import { List } from "@/shadcn/components/crud";
import { Table, type TableFilterProps } from "@/shadcn/components/table";
import { Checkbox, CommandItem } from "@src/shadcn/elements";
import { useList, useUserFriendlyName } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { Edit, Eye, Trash2 } from "lucide-react";
import type { IBranch, IPosition, ISector } from "./interface";

export default function BranchList(): JSX.Element {
  const table = useTable<IBranch>({
    columns: [],
    enableSorting: true,
    enableColumnFilters: true,
    refineCoreProps: {
      resource: "branch",
    },
  });
  const branch = table.options.data ?? [];
  const branchId = branch.map((item) =>
    item?.id !== undefined ? item.id : [0],
  );
  const { data: sectorData } = useList<ISector>({
    resource: "sector",
    errorNotification: false,
    filters: [
      {
        field: "branch_id",
        operator: "eq",
        value: branchId,
      },
    ],
    queryOptions: {
      enabled: branch.length > 0,
    },
  });
  const sectorIs = sectorData?.data.map((item) =>
    item?.id !== undefined ? item.id : [0],
  );

  const { data: positionData } = useList<IPosition>({
    resource: "position",
    filters: [
      {
        field: "sector_id",
        operator: "eq",
        value: sectorIs,
      },
    ],
    queryOptions: {
      enabled: branch.length > 0,
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
            header={"Branch"}
            accessorKey="name"
            id="name"
            enableSorting
            enableHiding
            filter={(props: TableFilterProps) => (
              <Table.Filter.Search {...props} title="Search Branch" />
            )}
          />
          <Table.Column
            header={"Sector"}
            accessorKey="id"
            id="id"
            enableSorting
            enableHiding
            cell={({ row: { original } }) => {
              const displaySector = sectorData?.data.find(
                (item) => item?.branchId === original.id,
              ) as ISector;
              return <div>{displaySector?.name}</div>;
            }}
          />
          <Table.Column
            header={"Position"}
            accessorKey="id"
            id="position"
            enableSorting
            enableHiding
            filter={(props: TableFilterProps) => (
              <Table.Filter.Search {...props} title="Search position" />
            )}
            cell={({ row: { original } }) => {
              const sectorRecord = sectorData?.data.find(
                (item) => item?.branchId === original.id,
              ) as ISector;
              const displayPosition = positionData?.data.find(
                (item) => item?.sectorId === sectorRecord?.id,
              ) as IPosition;
              return <div>{displayPosition?.name}</div>;
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
                  resource="branch"
                  icon={<Eye size={16} />}
                />
                <Table.EditAction
                  title="Edit"
                  row={original}
                  resource="branch"
                  icon={<Edit size={16} />}
                />
                <Table.DeleteAction
                  title="Delete"
                  row={original}
                  withForceDelete={true}
                  resource="branch"
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
