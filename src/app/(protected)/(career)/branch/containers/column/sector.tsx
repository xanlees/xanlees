import { Table } from "@/shadcn/components/table";
import { stringToColorCode } from "@src/lib/string2Color";
import { type ISector } from "../../..";

export function sectorColumn(sectorData: ISector[]) {
  return (
    <Table.Column
      header={"ຂະແໜງ"}
      accessorKey="id"
      id="sector"
      cell={({ row: { original } }) => {
        const displaySectors = (sectorData as { data?: ISector[] })?.data
          ?.filter((item) => item?.branchId === original.id as any)
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
