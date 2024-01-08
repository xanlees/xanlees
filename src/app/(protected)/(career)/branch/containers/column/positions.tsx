import { Table, type TableFilterProps } from "@/shadcn/components/table";
import type { IPosition, ISector } from "../../interface";

export function positionsColumn(sectorData: ISector[], positionData: IPosition[]) {
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
        const sectorRecord = (sectorData as { data?: ISector[] })?.data?.find(
          (item) => item?.branchId === original.id,
        ) as ISector;
        const displayPositionNames = (positionData as { data?: IPosition[] })?.data
          ?.filter((item) => item?.sectorId === sectorRecord?.id)
          .map((position) => position?.name) as string[];
        return <div>{displayPositionNames?.map((position) => (<div>{`- ${position}`}</div>))}</div>;
      }}
    />
  );
}
