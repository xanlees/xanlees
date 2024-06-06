import { Table } from "@/shadcn/components/table";
import { type IProfile } from "@personal";
import { type IEmployee } from "@career";

interface IUserProfileExpand {
  id: number
  user: number
  profile: IProfile
}
interface FullnameColumnProps {
  userProfileData: IUserProfileExpand[]
}

export function FullnameColumn({ userProfileData }: FullnameColumnProps) {
  return (
    <Table.Column
      header="ຊື່ ແລະ ນາມສະກຸນ (ຊຶ່ຫຼີ້ນ)"
      id="user" accessorKey="user"
      cell={(props) => {
        const user = props.getValue() as unknown as number;
        const userProfile = userProfileData.find((profile) => profile.user === user);
        const fullname = userProfile?.profile?.fullname;
        const nickname = userProfile?.profile?.nickname;
        return (
          <>
            {userProfile ? `${fullname}${nickname ? ` (${nickname})` : ""}` : "ບໍ່ມີຂໍ້ມູນ"}
          </>
        );
      }}
    />
  );
}
export function PhoneNumberColumn({ userProfileData }: FullnameColumnProps) {
  return (
    <Table.Column
      header="ເບີໂທ"
      id="user" accessorKey="user"
      cell={(props) => {
        const user = props.getValue() as unknown as number;
        const userProfile = userProfileData.find((profile) => profile.user === user);
        const phoneNumber = userProfile?.profile?.phoneNumber;
        return (
          <>
            {userProfile ? `${phoneNumber}` : "ບໍ່ມີຂໍ້ມູນ"}
          </>
        );
      }}
    />
  );
}

export function TotalEarningColumn({ data }: { data: Array<{ user: number, value: number }> }) {
  return (
    <Table.Column
      header="ເງິນເດືອນໄດ້ຮັບ"
      id="user" accessorKey="user"
      cell={(props) => {
        const user = props.getValue() as unknown as number;
        const value = data?.find((item) => item?.user === user)?.value;
        const roundedValue = Math.floor(Number(value));
        return (
          <>{`${roundedValue.toLocaleString()} ກີບ`}</>
        );
      }}
    />
  );
}
export function SalaryColumn({ userProfileData, employeeData }: FullnameColumnProps & { employeeData: IEmployee[] }) {
  return (
    <Table.Column
      header="ເງິນເດືອນ"
      id="user" accessorKey="user"
      cell={(props) => {
        const user = props.getValue() as unknown as number;
        const profile = userProfileData.find((profile) => profile.user === user)?.profile?.id;
        const employee = employeeData.find((eml) => eml.profileId === profile)?.salary;
        return (
          <>{`${Number(employee)?.toLocaleString()} ກີບ`}</>
        );
      }}
    />
  );
}
