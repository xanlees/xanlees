"use client";
import { Table } from "@/shadcn/components/table";
import type { IApplication } from "../../interface";
import UpdateApplicationStatus from "@src/shadcn/components/updateOnSelect";
import { optionsConfig } from "../../lib/constant";

export const ApplicationStatusColumn = <Table.Column
  header="ສະຖານະຂອງຟອມ"
  id="application_status"
  accessorKey="applicationStatus"
  cell={(props) => {
    const { applicationStatus, id } = props.row.original as IApplication ?? {};
    const applicationID = id ?? 0;
    return <UpdateApplicationStatus defaultValue={applicationStatus} id={applicationID} optionsConfig={optionsConfig} field="applicationStatus" resource="application" />;
  }}
/>;

