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
}
type ProfileActionType = "SET_PROFILE_ID" | "SET_GRADUATION_ID" | "PERSONAL_ADDRESS";
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
    case "SET_PROFILE_ID":
      return { ...state, profileId: action.payload };
    case "SET_GRADUATION_ID":
      return { ...state, graduationId: action.payload };
    case "PERSONAL_ADDRESS":
      return { ...state, personalAddressId: action.payload };
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
