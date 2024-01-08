import { Table } from "@/shadcn/components/table";
import type { ISector } from "../../interface";

export function sectorColumn(sectorData: ISector[]) {
  return (
    <Table.Column
      header={"ຂະແໜງ"}
      accessorKey="id"
      id="id"
      enableSorting
      enableHiding
      cell={({ row: { original } }) => {
        const displaySector = (sectorData as { data?: ISector[] })?.data?.find(
          (item) => item?.branchId === original.id,
        ) as ISector;
        return <div>{displaySector?.name}</div>;
      }}
    />
  );
}
