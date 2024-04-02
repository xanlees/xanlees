
"use client";
import { Table, type TableFilterProps } from "@/shadcn/components/table";

export function FullNameColumn() {
  return (
    <Table.Column
      header={"ຊື່ ແລະ ນາມສະກຸນ (ຊຶ່ຫຼີ້ນ)"}
      accessorKey="fullname"
      id="fullname"
      enableSorting
      enableHiding
      filter={(props: TableFilterProps) => (
        <Table.Filter.Search {...props} title="Search fullname" />
      )}
      cell={(props) => {
        const fullName = props.row.original.fullname as string;
        const nickName = props.row.original.nickname as string;
        return <p className="font-bold">{`${fullName} (${nickName})`}</p>;
      }} />
  );
}
