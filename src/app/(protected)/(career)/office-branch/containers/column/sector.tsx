import { Table } from "@/shadcn/components/table";
import type { ISector } from "../../interface";
import { stringToColorCode } from "@src/lib/string2Color";

export function sectorColumn(sectorData: ISector[]) {
  return (
    <Table.Column
      header={"ຂະແໜງ"}
      accessorKey="id"
      id="sector"
      cell={({ row: { original } }) => {
        const displaySectors = (sectorData as { data?: ISector[] })?.data
          ?.filter((item) => item?.branchId === original.id)
          .map((sector) => sector?.name) as string[];
        return (
          <div>
            {displaySectors?.map((name, index) => (
              <div className="text-center text-white rounded-full dark:bg-white mt-0.5" style={{ backgroundColor: `${stringToColorCode(name)}` }}key={index}>- {name}</div>
            ))}
          </div>
        );
      }}
    />
  );
}
