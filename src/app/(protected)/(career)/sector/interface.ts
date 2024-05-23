import { type IBranch } from "..";
export interface ISector {
  id: number
  name: string
  branchId: IBranch | number
  type: string
}

export interface ISectorExpand {
  id: number
  name: string
  branchId: IBranch
  type: string
}
export type { IBranch };
export interface ISectorExpandBranch {
  id: number
  branchId: {
    type: string
  }
}
