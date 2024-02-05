"use client";
import { Table, type TableFilterProps } from "@/shadcn/components/table";
import { type IApplication } from "../../interface";

export const ExpectedSalary = (
  <Table.Column
    header="ເງິນທີຕ້ອງການ"
    accessorKey="expectedSalary"
    id="expectedSalary"
    enableSorting
    enableHiding
    filter={(props: TableFilterProps) => (
      <Table.Filter.Search {...props} title="Search Position" />
    )}
    cell={(props) => {
      const { expectedSalary } = (props.row.original as IApplication) ?? {};
      const numericSalary = parseFloat(expectedSalary);
      const formattedSalary = numericSalary?.toLocaleString();
      return <p className="font-bold">{`${formattedSalary} ກີບ`}</p>;
    }}
  />
);
