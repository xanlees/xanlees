"use client";
import { Table, type TableFilterProps } from "@/shadcn/components/table";
import type { IProfile } from "../../interface";

export function FullNameColumn(accessorKey: string) {
  return (
    <Table.Column
      accessorKey={accessorKey}
      header={"ຊື່ ແລະ ນາມສະກຸນ (ຊຶ່ຫຼີ້ນ)"}
      id="fullname"
      enableSorting
      enableHiding
      filter={(props: TableFilterProps) => (
        <Table.Filter.Search {...props} title="Search Fullname" />
      )}
      cell={(props) => {
        const { fullname, nickname } = (props.row.original.profileId as IProfile) ?? {};
        return <p className="font-bold">{`${fullname} (${nickname})`}</p>;
      }}
    />
  );
}
