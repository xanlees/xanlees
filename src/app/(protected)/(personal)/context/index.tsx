/* eslint-disable @typescript-eslint/naming-convention */
import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
} from "react";

export interface ProfileState {
  profileId?: number
  graduationId?: number
  personalAddressId?: number
  applicationId?: number
}

type ProfileActionType = "setProfileId" | "setGraduationId"
| "setPersonalAddressId" | "setApplicationId" | "loadFromLocalStorage";
interface ProfileAction {
  type: ProfileActionType
  payload: number | ProfileState
  payloadType?: string
}

const PROFILE_STORAGE_KEY = "creatingProfileState";

const ProfileContext = createContext<
{ state: ProfileState, dispatch: React.Dispatch<ProfileAction> } | undefined
>(undefined);

const ProfileReducer = (
  state: ProfileState,
  action: ProfileAction,
): ProfileState => {
  switch (action.type) {
    case "setProfileId":
      return { ...state, profileId: action.payload as number };
    case "setGraduationId":
      return { ...state, graduationId: action.payload as number };
    case "setPersonalAddressId":
      return { ...state, personalAddressId: action.payload as number };
    case "setApplicationId":
      return { ...state, applicationId: action.payload as number };
    case "loadFromLocalStorage":
      return { ...state, ...action.payload as ProfileState };
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
