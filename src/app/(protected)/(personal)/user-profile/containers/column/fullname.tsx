import { Table, type TableFilterProps } from "@/shadcn/components/table";

interface IProfile {
  fullname: string
  nickname: string
}

export const FullNameColumn = (
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
      const { fullname, nickname } = (props.row.original.profile as IProfile) ?? {};
      return <p className="font-bold">{`${fullname ?? ""} (${nickname ?? ""})`}</p>;
    }}
  />
);
