import { Trash2 } from "lucide-react";

import { Table } from "@/shadcn/components/table";

import { getDisplayBranchName } from "../../lib";

import type { IBranchExpand, IBranch } from "../../interface";
import { DeleteActionContainer, EditActionContainer } from "./sector";

export function branchColumn({ title }: { title: string }) {
  return (
    <Table.Column
      header={title}
      accessorKey="id"
      id="branchId"
      enableSorting
      enableHiding
      cell={({ row }) => {
        const branchName = row.original.name as unknown as string;
        const branchType = row.original.type as unknown as string;
        return (
          <div>
            <div className="flex w-full">
              <div className=" justify-center text-center text-white mt-1.5" >
                {getDisplayBranchName(branchType)} {branchName}
              </div>
              <div className=" justify-end">
                <Table.Actions>
                  <DeleteActionContainer row={row.original} resource={"branch"} />
                  <EditActionContainer row={row.original} resource={"branch"} />
                </Table.Actions>
              </div>
            </div>

          </div>
        );
      }}
    />
  );
}

export function ProvinceColumn() {
  return (
    <Table.Column<IBranchExpand>
      header="ແຂວງ"
      id="provinceName"
      accessorKey="province.provinceName"
      cell={({ row: { original } }) => {
        const provinceName = original?.province?.provinceName;
        return (
          <div className="mx-2">
            {provinceName ?? ""}
          </div>
        );
      }}
    />
  );
}

export function getBrachActionsColumn({ resource, branchData }: { resource: string, branchData: IBranch[] }) {
  return (
    <Table.Column
      accessorKey={"id"}
      id={"actions"}
      cell={({ row }) => {
        const provinceID = row?.original?.id as number;
        const matchingBranches = branchData?.filter((branch) => branch.province === provinceID);
        return (
          <Table.Actions>
            <Table.DeleteAction
              title="Delete"
              row={matchingBranches?.[0]}
              withForceDelete={true}
              resource={resource}
              icon={<Trash2 size={16} />}
            />
          </Table.Actions>
        );
      }}
    />
  );
}
