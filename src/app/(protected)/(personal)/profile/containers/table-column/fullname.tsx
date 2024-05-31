import { Table, type TableFilterProps } from "@/shadcn/components/table";
import { type UserProfileAccount } from "../../interface/model";
import moment from "moment";
import { Badge } from "@src/shadcn/elements";

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
      header="ບັນຊີເຂົ້າ​ສູ່​ລະ​ບົບ"
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

export const DateOfBirth = <Table.Column
  header="ວັນເດືອນປີ ເກີດ"
  id="birthday"
  accessorKey="birthday"
  cell={(props) => {
    const dateValue = props.getValue();
    if (typeof dateValue === "string") {
      return moment(dateValue).format("DD MMM YYYY");
    }
    return "";
  }} />;

export function ProfileStatus() {
  return <Table.Column
    header="ລະງັບບັນຊີ"
    id="type"
    accessorKey="type"
    cell={({ row }) => {
      const type = row.original.type as unknown as string;
      return (<div className="-mx-2">
        <Badge className="bg-gray-400">{getTypeDisplayText(type)}</Badge>
      </div>
      );
    }} />;
}

const getTypeDisplayText = (type: string): string => {
  switch (type) {
    case "AGENT":
      return "ປົກກະຕິ";
    case "BLOCK":
      return "ບລັອກ";
    default:
      return "";
  }
};

