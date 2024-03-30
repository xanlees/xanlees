/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import { Table, type TableFilterProps } from "@/shadcn/components/table";

export const FullNameColumn = <Table.Column
  header={"ຊື່ ແລະ ນາມສະກຸນ (ຊຶ່ຫຼີ້ນ)"}
  accessorKey="fullname"
  id="fullname"
  enableSorting
  enableHiding
  filter={(props: TableFilterProps) => (
    <Table.Filter.Search {...props} title="Search fullname" />
  )}
  cell={(props) => {
    const fullName = props.row.original.fullname;
    const nickName = props.row.original.nickname;
    return <p className="font-bold">{`${fullName} (${nickName})`}</p>;
  }} />;
