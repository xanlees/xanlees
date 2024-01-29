"use client";
import { Table, type TableFilterProps } from "@/shadcn/components/table";
import type { IApplication } from "../../interface";
import { SelectColumn } from "./SelectColumn";

export const ApplicationStatusColumn = <Table.Column
  header="ສະຖານະຂອງຟອມ"
  id="application_status"
  accessorKey="applicationStatus"
  enableSorting
  enableHiding
  filter={(props: TableFilterProps) => (
    <Table.Filter.Search {...props} title="Search applicationStatus" />
  )}
  cell={(props) => {
    const { applicationStatus, id } = props.row.original as IApplication ?? {};
    const applicationID = id ?? 0;
    return <SelectColumn applicationStatus={applicationStatus} id={applicationID} />;
  }}
/>;
