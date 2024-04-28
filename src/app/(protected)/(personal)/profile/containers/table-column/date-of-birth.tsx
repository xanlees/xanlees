"use client";
import { Table } from "@/shadcn/components/table";
import moment from "moment";

export const DateOfBirth = <Table.Column
  header="ວັນເດືອນປີ ເກີດ"
  id="birthday"
  accessorKey="birthday"
  cell={(props) => {
    const dateValue = props.getValue();
    if (typeof dateValue === "string") {
      return moment(dateValue).format("DD MMM YYYY");
    }
    return "";
  }} />;
