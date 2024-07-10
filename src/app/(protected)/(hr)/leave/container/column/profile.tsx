import { Table, type TableFilterProps } from "@/shadcn/components/table";
import { type ILeaveExpand } from "../../lib";

export function FullNameColumn() {
  return (
    <Table.Column<ILeaveExpand>
      header={"ຊື່ ແລະ ນາມສະກຸນ (ຊື່ຫຼີ້ນ)"}
      accessorKey="fullname"
      id="fullname"
      enableSorting
      enableHiding
      filter={(props: TableFilterProps<ILeaveExpand>) => (
        <Table.Filter.Search {...(props as unknown as TableFilterProps)} title="ຊື່" />
      )}
      cell={(props) => {
        const fullName = props?.row?.original?.profile?.fullname as unknown as string;
        const nickName = props?.row?.original?.profile?.nickname as unknown as string;
        return <p className="font-bold">{`${fullName ?? ""} (${nickName ?? ""})`}</p>;
      }}
    />
  );
}

export function ProfileImageColumn() {
  return (
    <Table.Column<ILeaveExpand>
      header="ຮູບພາບ"
      id="image"
      accessorKey="user"
      cell={({ row }) => {
        return <div className="">
          <Table.TableImage row={row} accessorKey={"profilePicture"} />
        </div>;
      }}
    />
  );
}

