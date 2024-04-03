export interface IBranch {
  name: string
  type: string
  id: number
}

export interface ISector {
  id: number
  name: string
  branchId: IBranch
}

export interface IPosition {
  name: string
  id: number
  sectorId: {
    name: string
    id: number
    branchId: number
  }
}
