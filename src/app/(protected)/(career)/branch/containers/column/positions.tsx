import { Table } from "@/shadcn/components/table";
import { stringToColorCode } from "@src/lib/string2Color";
import { type IPosition, type ISector } from "../../..";

function renderPositionData({
  positionData,
  sectorId,
}: {
  positionData: IPosition[]
  sectorId: number | undefined
}) {
  return (
    (positionData as { data?: IPosition[] }).data
      ?.filter((position) => position?.sectorId.id === sectorId as any)
      ?.flatMap((position, positionIndex) => (
        <div className="text-center text-white rounded-full dark:bg-white mt-0.5 w-1/2" style={{ backgroundColor: `${stringToColorCode(position?.sectorId.name)}` }} key={positionIndex}>{`- ${position?.name}`}</div>
      )) ?? []
  );
}

export function positionsColumn(
  sectorData: ISector[],
  positionData: IPosition[],
) {
  return (
    <Table.Column
      header="ຕໍາແໜ່ງ"
      accessorKey="id"
      id="position"
      cell={({ row: { original } }) => {
        console.log("sectorData", sectorData);
        console.log("positionData", positionData);
        const filteredSectorData = (
          sectorData as { data?: ISector[] }
        )?.data?.filter((item) => item?.branchId === original?.id as any) as ISector[];
        return (
          <div>
            {filteredSectorData?.map((sector, index) => (
              <div key={index}>
                {renderPositionData({
                  positionData,
                  sectorId: sector?.id,
                })}
              </div>
            ))}
          </div>
        );
      }}
    />
  );
}
