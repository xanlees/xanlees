import { Table } from "@/shadcn/components/table";
import { type IBranch } from "../../interface";
import { type ISector } from "../../../sector/interface";
import { stringToColorCode } from "@src/lib/string2Color";
export function sectorColumn(sectorData: ISector[], branch: IBranch[], title: string) {
  return (
    <Table.Column
      header={title}
      accessorKey="id"
      id="sector"
      cell={({ row }) => {
        const currentBranchId = row.original.id as number;
        const matchingBranches = branch.filter((branch) => branch.province === currentBranchId);
        const relevantSectors = sectorData.filter((sector) => 
          matchingBranches.some((branch) => branch.id === sector.branchId),
        );
        return (
          <div>
            {relevantSectors?.map((item, index) => (
              <div
                className="text-center text-white rounded-full dark:bg-white mt-0.5"
                style={{ backgroundColor: `${stringToColorCode(item.name)}` }}
                key={index}
              >
                - {getSectorType(item.type)} {item.name}
              </div>
            ))}
          </div>
        );
      }}
    />
  );
}

function getSectorType(type: string) {
  switch (type) {
    case "Sector":
      return "ຂະແໜງ";
    case "Department":
      return "ຫ້ອງ";
    case "Unit":
      return "ໜ່ວຍບໍລິການ";
    case "Not specified":
      return "ບໍ່ລະບຸ";
    case "ALL":
      return "ລວມ";
    default:
      return "";
  }
}
