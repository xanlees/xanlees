import { Table } from "@/shadcn/components/table";
import { stringToColorCode } from "@src/lib/string2Color";
import { type IPosition } from "../../../position/interface";
import { type ISector } from "../../../sector/interface";

export function sectorColumn({ sectorData, title }: { sectorData: ISector[], title: string }) {
  return (
    <Table.Column
      header={title}
      accessorKey="id"
      id="sector"
      cell={({ row: { original } }) => {
        const branchId = original?.id;
        const filteredSectors = sectorData?.filter((item) => item?.branchId === branchId);
        return (
          <div>
            {filteredSectors?.map((item, index) => (
              <div
                className="text-center text-white  dark:bg-white mt-0.5"
                style={{ backgroundColor: `${stringToColorCode(item?.name)}` }}
                key={index}
              >
                - {getSectorType(item?.name)} {item?.name}
              </div>
            ))}
          </div>
        );
      }}
    />
  );
}
function getSectorType(type: string) {
  switch (type) {
    case "Sector":
      return "ຂະແໜງ";
    case "Department":
      return "ຫ້ອງ";
    case "Unit":
      return "ໜ່ວຍບໍລິການ";
    case "Not specified":
      return "ບໍ່ລະບຸ";
    case "ALL":
      return "ລວມ";
    default:
      return "";
  }
}

export function positionsColumn({ positionData }: { positionData: IPosition[] }) {
  return (
    <Table.Column
      header={"ຕໍາແໜ່ງ (ສັງກັດຕາມສີ ພນ/ຂໜ)"}
      accessorKey="id"
      id="sector"
      cell={({ row: { original } }) => {
        const branchId = original?.id;
        const filteredSectors = positionData?.filter((branch) => branch?.sectorId?.branchId === branchId);
        return (
          <div>
            {filteredSectors?.map((item, index) => (
              <div
                className="text-center text-white  dark:bg-white mt-0.5"
                style={{ backgroundColor: `${stringToColorCode(item?.sectorId?.name)}` }}
                key={index}
              >
                {item?.name}
              </div>
            ))}
          </div>
        );
      }}
    />
  );
}

