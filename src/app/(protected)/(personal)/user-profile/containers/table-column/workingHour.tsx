import { Table } from "@/shadcn/components/table";
import { type IWorkTimeSettings, type IAttendance, type IUserProfile } from "../../interface";
import moment from "moment";
import { type IEmployee } from "../../../index";
import { Badge } from "@src/shadcn/elements";
import addMinutes from "date-fns/addMinutes";
import differenceInMinutes from "date-fns/differenceInMinutes";

export function workingHour({ attendanceData }: { attendanceData: IAttendance[] }) {
  return (
    <Table.Column
      header="ຊົ່ວ​ໂມງ​ເຮັດ​ວຽກ"
      id="workingHours"
      accessorKey="workingHours"
      cell={({ row }) => {
        const userId = row?.original?.user as number;
        const attendanceRecord = attendanceData.find((item) => item.user === userId);
        if (!attendanceRecord?.checkIn || !attendanceRecord.checkOut) {
          return <div>ບໍ່ມີຂໍ້ມູນ</div>;
        }
        const checkInTime = moment(attendanceRecord.checkIn);
        const checkOutTime = moment(attendanceRecord.checkOut);
        if (!checkInTime.isValid() || !checkOutTime.isValid()) {
          return <div>ບໍ່ມີຂໍ້ມູນ</div>;
        }
        const duration = moment.duration(checkOutTime.diff(checkInTime));
        const hours = Math.floor(duration.asHours());
        const minutes = duration.minutes();
        const seconds = duration.seconds();
        const formattedDuration = `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
        return <div>{formattedDuration} {"ຊົ່ວ​ໂມງ​"}</div>;
      }}
    />
  );
}

interface LateTimeProps {
  employeeIsLatestData: IEmployee[]
  workTimeSettingsData: IWorkTimeSettings[]
  attendanceData: IAttendance[]
}

export function EmployeeLateStatus({ employeeIsLatestData, workTimeSettingsData, attendanceData }: LateTimeProps) {
  return (
    <Table.Column<IUserProfile>
      header="ສະຖານະ" id="lateTime" accessorKey="profile.id"
      cell={({ row }) => {
        const profileId = row.original.profile?.id;
        const userId = row.original.user;
        const employee = employeeIsLatestData.find((emp: { profileId: number }) => emp.profileId === profileId);
        if (!employee) {
          return <div>ບໍ່ມີຂໍ້ມູນ</div>;
        }
        const workTimeSetting = workTimeSettingsData.find((wt: { branch: number }) => wt.branch === employee.branchId);
        if (!workTimeSetting) {
          return <div>ບໍ່ມີຂໍ້ມູນ</div>;
        }
        const attendance = attendanceData.find((item: { user: number }) => item.user === userId);
        if (!attendance) {
          return <Badge className="bg-red-600">ບໍ່ມາການ</Badge>;
        }
        const lateTime = workTimeSetting.lateTime ?? "1";
        const actualCheckIn = new Date(attendance.checkIn);
        const scheduledCheckIn = getScheduledCheckIn(workTimeSetting, actualCheckIn);
        const lateTimeAllowed = parseInt(lateTime, 10);
        const allowedCheckInTime = addMinutes(scheduledCheckIn, lateTimeAllowed);
        const minutesLate = differenceInMinutes(actualCheckIn, allowedCheckInTime);
        return minutesLate > 0 ? <div>{formatLateTime(minutesLate)}</div> : <div>ຕົງເວລາ</div>;
      }}
    />
  );
}

function getScheduledCheckIn(workTimeSetting: { checkInTime: string }, actualCheckIn: string | number | Date) {
  const scheduledCheckIn = new Date(actualCheckIn);
  scheduledCheckIn.setHours(parseInt(workTimeSetting.checkInTime.split(":")[0]));
  scheduledCheckIn.setMinutes(parseInt(workTimeSetting.checkInTime.split(":")[1]));
  return scheduledCheckIn;
}

function formatLateTime(minutesLate: number) {
  const minutesInHour = 60;
  const hours = Math.floor(minutesLate / minutesInHour);
  const minutes = minutesLate % minutesInHour;
  return `${hours > 0 ? `${hours}h ` : ""}${minutes}min late`;
}
