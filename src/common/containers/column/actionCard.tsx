/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import { Table } from "@src/shadcn/components/table";
import { CardView } from "@src/shadcn/components/table/card-view";
import { Edit, Trash2 } from "lucide-react";

export function getActionsButton(resource: string) {
  return (
    <CardView.Row
      accessorKey={"id"}
      id={"actions"}
      isAction={true}
      cell={({ row: { original } }) => (
        <div className="top-0 right-0 absolute">
          <Table.Actions>
            <Table.EditAction
              title="ແກ້ໄຂ"
              row={original}
              resource={resource}
              icon={<Edit size={16} />}
            />
            <Table.DeleteAction
              title="ລົບ"
              row={original}
              withForceDelete={true}
              resource={resource}
              icon={<Trash2 size={16} />}
            />
          </Table.Actions>
        </div>
      )}
    />
  );
}
