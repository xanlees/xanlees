"use client";
import { Table, type TableFilterProps } from "@/shadcn/components/table";

export const PhoneNumberColumn = <Table.Column
  header={"ເບີໂທລະສັບ"}
  accessorKey="profileDetail.phoneNumber"
  id="phoneNumber"
  enableSorting
  enableHiding
  filter={(props: TableFilterProps) => (
    <Table.Filter.Search {...props} title="Search phoneNumber" />
  )}
  cell={(props) => {
    return <p className="-mx-5 italic text-blue-500 underline ">{`+856 ${props.getValue() as unknown as string}`}</p>;
  }} />;
