import { differenceInMinutes, format, parseISO } from "date-fns";
import { Table } from "@/shadcn/components/table";
import { Badge } from "@src/shadcn/elements";
import { type IEmployee } from "@career";
import { type IHoliday } from "@hr";
import {
  type HolidayCheckProps,
  type CheckInStatusProps, type IAttendance, type IUserProfile, type IWorkTimeSettings,
} from "../../interface";

export function CheckInStatus({ employeeIsLatestData, workTimeSettingsData, attendanceData, holidayData, date }: CheckInStatusProps): JSX.Element {
  return (
    <Table.Column<IUserProfile>
      header="ສະຖານະ"
      id="lateTime"
      accessorKey="profile.id"
      cell={({ row }) => {
        const profileId = row.original.profile?.id;
        const userId = row.original.user;
        const employee = findEmployee(employeeIsLatestData, profileId);
        const workTimeSetting = findWorkTimeSetting(workTimeSettingsData, employee?.branchId);
        const holiday = isHoliday({ date, holidayData, branchId: employee?.branchId });
        if (!workTimeSetting || !employee || holiday) {
          return <Badge className="bg-gray-600">{"ມື້ນີ້ພັກວຽກ"} {holiday ? holiday.holidayName : ""}</Badge>;
        }
        const attendance = findAttendance(attendanceData, userId);
        if (!attendance) {
          return <Badge className="bg-red-600">ບໍ່ມາການ</Badge>;
        }
        const actualCheckIn = parseISO(attendance.checkIn);
        const actualCheckOut = attendance.checkOut ? parseISO(attendance.checkOut) : null;
        const checkInStatus = getCheckInStatus(actualCheckIn, workTimeSetting);
        const checkOutStatus = getCheckOutStatus({ actualCheckOut, workTimeSetting, checkInTime: attendance?.checkIn });
        return (
          <div className="space-y-0.5">
            <div>{checkInStatus}</div>
            <div>{checkOutStatus}</div>
          </div>
        );
      }}
    />
  );
}

function findEmployee(employeeIsLatestData: IEmployee[], profileId: number | undefined): IEmployee | undefined {
  return employeeIsLatestData.find((emp) => emp.profileId === profileId);
}
function findWorkTimeSetting(workTimeSettingsData: IWorkTimeSettings[], branchId: number | undefined): IWorkTimeSettings | undefined {
  return workTimeSettingsData.find((wt) => wt.branch === branchId);
}
function findAttendance(attendanceData: IAttendance[], userId: number): IAttendance | undefined {
  return attendanceData.find((item) => item.user === userId);
}

function isHoliday({ date, holidayData, branchId }: HolidayCheckProps): IHoliday | null {
  return holidayData?.find((holiday) =>
    holiday.holidayDate.includes(date) && (holiday.branch === null || holiday.branch === branchId),
  ) ?? null;
}

function getCheckInStatus(actualCheckIn: Date, workTimeSetting: IWorkTimeSettings): JSX.Element {
  const scheduledCheckIn = new Date(`${format(actualCheckIn, "yyyy-MM-dd")}T${workTimeSetting.checkInTime}`);
  const minutesLate = differenceInMinutes(actualCheckIn, scheduledCheckIn);
  if (minutesLate <= Number(workTimeSetting.lateTime)) {
    return <Badge className="bg-green-600">ເຂົ້າວຽກທັນເວລາ</Badge>;
  }
  return <Badge className="bg-red-600">ເຂົ້າວຽກຊ້າ</Badge>;
}

function getCheckOutStatus({ actualCheckOut, workTimeSetting, checkInTime }: {
  actualCheckOut: Date | null
  workTimeSetting: IWorkTimeSettings
  checkInTime: string
}): JSX.Element {
  if (!actualCheckOut) {
    return <></>;
  }

  const scheduledCheckOut = new Date(checkInTime);
  const [checkOutHours, checkOutMinutes] = workTimeSetting.checkOutTime.split(":").map(Number);
  scheduledCheckOut.setHours(checkOutHours);
  scheduledCheckOut.setMinutes(checkOutMinutes);
  if (actualCheckOut > scheduledCheckOut) {
    const extraTime = differenceInMinutes(actualCheckOut, scheduledCheckOut);
    return <Badge className="bg-green-600">OT {formatTime(extraTime)}</Badge>;
  }
  return <Badge className="bg-red-600">ອອກກອນເວລາ</Badge>;
}

function formatTime(minutes: number): string {
  const minute = 60;
  const hours = Math.floor(minutes / minute);
  const minutesLeft = minutes % minute;
  return `${hours > 0 ? `${hours} ຊົ່ວໂມງ ` : ""}${minutesLeft} ນາທີ`;
}
