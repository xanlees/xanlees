import { parseISO, differenceInMinutes } from "date-fns";
import { Table } from "@/shadcn/components/table";
import { type IWorkTimeSettings, type IAttendance, type IUserProfile } from "../../interface";
import { Badge } from "@src/shadcn/elements";
import { type IEmployee } from "@src/app/(protected)/(career)/employee/interface";

export interface LateTimeProps {
  employeeIsLatestData: IEmployee[]
  workTimeSettingsData: IWorkTimeSettings[]
  attendanceData: IAttendance[]
}

export function EmployeeLateStatus({ employeeIsLatestData, workTimeSettingsData, attendanceData }: LateTimeProps) {
  return (
    <Table.Column<IUserProfile>
      header="ສະຖານະ"
      id="lateTime"
      accessorKey="profile.id"
      cell={({ row }) => {
        const profileId = row.original.profile?.id;
        const userId = row.original.user;
        const employee = employeeIsLatestData.find((emp) => emp.profileId === profileId);
        const workTimeSetting = workTimeSettingsData.find((wt) => wt.branch === employee?.branchId);
        if (!employee || !workTimeSetting) {
          return <div>ມື້ນີ້ພັກວຽກ</div>;
        }
        const attendance = attendanceData.find((item) => item.user === userId);
        if (!attendance) {
          return <Badge className="bg-red-600">ບໍ່ມາການ</Badge>;
        }
        const actualCheckIn = parseISO(attendance.checkIn);
        const actualCheckOut = attendance.checkOut ? parseISO(attendance.checkOut) : null;
        const checkInStatus = getCheckInStatus(actualCheckIn, workTimeSetting);
        const checkOutStatus = getCheckOutStatus({ actualCheckOut, workTimeSetting, checkInTime: attendance.checkIn });
        return (
          <>
            <div>-{checkInStatus}</div>
            <div>{checkOutStatus}</div>
          </>
        );
      }}
    />
  );
}

function getCheckInStatus(actualCheckIn: Date, workTimeSetting: IWorkTimeSettings): string {
  const scheduledCheckIn = new Date(`${actualCheckIn.toDateString()} ${workTimeSetting.checkInTime}`);
  const minutesLate = differenceInMinutes(actualCheckIn, scheduledCheckIn);
  if (minutesLate <= 0) {
    return "ເຂົ້າວຽກ: ຕົງເວລາ";
  }
  return `ເຂົ້າວຽກຊ້າ: ${formatTime(minutesLate)}`;
}

function getCheckOutStatus({ actualCheckOut, workTimeSetting, checkInTime }: { actualCheckOut: Date | null, workTimeSetting: IWorkTimeSettings, checkInTime: string }): string {
  if (!actualCheckOut) {
    return "";
  }
  const scheduledCheckOut = new Date(checkInTime);
  scheduledCheckOut.setHours(parseInt(workTimeSetting.checkOutTime.split(":")[0], 10));
  scheduledCheckOut.setMinutes(parseInt(workTimeSetting.checkOutTime.split(":")[1], 10));
  if (actualCheckOut > scheduledCheckOut) {
    const extraTime = differenceInMinutes(actualCheckOut, scheduledCheckOut);
    return `OT: ${formatTime(extraTime)}`;
  }
  return "08:00:00";
}

function formatTime(minutes: number): string {
  const minutesInAnHour = 60;
  const hours = Math.floor(minutes / minutesInAnHour);
  const minutesLeft = minutes % minutesInAnHour;
  return `${hours.toString().padStart(2, "0")}:${minutesLeft.toString().padStart(2, "0")}:00`;
}
