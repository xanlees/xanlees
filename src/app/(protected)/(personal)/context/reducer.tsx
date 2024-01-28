import { ProfileState, ProfileAction } from "./interface";
import { initialProfileState } from ".";


export const ProfileReducer = (
  state: ProfileState = initialProfileState,
  action: ProfileAction
): ProfileState => {
  switch (action.type) {
    case "setProfileId":
      return { ...state, profileId: action.payload as number };
    case "setGraduationId":
      return { ...state, graduationId: action.payload as number };
    case "setPersonalAddressId":
      return { ...state, personalAddressId: action.payload as number };
    case "setPhysicalProfileId":
      return { ...state, physicalProfileId: action.payload as number };
    case "setApplicationId":
      return { ...state, applicationId: action.payload as number };
    case "setWorkExperienceId":
      return { ...state, workExperienceId: action.payload as number };
    case "setIsUploaded":
      return { ...state, isUploaded: action.payload as boolean };
    case "loadFromLocalStorage":
      return { ...action.payload as ProfileState };
    case "clearState":
      return { ...initialProfileState };
    default:
      return state;
  }
};
