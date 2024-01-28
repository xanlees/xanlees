import { ApplicationState, ApplicationAction } from "./interface";
export const ApplicationReducer = (
  state: ApplicationState = initialApplicationState,
  action: ApplicationAction
): ApplicationState => {
  switch (action.type) {
    case "setApplicationId":
      return { ...state, applicationId: action.payload as number };
    case "setGraduationId":
      return { ...state, graduationId: action.payload as number };
    case "setPersonalAddressId":
      return { ...state, personalAddressId: action.payload as number };
    case "setPhysicalProfileId":
      return { ...state, physicalProfileId: action.payload as number };
    case "setProfileId":
      return { ...state, profileId: action.payload as number };
    case "setWorkExperienceId":
      return { ...state, workExperienceId: action.payload as number };
    case "setIsUploaded":
      return { ...state, isUploaded: action.payload as boolean };
    case "loadFromLocalStorage":
      return { ...action.payload as ApplicationState };
    case "clearState":
      return { ...initialApplicationState };
    default:
      return state;
  }
};

export const initialApplicationState: ApplicationState = {
  applicationId: 0,
  graduationId: 0,
  personalAddressId: 0,
  profileId: 0,
  physicalProfileId: 0,
  workExperienceId: 0,
  isUploaded: false
};