import { Table } from "@/shadcn/components/table";
import { type IProfile } from "@personal";
import { cn } from "@src/lib/utils";
import { Badge } from "@src/shadcn/elements";

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
      id="user"
      accessorKey="user"
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
      id="user"
      accessorKey="user"
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

export function AttendanceColumn({ data, header, className }: { data: Array<{ user: number, value: number }>, header: string, className?: string }) {
  return (
    <Table.Column
      header={header}
      id="user"
      accessorKey="user"
      cell={(props) => {
        const user = props.getValue() as unknown as number;
        const value = data.find((item) => item.user === user);
        return (
          <>
            {value
              ? (<Badge className={cn(className)}>{value.value}</Badge>)
              : null
            }
          </>
        );
      }}
    />
  );
}
