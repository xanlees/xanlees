import { Table } from "@/shadcn/components/table";
import { type IBranch } from "../../interface";
import { Trash2 } from "lucide-react";

export function branchColumn(provinces: IBranch[]) {
  return (
    <Table.Column
      header={"ຫ້ອງການ"}
      accessorKey="id"
      id="branchId"
      enableSorting
      enableHiding
      cell={({ row }) => {
        const currentId = row?.original?.id as unknown as number;
        const matchingProvinces = provinces.filter((province) => province.province === currentId);
        return (
          <div className="mx-2">
            {matchingProvinces.map((item) => {
              const displayText = getDisplayText(item.type);
              return (
                <div key={item.id}>{displayText} {item.name}</div>
              );
            })}
          </div>
        );
      }}
    />
  );
}

function getDisplayText(type: string) {
  switch (type) {
    case "HEADQUARTERS":
      return "ຫ້ອງໃຫຍ່";
    case "OFFICE":
      return "ຫ້ອງການ";
    case "BRANCH":
      return "ສາຂາ";
    case "LOTTERY":
      return "ຫວຍ";
    default:
      return "";
  }
}

export function ProvinceColumn() {
  return (
    <Table.Column
      header="ແຂວງ"
      id="provinceName"
      accessorKey="provinceName"
      cell={({ row }) => {
        const displayText = row.original.provinceName as unknown as string;
        return (
          <div className="mx-2">
            {displayText}
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
        const branchId = matchingBranches?.[0]?.id;
        return (
          <Table.Actions>
            <Table.DeleteAction
              title="Delete"
              row={matchingBranches?.[0]}
              withForceDelete={true}
              resource={resource}
              settingId={branchId}
              icon={<Trash2 size={16} />}
            />
          </Table.Actions>
        );
      }}
    />
  );
}
