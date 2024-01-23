"use client";
import { Table, type TableFilterProps } from "@/shadcn/components/table";
import type { IProfile } from "../../interface";

export const FullNameColumn = <Table.Column
  header={"ຊື່ ແລະ ນາມສະກຸນ (ຊຶ່ຫຼີ້ນ)"}
  accessorKey="profileDetail.fullname"
  id="fullname"
  enableSorting
  enableHiding
  filter={(props: TableFilterProps) => (
    <Table.Filter.Search {...props} title="Search fullname" />
  )}
  cell={(props) => {
    const { fullname, nickname } = props.row.original.profileDetail as IProfile ?? {};
    return <p className="font-bold">{`${fullname} (${nickname})`}</p>;
  }} />;

