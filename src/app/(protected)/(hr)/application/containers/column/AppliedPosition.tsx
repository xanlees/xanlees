"use client";
import { Table, type TableFilterProps } from "@/shadcn/components/table";
import { type IApplication } from "../../interface";

export const AppliedPosition = (
  <Table.Column
    header="ສະໝັກຕໍາແໜ່ງ"
    accessorKey="tagId"
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

export const TagIDColumn = (
  <Table.Column
    header="ເລກລະຫັດຟອມ"
    accessorKey="tagId"
    id="tagId"
    enableSorting
    enableHiding
    filter={(props: TableFilterProps) => (
      <Table.Filter.Search {...props} title="Search Tag Id" />
    )}
    cell={(props) => {
      const { tagId } = (props.row.original as IApplication) ?? {};
      return <p className="font-bold">{`${tagId}`}</p>;
    }}
  />
);
