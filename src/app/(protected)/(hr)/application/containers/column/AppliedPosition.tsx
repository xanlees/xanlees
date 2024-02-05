"use client";
import { Table, type TableFilterProps } from "@/shadcn/components/table";
import { type IApplication } from "../../interface";

export const AppliedPosition = (
  <Table.Column
    header="ສະໝັກຕໍາແໜ່ງ"
    accessorKey="appliedPosition"
    id="appliedPosition"
    enableSorting
    enableHiding
    filter={(props: TableFilterProps) => (
      <Table.Filter.Search {...props} title="Search Position" />
    )}
    cell={(props) => {
      const { appliedPosition } = (props.row.original as IApplication) ?? {};
      return <p className="font-bold">{`${appliedPosition}`}</p>;
    }}
  />
);
