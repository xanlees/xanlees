
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
  }
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
