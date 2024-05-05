export interface IPosition {
  name: string
  id: number
  sectorId: {
    name: string
    id: number
    type: string
    branchId: number
  }
}
