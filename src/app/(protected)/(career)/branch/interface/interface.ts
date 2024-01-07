export interface IBranch {
  name: string
  id: number
}

export interface ISector {
  id: number
  name: string
  branchId: number
  branchDetail: IBranch
}

export interface IPosition {
  name: string
  id: number
  sectorId: number
  sectorDetail: {
    name: string
    id: number
    branchId: number
  }
}

export interface IFormConfig {
  form: {
    setValue: any
  }
}
