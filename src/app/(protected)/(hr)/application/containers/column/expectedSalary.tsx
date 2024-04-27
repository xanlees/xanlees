"use client";
import { Table } from "@/shadcn/components/table";
import { type IApplication } from "../../interface";

export const ExpectedSalary = (
  <Table.Column
    header="ເງິນເດືອນທີຕ້ອງການ"
    accessorKey="expectedSalary"
    id="expectedSalary"
    cell={(props) => {
      const { expectedSalary } = (props.row.original as IApplication) ?? {};
      const numericSalary = parseFloat(expectedSalary);
      const formattedSalary = numericSalary?.toLocaleString();
      return <p className="font-bold">{`${formattedSalary} ກີບ`}</p>;
    }}
  />
);
