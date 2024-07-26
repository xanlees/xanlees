import { type IBranch } from "@career";

export interface IHoliday {
  id?: number
  branch: number
  holidayName: string
  holidayDate: string[]
  description: string
  type: string
}

export interface IHolidayExpand extends Omit<IHoliday, "branch"> {
  branch: IBranch
}
