import { type IProfile } from "@personal";

export interface ILeave {
  id: number
  profile: number
  leaveDate: string[]
  endDate: string
  startDate: string
  status: string
  reason: string
  leaveType: string
}

export interface ILeaveExpand extends Omit<ILeave, "profile"> {
  profile: IProfile
}
