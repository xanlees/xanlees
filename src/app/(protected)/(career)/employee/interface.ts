
export interface IEmployees {
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
