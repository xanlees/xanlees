
import { type LoadFromStorage } from "@src/common/components/localStorageContext/constant";

export interface IHolidayState {
  holiday?: number
  branch?: number
}

  type IHolidayActionType = "setHoliday" | "setBranch" | typeof LoadFromStorage | "clearState";

export interface IHolidayAction {
  type: IHolidayActionType
  payload: number
  payloadType?: string
}
