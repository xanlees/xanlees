"use client";
import { Table } from "@/shadcn/components/table";
import { Badge } from "@src/shadcn/elements";
import type { IPosition } from "@career";
import { type IProfile } from "../../interface/model";

export function getLatestPosition({ positionId, positionData, title }: { positionId: number[], positionData: { data: IPosition[] }, title: string }) {
  return <Table.Column
    header={title}
    id="employee"
    accessorKey="employee"
    cell={({ row }) => {
      const latestPositionId = positionId[row.index];
      const employee = (row.original as IProfile).employee;
      if (employee.length > 0) {
        const positionDetail = positionData?.data.find((item) => item?.id === latestPositionId);
        const displayText = (positionDetail !== undefined) ? `${positionDetail?.name} (${positionDetail?.sectorId?.name})` : "ລໍຖ້າບັນຈູ";
        return (
          <div className="">
            <Badge className="bg-gray-400">{displayText}</Badge>
          </div>
        );
      }
      return <></>;
    }} />;
}
