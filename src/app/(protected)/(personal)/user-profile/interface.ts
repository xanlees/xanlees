import { type IProfile } from "../../(career)/agent/interface/model";
import { type IEmployee } from "@career";
import { type IHoliday } from "@hr";

export interface IUserProfile {
  id: number
  user: number
  profile: IProfile
}

export interface IAttendance {
  id: number
  user: number
  checkIn: string
  checkOut?: string
  image: string
  imageCheckOut?: string
  identification: string
  identificationCheckOut?: string
}

export interface IWorkTimeSettings {
  id: number
  branch: number
  checkInTime: string
  checkOutTime: string
  lateTime: string
  dayOfWeek: string
}

export interface CheckInProp {
  employeeIsLatestData: IEmployee[]
  workTimeSettingsData: IWorkTimeSettings[]
}

export interface CheckInStatusProps extends Omit<CheckInProp, "holidayData"> {
  attendanceData: IAttendance[]
  holidayData: IHoliday[]
  date: string
}

export interface HolidayCheckProps {
  date: string
  holidayData: IHoliday[]
  branchId: number | undefined
}
