import { type IProfile } from "../../(career)/agent/interface/model";

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
