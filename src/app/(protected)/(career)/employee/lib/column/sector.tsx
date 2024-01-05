/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import { Table } from "@/shadcn/components/table";

export function getSector(sectorData: any) {
  return <Table.Column
    header="ສັງກັດ"
    id="sector"
    accessorKey="positionDetail.id"
    enableSorting
    enableHiding
    cell={({ row }) => {
      const displayText = sectorData?.data.find(
        (item: { id: number }) => item?.id === row.original.positionDetail.sectorId,
      );
      return <div>{`${displayText?.name}, ${displayText?.branchDetail?.name}`}</div>;
    }} />;
}
