import { type IDistrict } from "../../(personal)/address/interface";

export interface IBranch {
  name: string
  id: number
  province: number | IDistrict
  type: string
}
