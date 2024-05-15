import { Table } from "@/shadcn/components/table";
import { stringToColorCode } from "@src/lib/string2Color";

import { type IPosition } from "../../../position/interface";
import { type ISector } from "../../../sector/interface";
import { getSectorTypeName } from "../../lib";
import { Edit, Trash2 } from "lucide-react";

export function positionsColumn({ positionData }: { positionData: IPosition[] }) {
  return (
    <Table.Column
      header={"ຕໍາແໜ່ງ (ສັງກັດຕາມສີ ພນ/ຂໜ)"}
      accessorKey="id"
      id="positions"
      cell={({ row: { original } }) => {
        const branchId = original?.id;
        const filteredSectors = positionData?.filter((branch) => branch?.sectorId?.branchId === branchId);
        return (
          <div>
            {filteredSectors?.map((item, index) => (
              <div className="flex w-full">
                <div className="justify-center text-center text-white  dark:bg-white mt-0.5 w-full" style={{ backgroundColor: `${stringToColorCode(item?.sectorId?.name)}` }} key={index} >
                  {item?.name}  {item.id}
                </div>
                <div className=" justify-end">
                  <Table.Actions>
                    <DeleteActionContainer row={item} resource={"position"} />
                    <EditActionContainer row={item} resource={"position"} />
                  </Table.Actions>
                </div>
              </div>
            ))}

          </div>

        );
      }}
    />
  );
}

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
              <div className="flex w-full">
                <div className=" justify-center text-center text-white  dark:bg-white mt-0.5 w-full" style={{ backgroundColor: `${stringToColorCode(item?.name)}` }} key={index} >
                  {getSectorTypeName(item?.type)} {item?.name} {item.id}
                </div>
                <div className=" justify-end">
                  <Table.Actions>
                    <DeleteActionContainer row={item} resource={"sector"} />
                    <EditActionContainer row={item} resource={"sector"} />
                  </Table.Actions>
                </div>
              </div>
            ))}
          </div>
        );
      }}
    />
  );
}

interface DeleteActionProps {
  row: unknown
  resource: string
}

export const DeleteActionContainer = ({ row, resource }: DeleteActionProps): JSX.Element => {
  return (
    <Table.DeleteAction
      title="Delete"
      row={row}
      withForceDelete={true}
      resource={resource}
      icon={<Trash2 size={16} />}
    />
  );
};

export const EditActionContainer = ({ row, resource }: DeleteActionProps): JSX.Element => {
  return (
    <Table.EditAction
      title="Edit"
      row={row}
      resource={resource}
      icon={<Edit size={16} />}
    />
  );
};
