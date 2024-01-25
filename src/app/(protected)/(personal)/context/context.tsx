/* eslint-disable @typescript-eslint/naming-convention */
import React, {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from "react";

interface ProfileState {
  id: number
  profileId?: number
  graduationId?: number
  personalAddressId?: number
  applicationId?: number
}

type ProfileActionType = "setProfileId" | "setGraduationId" | "setPersonalAddressId" | "setApplicationId";
interface ProfileAction {
  type: ProfileActionType
  payload: number
  payloadType?: string
}

const CounterContext = createContext<
{ state: ProfileState, dispatch: React.Dispatch<ProfileAction> } | undefined
>(undefined);

const ProfileReducer = (
  state: ProfileState,
  action: ProfileAction,
): ProfileState => {
  switch (action.type) {
    case "setProfileId":
      return { ...state, profileId: action.payload };
    case "setGraduationId":
      return { ...state, graduationId: action.payload };
    case "setPersonalAddressId":
      return { ...state, personalAddressId: action.payload };
    case "setApplicationId":
      return { ...state, applicationId: action.payload };
    default:
      return state;
  }
};

interface ProfileProviderProps {
  children: ReactNode
}

const ProfileProvider: React.FC<ProfileProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(ProfileReducer, { id: 0 });

  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
};

const useProfileContext = (): {
  state: ProfileState
  dispatch: React.Dispatch<ProfileAction>
} => {
  const context = useContext(CounterContext);
  if (context == null) {
    throw new Error("useProfileContext must be used within a ProfileProvider");
  }
  return context;
};

export { ProfileProvider, useProfileContext };
