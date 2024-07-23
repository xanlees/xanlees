import { type IBranch } from "@career";

export interface IHoliday {
  id?: number
  branch: number
  name: string
  date: string[]
  decription: string
  type: string
}

export interface IHolidayExpand extends Omit<IHoliday, "branch"> {
  branch: IBranch
}
