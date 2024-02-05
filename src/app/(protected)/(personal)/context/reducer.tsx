import { LoadFromStorage } from "@src/common/components/localStorageContext/constant";
import { type ProfileState, type ProfileAction } from "./interface";

export const ProfileReducer = (
  state: ProfileState = initialProfileState,
  action: ProfileAction,
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
  personalAddressId: 0,
  applicationId: 0,
  physicalProfileId: 0,
  workExperienceId: 0,
  isUploaded: false,
};
