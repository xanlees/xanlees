"use client";
import { Table } from "@/shadcn/components/table";
import type { IPosition, IProfile } from "../../interface";

export function getLatestPosition(positionId: number[], positionData: { data: IPosition[] }) {
  return <Table.Column
    header="ຕຳແໜ່ງ"
    id="employee"
    accessorKey="employee"
    cell={({ row }) => {
      const latestPositionId = positionId[row.index];
      const employee = (row.original as IProfile).employee;
      if (employee.length > 0) {
        const positionDetail = positionData?.data.find((item) => item?.id === latestPositionId);
        const displayText = (positionDetail !== undefined) ? `${positionDetail?.name} (${positionDetail?.sectorDetail?.name})` : "";
        return (
          <div>
            {displayText}
          </div>
        );
      }
      return <></>;
    }} />;
}
