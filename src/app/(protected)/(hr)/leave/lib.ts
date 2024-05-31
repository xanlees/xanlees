import { type IProfile } from "@personal";

export interface ILeave {
  id: number
  profile: number
  leaveDate: string[]
  status: string
  reason: string
}

export interface ILeaveExpand extends Omit<ILeave, "profile"> {
  profile: IProfile
}
