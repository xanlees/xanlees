import { Table, type TableFilterProps } from "@/shadcn/components/table";
import { type UserProfileAccount } from "../../interface/model";

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
      const fullName = props?.row?.original?.fullname as unknown as string;
      const nickName = props?.row?.original?.nickname as unknown as string;
      return <p className="font-bold">{`${fullName ?? ""} (${nickName ?? ""})`}</p>;
    }}
  />
);

export function UserAccountColumn(userProfileData: UserProfileAccount[]) {
  return (
    <Table.Column
      header="ຢູເຊີ"
      id="id"
      accessorKey="id"
      cell={(props) => {
        const profileId = props?.row?.original?.id as unknown as number;
        const foundProfile = userProfileData?.find((profile) => profile?.profile === profileId)?.user?.username ?? "";
        return <>{foundProfile}</>;
      }}
    />
  );
}

