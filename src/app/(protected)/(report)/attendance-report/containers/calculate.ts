import { parseISO, format, differenceInMinutes } from "date-fns";
import { type IEmployee } from "@career";
import { type IAttendance, type IWorkTimeSettings } from "@src/app/(protected)/(personal)/user-profile/interface";

export function findEmployee(employeeIsLatestData: IEmployee[], profileId: number | undefined): IEmployee | undefined {
  return employeeIsLatestData.find((emp) => emp.profileId === profileId);
}

export function findWorkTimeSetting(workTimeSettingsData: IWorkTimeSettings[], branchId: number): IWorkTimeSettings[] {
  return workTimeSettingsData.filter((wt) => wt.branch === branchId);
}

export function formatHours(hours: number): string {
  const totalMinutes = Math.floor(hours * minutesInHour);
  const hrs = Math.floor(totalMinutes / minutesInHour);
  const mins = totalMinutes % minutesInHour;
  return `${hrs > 0 ? `${hrs} ຊົ່ວໂມງ ` : ""}${mins} ນາທີ`;
}
const minutesInHour = 60;
interface CalculateAttendanceProps {
  totalDays: number
  onTimeDays: number
  lateDays: number
  otDays: number
  totalWorkHours: number
  totalOTHours: number
  totalLateHours: number
}

export function calculateAttendance(userAttendance: IAttendance[], workTimeSettings: IWorkTimeSettings[]): CalculateAttendanceProps {
  const uniqueDays = new Set<string>();
  let onTimeDays = 0;
  let lateDays = 0;
  let otDays = 0;
  let totalWorkHours = 0;
  let totalOTHours = 0;
  let totalLateHours = 0;
  userAttendance.forEach((attendance) => {
    const checkInDate = format(parseISO(attendance.checkIn), "yyyy-MM-dd");
    const workTimeSetting = getWorkTimeSetting(workTimeSettings, attendance.checkIn);
    if (!workTimeSetting) {
      return;
    }
    uniqueDays.add(checkInDate);
    const scheduledCheckIn = new Date(`${checkInDate}T${workTimeSetting.checkInTime}`);
    const actualCheckIn = parseISO(attendance.checkIn);
    const minutesLate = differenceInMinutes(actualCheckIn, scheduledCheckIn);
    ({ onTimeDays, lateDays, totalLateHours } = updateLateStats({ minutesLate, lateTime: workTimeSetting.lateTime, onTimeDays, lateDays, totalLateHours }));
    if (!attendance.checkOut) {
      return;
    }
    const actualCheckOut = parseISO(attendance.checkOut);
    const scheduledCheckOut = new Date(`${checkInDate}T${workTimeSetting.checkOutTime}`);
    totalWorkHours += calculateWorkHours(actualCheckIn, actualCheckOut);
    ({ otDays, totalOTHours } = updateOvertimeStats({ actualCheckOut, scheduledCheckOut, otDays, totalOTHours }));
  });

  return { totalDays: uniqueDays.size, onTimeDays, lateDays, otDays, totalWorkHours, totalOTHours, totalLateHours };
}

function getWorkTimeSetting(workTimeSettings: IWorkTimeSettings[], checkIn: string): IWorkTimeSettings | undefined {
  const dayOfWeek = format(parseISO(checkIn), "EEEE");
  return workTimeSettings.find((wts) => wts.dayOfWeek === dayOfWeek);
}

function updateLateStats({ minutesLate, lateTime, onTimeDays, lateDays, totalLateHours }: { minutesLate: number, lateTime: string, onTimeDays: number, lateDays: number, totalLateHours: number }) {
  if (minutesLate <= Number(lateTime)) {
    onTimeDays += 1;
  } else {
    lateDays += 1;
    totalLateHours += minutesLate / minutesInHour;
  }
  return { onTimeDays, lateDays, totalLateHours };
}

function calculateWorkHours(checkIn: Date, checkOut: Date): number {
  return differenceInMinutes(checkOut, checkIn) / minutesInHour;
}

function updateOvertimeStats({ actualCheckOut, scheduledCheckOut, otDays, totalOTHours }: { actualCheckOut: Date, scheduledCheckOut: Date, otDays: number, totalOTHours: number }) {
  if (isOvertime(actualCheckOut, scheduledCheckOut)) {
    otDays += 1;
    totalOTHours += calculateOvertimeHours(actualCheckOut, scheduledCheckOut);
  }
  return { otDays, totalOTHours };
}

function isOvertime(checkOut: Date, scheduledCheckOut: Date): boolean {
  return checkOut > scheduledCheckOut;
}

function calculateOvertimeHours(checkOut: Date, scheduledCheckOut: Date): number {
  return differenceInMinutes(checkOut, scheduledCheckOut) / minutesInHour;
}

export interface AttendanceDataProps {
  employeeIsLatestData: IEmployee[]
  workTimeSettingsData: IWorkTimeSettings[]
  attendanceData: IAttendance[]
}
