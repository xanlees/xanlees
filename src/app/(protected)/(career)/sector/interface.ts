import { type IBranch } from "..";
export interface ISector {
  id: number
  name: string
  branchId: IBranch | number
  type: string
}

export type { IBranch };
