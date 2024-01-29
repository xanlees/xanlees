"use client";
import { Table, TableFilterProps } from "@/shadcn/components/table";
import { IApplication } from "../../interface";

export const PositionAppliedFor = <Table.Column
  header="ສະໝັກຕໍາແໜ່ງ"
  accessorKey="positionAppliedFor"
  id="positionAppliedFor"
  enableSorting
  enableHiding
  filter={(props: TableFilterProps) => (
    <Table.Filter.Search {...props} title="Search Position" />
  )}
  cell={(props) => {
    const { positionAppliedFor } = props.row.original as IApplication ?? {};
    return <p className="font-bold">{`${positionAppliedFor}`}</p>;
  }} />;