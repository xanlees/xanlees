"use client";
import { Table, type TableFilterProps } from "@/shadcn/components/table";
import { type IProfile } from "@src/app/(protected)/(personal)/profile/interface/model";

export function FullNameColumn(accessorKey: string) {
  return (
    <Table.Column
      accessorKey={accessorKey}
      header={"ຊື່ແທ້(ຊຶ່ຫຼີ້ນ)"}
      id="fullname"
      enableSorting
      enableHiding
      filter={(props: TableFilterProps) => (
        <Table.Filter.Search {...props} title="Search Phone number" />
      )}
      cell={(props) => {
        const { fullname, nickname } = (props.row.original.profileId as IProfile) ?? {};
        return <p className="font-bold">{`${fullname} (${nickname})`}</p>;
      }}
    />
  );
}
