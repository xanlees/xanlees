"use client";
import { Table, type TableFilterProps } from "@/shadcn/components/table";
import type { IApplication } from "../../interface";
import { UpdateDropdownSelect } from "../../../../../../common/components/DropdownSelectUpdateProps";

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
    return <UpdateDropdownSelect defaultValue={applicationStatus} id={applicationID} optionsConfig={options} field="applicationStatus" resource="application"/>;
  }}
/>;

export const options = [
  { value: "New", label: "ໃຫມ່" },
  { value: "Contacted", label: "ຕິດຕໍ່" },
  { value: "Interviewed", label: "ສຳພາດແລ້ວ" },
  { value: "Hired", label: "ຈ້າງເປັນພະນັກງານແລ້ວ" }
];