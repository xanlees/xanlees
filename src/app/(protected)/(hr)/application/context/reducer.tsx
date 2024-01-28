import { LoadFromStorage } from "@src/common/localStorageContext/constant";

import { ApplicationState, ApplicationAction } from "./interface";
export const ApplicationReducer = (
  state: ApplicationState = initialApplicationState,
  action: ApplicationAction
): ApplicationState => {
  switch (action.type) {
    case "setApplicationId":
      return { ...state, applicationId: action.payload as number };
    case "setPhysicalProfileId":
      return { ...state, physicalProfileId: action.payload as number };
    case "setWorkExperienceId":
      return { ...state, workExperienceId: action.payload as number };
    case LoadFromStorage:
      return { ...action.payload as ApplicationState };
    case "clearState":
      return { ...initialApplicationState };
    default:
      return state;
  }
};
export const initialApplicationState: ApplicationState = {
  applicationId: 0,
  physicalProfileId: 0,
  workExperienceId: 0,
};