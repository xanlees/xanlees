import { Table, type TableFilterProps } from "@/shadcn/components/table";
import type { IPosition, ISector } from "../../interface";
import { Badge } from "@src/shadcn/elements";

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
        <div key={positionIndex}>{`  - ${position?.name}`}</div>
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
      enableSorting
      enableHiding
      filter={(props: TableFilterProps) => (
        <Table.Filter.Search {...props} title="Search position" />
      )}
      cell={({ row: { original } }) => {
        const filteredSectorData = (
          sectorData as { data?: ISector[] }
        )?.data?.filter((item) => item?.branchId === original?.id) as ISector[];
        return (
          <div>
            {filteredSectorData?.map((sector, index) => (
              <div key={index}>
                <Badge>{`${sector?.name}`}</Badge>
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
