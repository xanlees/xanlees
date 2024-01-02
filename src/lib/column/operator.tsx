/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import { Table } from "@/shadcn/components/table";
import { Edit, Eye, Trash2 } from "lucide-react";

export function getOperatorColumn(resource: string) {
  return <Table.Column
    accessorKey={"id"}
    id={"actions"}
    cell={({ row: { original } }) => (
      <Table.Actions>
        <Table.ShowAction
          title="Detail"
          row={original}
          resource={resource}
          icon={<Eye size={16} />} />
        <Table.EditAction
          title="Edit"
          row={original}
          resource={resource}
          icon={<Edit size={16} />} />
        <Table.DeleteAction
          title="Delete"
          row={original}
          withForceDelete={true}
          resource={resource}
          icon={<Trash2 size={16} />} />
      </Table.Actions>
    )} />;
}
