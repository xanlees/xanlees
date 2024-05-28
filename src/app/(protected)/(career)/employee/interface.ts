import { type IProfile } from "@src/common/interface";
import { type IPosition } from "../position/interface";

export interface IEmployeeExpand {
  id: number
  positionId: {
    name: string
    id: number
    sectorId: {
      name: string
      id: number
    }
  }
  branchId: {
    name: string
    id: number
    type: string
    province: number
  }
  salary: number
  isLatest: boolean
  profileId: number
  joiningDate: string
}

export interface IEmployee {
  id: number
  joiningDate: string
  isLatest: boolean
  createdOn: string
  branchId?: number
  profileId?: number
  salary?: number
}

export interface IEmployeeExpandProfile {
  id: number
  joiningDate: string
  isLatest: boolean
  createdOn: string
  branchId: number
  profileId: IProfile
  positionId: IPosition
  salary: number
}
