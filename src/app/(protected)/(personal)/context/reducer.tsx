import { LoadFromStorage } from "@src/common/components/localStorageContext/constant";
import { type ProfileState, type ProfileAction } from "./interface";

// eslint-disable-next-line complexity
export const ProfileReducer = (
  state: ProfileState = initialProfileState,
  action: ProfileAction,
): ProfileState => {
  switch (action.type) {
    case "setProfileId":
      return { ...state, profileId: action.payload as number };
    case "setGraduationId":
      return { ...state, graduationId: action.payload as number };
    case "setEducationId":
      return { ...state, educationId: action.payload as number };
    case "setPersonalCurrentAddressId":
      return { ...state, personalCurrentAddressId: action.payload as number };
    case "setPersonalBornAddressId":
      return { ...state, personalBornAddressId: action.payload as number };
    case "setPhysicalProfileId":
      return { ...state, physicalProfileId: action.payload as number };
    case "setUpdateApplicationId":
      return { ...state, updateApplicationId: action.payload as number };
    case "setIsUploaded":
      return { ...state, isUploaded: action.payload as boolean };
    case LoadFromStorage:
      return { ...(action.payload as ProfileState) };
    case "clearState":
      return { ...initialProfileState };
    default:
      return state;
  }
};

const initialProfileState: ProfileState = {
  profileId: 0,
  graduationId: 0,
  personalCurrentAddressId: 0,
  personalBornAddressId: 0,
  applicationId: 0,
  physicalProfileId: 0,
  workExperienceId: 0,
  educationId: 0,
  updateApplicationId: 0,
  isUploaded: false,
};
