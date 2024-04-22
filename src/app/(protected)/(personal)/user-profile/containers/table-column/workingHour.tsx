import { Table } from "@/shadcn/components/table";
import { type IWorkTimeSettings, type IAttendance } from "../../interface";
import moment from "moment";
import { type IEmployee } from "../../../index";
import { Badge } from "@src/shadcn/elements";
import { parseISO, addMinutes, differenceInMinutes } from "date-fns";

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
const minutesPerHour = 60;
interface TableRow {
  original: {
    profile?: {
      id?: number
    }
    user?: number
  }
}
export function lateTime({ employeeIsLatestData, workTimeSettingsData, attendanceData }: LateTimeProps): JSX.Element {
  return (
    <Table.Column
      header="ສະຖານະ" id="lateTime" accessorKey="profile.id"
      cell={({ row }: { row: TableRow }) => {
        const profileId = row?.original?.profile?.id as number;
        const userId = row?.original?.user as number;
        const employee = employeeIsLatestData.find((emp) => emp.profileId?.id === profileId);
        if (!employee) {
          return <div>Employee data not available</div>;
        }
        const workTimeSetting = workTimeSettingsData.find((wt) => wt.branch === employee.branchId);
        if (!workTimeSetting) {
          return <div>ບໍ່ມາການເວລາເຂົ້າວຽກ</div>;
        }
        const attendance = attendanceData.find((item) => item.user === userId);
        if (!attendance) {
          return <Badge className="bg-red-600">ບໍ່ມາການ</Badge>;
        }
        const scheduledCheckIn = parseISO(workTimeSetting.checkInTime);
        const lateTimeAllowed = parseInt(workTimeSetting.lateTime, 10);
        const allowedCheckInTime = addMinutes(scheduledCheckIn, lateTimeAllowed);
        const actualCheckIn = parseISO(attendance.checkIn);
        const minutesLate = differenceInMinutes(actualCheckIn, allowedCheckInTime);

        if (minutesLate > 0) {
          const hours = Math.floor(minutesLate / minutesPerHour);
          const minutes = minutesLate % minutesPerHour;
          return <div>{hours > 0 ? `${hours}h ` : ""}{minutes}min late</div>;
        }
        return <div>ຕົງເວລາ</div>;
      }}
    />
  );
}
