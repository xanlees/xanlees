import { Table } from "@/shadcn/components/table";
import { type IBranch } from "../../interface";
import { type ISector } from "../../../sector/interface";
import { stringToColorCode } from "@src/lib/string2Color";

export function sectorColumn({ sectorData, branchData, title }: { sectorData: ISector[], branchData: IBranch[], title: string }) {
  return (
    <Table.Column
      header={title}
      accessorKey="id"
      id="sector"
      cell={({ row }) => {
        const currentBranchId = row.original.id as number;
        const relevantSectors = getRelevantSectors({ currentBranchId, sectorData, branchData });
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

function getRelevantSectors({ currentBranchId, sectorData, branchData }: { currentBranchId: number, sectorData: ISector[], branchData: IBranch[] }): ISector[] {
  const matchingBranches = getMatchingBranches(currentBranchId, branchData);
  return filterSectors(matchingBranches, sectorData);
}

function getMatchingBranches(branchId: number, branchData?: IBranch[]): IBranch[] {
  if (!branchData) {
    return [];
  }
  return branchData.filter((branch) => branch?.province === branchId);
}

function filterSectors(matchingBranches?: IBranch[], sectorData?: ISector[]): ISector[] {
  if (!sectorData || !matchingBranches) {
    return [];
  }
  const branchIds = matchingBranches.map((branch) => branch.id);
  return sectorData.filter((sector) => {
    const sectorBranchId = sector?.branchId as unknown as number;
    return branchIds.includes(sectorBranchId);
  });
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
