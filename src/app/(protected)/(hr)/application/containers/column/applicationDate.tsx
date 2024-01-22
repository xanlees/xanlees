"use client";
import { Table } from "@/shadcn/components/table";
import moment from "moment";

export const ApplicationDate = <Table.Column
  header="ສະໝັກວັນທີ"
  id="createdOn"
  accessorKey="createdOn"
  enableSorting
  enableHiding
  cell={(props) => {
    const createdOn = props.getValue();
    if (typeof createdOn === "string") {
      return moment(createdOn).format("DD MMM YYYY");
    }
    return "";
  }} />;
