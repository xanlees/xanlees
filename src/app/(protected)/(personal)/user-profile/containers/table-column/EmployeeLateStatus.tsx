import { parseISO, differenceInMinutes } from "date-fns";
import { Table } from "@/shadcn/components/table";
import { type IWorkTimeSettings, type IAttendance, type IUserProfile } from "../../interface";
import { type IEmployee } from "../../../index";
import { Badge } from "@src/shadcn/elements";

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
            <div>ເຂົ້າວຽກ: {checkInStatus}</div>
            <div>ເລີກວຽກ: {checkOutStatus}</div>
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
    return "ຕົງເວລາ";
  }
  return `${formatTime(minutesLate)} ຊ້າ`;
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
  const earlyLeave = differenceInMinutes(scheduledCheckOut, actualCheckOut);
  return `ອອກກອນເວລາ: ${formatTime(earlyLeave)}`;
}

function formatTime(minutes: number): string {
  const minutesInHour = 60;
  const hours = Math.floor(minutes / minutesInHour);
  const minutesLeft = minutes % minutesInHour;
  return `${hours > 0 ? `${hours} ຊົ່ວໂມງ ` : ""}${minutesLeft} ນາທີ`;
}
