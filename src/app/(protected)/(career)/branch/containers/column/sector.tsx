import { Table } from "@/shadcn/components/table";
import type { ISector } from "../../interface";

export function sectorColumn(sectorData: ISector[]) {
  return (
    <Table.Column
      header={"ຂະແໜງ"}
      accessorKey="id"
      id="sector"
      enableSorting
      enableHiding
      cell={({ row: { original } }) => {
        const displaySectors = (sectorData as { data?: ISector[] })?.data
          ?.filter((item) => item?.branchId === original.id)
          .map((sector) => sector?.name) as string[];
        return (
          <div>
            {displaySectors?.map((name, index) => (
              <div key={index}>{name}</div>
            ))}
          </div>
        );
      }}
    />
  );
}
