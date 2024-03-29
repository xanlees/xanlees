import { Table } from "@/shadcn/components/table";
import type { IPosition, ISector } from "../../interface";
import { stringToColorCode } from "@src/lib/string2Color";

function renderPositionData({
  positionData,
  sectorId,
}: {
  positionData: IPosition[]
  sectorId: number | undefined
}) {
  return (
    (positionData as { data?: IPosition[] }).data
      ?.filter((position) => position?.sectorId === sectorId)
      ?.flatMap((position, positionIndex) => (
        <div className="text-center text-white rounded-full dark:bg-white mt-0.5" style={{ backgroundColor: `${stringToColorCode(position?.sectorDetail.name)}` }} key={positionIndex}>{`- ${position?.name}`}</div>
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
        const filteredSectorData = (
          sectorData as { data?: ISector[] }
        )?.data?.filter((item) => item?.branchId === original?.id) as ISector[];
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
