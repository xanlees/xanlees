export interface IBranch {
  name: string
  id: number
}

export interface ISector {
  id: number
  name: string
  branchId: IBranch
}

export interface IPosition {
  sectorDetail: any
  name: string
  id: number
  sectorId: {
    name: string
    id: number
    branchId: number
  }
}
