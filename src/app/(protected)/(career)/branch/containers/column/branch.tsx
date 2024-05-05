import { Table } from "@/shadcn/components/table";
import type { IBranchExpand, IBranch } from "../../interface";
import { Trash2 } from "lucide-react";
import { getDisplayBranchName } from "../../lib";

export function branchColumn() {
  return (
    <Table.Column
      header={"ຫ້ອງການ"}
      accessorKey="id"
      id="branchId"
      enableSorting
      enableHiding
      cell={({ row: { original } }) => {
        const branchName = original.name as unknown as string;
        const branchType = original.type as unknown as string;
        return (
          <div>{getDisplayBranchName(branchType)} {branchName} </div>
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
