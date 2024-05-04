"use client";

import { Edit, Trash2 } from "lucide-react";

import { CardView } from "@/shadcn/components/table/card-view";
import { Table } from "@src/shadcn/components/table";

import { type IWorkTimeSettings } from "../../interface";

export function getActionsButton({ resource }: { resource: string }) {
  return (
    <CardView.Row
      accessorKey={"id"}
      id={"actions"}
      isAction={true}
      cell={({ row }) => {
        const matchingBranches = row?.original?.workTimeSettings as IWorkTimeSettings[];
        return (
          <div className="absolute top-0 right-0">
            <Table.Actions>
              <Table.EditAction
                title="ແກ້ໄຂ"
                row={row?.original}
                resource={resource}
                icon={<Edit size={16} />}
              />
              <Table.DeleteAction
                title="ລົບ"
                row={matchingBranches?.[0]}
                withForceDelete={true}
                resource={resource}
                icon={<Trash2 size={16} />}
              />
            </Table.Actions>
          </div>
        );
      }}
    />
  );
}

