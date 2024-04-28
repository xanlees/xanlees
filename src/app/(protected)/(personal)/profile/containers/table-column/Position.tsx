"use client";
import { Table } from "@/shadcn/components/table";

export const Position = <Table.Column
  header="ຕຳແໜ່ງ"
  id="position"
  accessorKey="positionDetail.name"
  enableSorting
  enableHiding
  cell={(props) => {
    const position = props?.getValue<string>();
    return <div>{position ?? ""}</div>;
  }} />;
