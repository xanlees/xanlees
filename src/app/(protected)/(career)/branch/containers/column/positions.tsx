import { Table } from "@/shadcn/components/table";
import { stringToColorCode } from "@src/lib/string2Color";
import { type IBranch, type IPosition } from "../../..";

export function positionsColumn(positionData: IPosition[], branches: IBranch[]) {
  return (
    <Table.Column
      header="ຕໍາແໜ່ງ"
      accessorKey="id"
      id="province"
      cell={({ row }) => {
        const provinceID = row?.original?.id as number;
        const matchingBranches = getMatchingBranches(branches, provinceID);
        const relevantPositions = filterPositions(positionData, matchingBranches);
        return (
          <div className="mx-2">
            {relevantPositions.map((position, index) => (
              <div key={index} className="text-center text-white rounded-full dark:bg-white mt-0.5"
                style={{ backgroundColor: stringToColorCode(position.sectorId.name) }}>
                - {position.sectorId.name} {position.name}
              </div>
            ))}
          </div>
        );
      }}
    />
  );
}

function getMatchingBranches(branches: IBranch[], provinceID: number): IBranch[] {
  return branches.filter((branch) => branch.province === provinceID);
}

function filterPositions(positionData: IPosition[], matchingBranches: IBranch[]): IPosition[] {
  const branchIds = matchingBranches.map((branch) => branch.id);
  return positionData.filter((position) =>
    branchIds.includes(position.sectorId.branchId),
  );
}
