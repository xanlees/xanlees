import { type IBranch } from "..";
export interface ISector {
  id: number
  name: string
  branchId: IBranch
}

export type { IBranch };
