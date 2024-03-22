import { type IProfile } from "@src/common/interface";

export interface IEmployee {
  positionId: {
    id: number
    sectorId: number
    name: string
  }
  joiningDate: string
  isLatest: boolean
  id: number
  profileId: IProfile
}
