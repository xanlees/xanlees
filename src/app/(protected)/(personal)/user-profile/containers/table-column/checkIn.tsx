import { Table } from "@/shadcn/components/table";
import { type IUserProfile, type IAttendance } from "../../interface";
import moment from "moment";
import { ProfileImageDialog } from "./checkOut";
import { type LateTimeProps } from "./workingHour";

export function CheckIn({ attendanceData }: { attendanceData: IAttendance[] }) {
  return (
    <Table.Column
      header="ເວລາປໍ້າເຂົ້າ"
      id="user"
      accessorKey="user"
      cell={({ row }) => {
        const userId = row?.original?.user as number;
        const checkInTime = attendanceData.find(
          (item) => item.user === userId,
        )?.checkIn;
        if (checkInTime === null) {
          return <>ຍັງບໍ່ທັນປໍ້າອອກ</>;
        } else if (typeof checkInTime === "string") {
          const formattedTime = moment(checkInTime).format("LTS");
          return <div className="flex">{formattedTime}</div>;
        }
        return <>ບໍ່ມີຂໍ້ມູນ</>;
      }}
    />
  );
}

export function CheckInImage({
  attendanceData,
}: {
  attendanceData: IAttendance[]
}) {
  return (
    <Table.Column
      header="ຮູບພາບປໍ້າເຂົ້າ"
      id="user"
      accessorKey="user"
      cell={({ row }) => {
        const userId = row?.original?.user as number;
        const image =
          attendanceData.find((item) => item.user === userId)?.image ?? "";
        return (
          <div className="">
            <ProfileImageDialog imageUrl={image} />
          </div>
        );
      }}
    />
  );
}

export function CheckInCheckOutTime({ employeeIsLatestData, workTimeSettingsData }: LateTimeProps) {
  return (
    <Table.Column<IUserProfile>
      header="ໂມງເຂົ້າ-ອອກວຽກ"
      id="lateTime"
      accessorKey="profile.id"
      cell={({ row }) => {
        const profileId = row.original.profile?.id;
        const employee = employeeIsLatestData.find((emp: { profileId: number }) => emp.profileId === profileId);
        if (!employee) {
          return <div>ບໍ່ມີຂໍ້ມູນ</div>;
        }
        const workTimeSetting = workTimeSettingsData.find(
          (wt: { branch: number }) => wt.branch === employee.branchId,
        );
        if (!workTimeSetting) {
          return <div>ບໍ່ມີຂໍ້ມູນ</div>;
        }
        return (
          <div className="">
            <div>{workTimeSetting.checkInTime} ໂມງເຂົ້າວຽກ</div>
            <div>{workTimeSetting.checkOutTime} ໂມງອອກວຽກ</div>
          </div>
        );
      }}
    />
  );
}
