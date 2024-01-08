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
        const displayPosition = (positionData as { data?: IPosition[] })?.data?.find(
          (item) => item?.sectorId === sectorRecord?.id,
        ) as IPosition;
        return <div>{displayPosition?.name}</div>;
      }}
    />
  );
}

