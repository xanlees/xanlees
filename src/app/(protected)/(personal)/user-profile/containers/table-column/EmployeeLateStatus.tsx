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
          return <Badge className="bg-gray-600">{"ມື້ນີ້ພັກວຽກ"}</Badge>;
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
          <div className=" space-y-0.5">
            <div>{checkInStatus}</div>
            <div>{checkOutStatus}</div>
          </div>
        );
      }}
    />
  );
}

function getCheckInStatus(actualCheckIn: Date, workTimeSetting: IWorkTimeSettings) {
  const scheduledCheckIn = new Date(`${actualCheckIn.toDateString()} ${workTimeSetting.checkInTime}`);
  const minutesLate = differenceInMinutes(actualCheckIn, scheduledCheckIn);
  if (minutesLate <= Number(workTimeSetting.lateTime)) {
    return <Badge className="bg-green-600">ເຂົ້າວຽກທັນເວລາ</Badge>;
  }
  return <Badge className="bg-red-600">{"ເຂົ້າວຽກຊ້າ"}</Badge>;
}

function getCheckOutStatus({ actualCheckOut, workTimeSetting, checkInTime }: { actualCheckOut: Date | null, workTimeSetting: IWorkTimeSettings, checkInTime: string }) {
  if (!actualCheckOut) {
    return "";
  }
  const scheduledCheckOut = new Date(checkInTime);
  scheduledCheckOut.setHours(parseInt(workTimeSetting.checkOutTime.split(":")[0], 10));
  scheduledCheckOut.setMinutes(parseInt(workTimeSetting.checkOutTime.split(":")[1], 10));
  if (actualCheckOut > scheduledCheckOut) {
    const extraTime = differenceInMinutes(actualCheckOut, scheduledCheckOut);
    return <Badge className="bg-green-600">OT {formatTime(extraTime)}</Badge>;
  }
  return <Badge className="bg-red-600">ອອກກອນເວລາ</Badge>;
}

function formatTime(minutes: number): string {
  const minutesInAnHour = 60;
  const hours = Math.floor(minutes / minutesInAnHour);
  const minutesLeft = minutes % minutesInAnHour;
  return `${hours > 0 ? `${hours} ຊົ່ວໂມງ ` : ""}${minutesLeft} ນາທີ`;
}
