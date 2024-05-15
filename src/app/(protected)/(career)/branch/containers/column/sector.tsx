/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable max-lines */
import { Table } from "@/shadcn/components/table";
import { stringToColorCode } from "@src/lib/string2Color";

import { type IPosition } from "../../../position/interface";
import { type ISector } from "../../../sector/interface";
import { getSectorTypeName } from "../../lib";
import { Edit, Eye, Trash2 } from "lucide-react";

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

interface IActionsProps {
  original?: unknown
  resource: string
  hide?: boolean
}
function renderShowAction({ original, resource, hide }: IActionsProps) {
  if (!hide) {
    return (
      <Table.ShowAction
        title="Detail"
        row={original}
        resource={resource}
        icon={<Eye size={16} />}
      />
    );
  }
  return null;
}

function renderEditAction({ original, resource, hide }: IActionsProps) {
  if (!hide) {
    return (
      <Table.EditAction
        title="Edit"
        row={original}
        resource={resource}
        icon={<Edit size={16} />}
      />
    );
  }
  return null;
}

function renderDeleteAction({ original, resource, hide }: IActionsProps) {
  if (!hide) {
    return (
      <Table.DeleteAction
        title="Delete"
        row={original}
        withForceDelete={true}
        resource={resource}
        icon={<Trash2 size={16} />}
      />
    );
  }
  return null;
}

export function getActionsColumn({
  resource,
  hideShow = false,
  hideEdit = false,
  hideDelete = false,
}: {
  resource: string
  hideShow?: boolean
  hideEdit?: boolean
  hideDelete?: boolean
}): JSX.Element {
  return (
    <Table.Column
      accessorKey={"id"}
      id={"actions"}
      cell={({ row: { original } }) => (
        <Table.Actions>
          {renderShowAction({ original, resource, hide: hideShow })}
          {renderEditAction({ original, resource, hide: hideEdit })}
          {renderDeleteAction({ original, resource, hide: hideDelete })}
        </Table.Actions>
      )}
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
                    <Table.DeleteAction
                      title="Delete"
                      row={item}
                      withForceDelete={true}
                      resource={"sector"}
                      icon={<Trash2 size={16} />}
                    />
                    <Table.EditAction
                      title="Edit"
                      row={item}
                      resource={"sector"}
                      icon={<Edit size={16} />}
                    />
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
