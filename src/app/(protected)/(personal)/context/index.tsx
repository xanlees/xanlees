/* eslint-disable @typescript-eslint/naming-convention */
import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
} from "react";
import { ProfileState, ProfileAction } from "./interface";

export const PROFILE_STORAGE_KEY = "creatingProfileState";

const ProfileContext = createContext<
{ state: ProfileState, dispatch: React.Dispatch<ProfileAction> } | undefined
>(undefined);

const initialProfileState: ProfileState = {
  profileId: 0,
  graduationId: 0,
  personalAddressId: 0,
  applicationId: 0,
  physicalProfileId: 0,
  isUploaded: false,
};

const ProfileReducer = (
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
        return { ...state, personalAddressId: action.payload as number };
    case "setApplicationId":
      return { ...state, applicationId: action.payload as number };
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

interface ProfileProviderProps {
  children: ReactNode
}

const ProfileProvider: React.FC<ProfileProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(ProfileReducer, { });

  useEffect(() => {
    const storedState = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (storedState != null && storedState !== "undefined" && storedState !== "{}") {
      dispatch({ type: "loadFromLocalStorage", payload: JSON.parse(storedState) as ProfileState });
    }
  }, []);

  useEffect(() => {
    if (Object.keys(state).length > 1) {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(state));
    }
  }, [state]);

  return (
    <ProfileContext.Provider value={{ state, dispatch }}>
      {children}
    </ProfileContext.Provider>
  );
};
const useProfileContext = (): {
  state: ProfileState
  dispatch: React.Dispatch<ProfileAction>
} => {
  const context = useContext(ProfileContext);
  if (context == null) {
    throw new Error("useProfileContext must be used within a ProfileProvider");
  }
  return context;
};
export { ProfileProvider, useProfileContext };
