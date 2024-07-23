
import { LoadFromStorage } from "@src/common/components/localStorageContext/constant";
import { type IHolidayState, type IHolidayAction } from "../context/interface";

export const HolidayReducer = (
  state: IHolidayState = initialHolidayState,
  action: IHolidayAction,
): IHolidayState => {
  switch (action.type) {
    case "setHoliday":
      return { ...state, holiday: action.payload as number };
    case "setBranch":
      return { ...state, branch: action.payload as number };
    case LoadFromStorage:
      return { ...(action.payload as IHolidayState) };
    case "clearState":
      return { ...initialHolidayState };
    default:
      return state;
  }
};

const initialHolidayState: IHolidayState = {
  holiday: 0,
  branch: 0,
};
