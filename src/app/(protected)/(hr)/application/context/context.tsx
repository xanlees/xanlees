/* eslint-disable @typescript-eslint/naming-convention */
import React, {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from "react";

interface ApplicationState {
  id: number
  profileId?: number
  graduationId?: number
  personalAddressId?: number
  applicationId?: number
}
type ApplicationActionType = "setProfileId" | "setGraduationId" | "setPersonalAddressId" | "setApplicationId";
interface ApplicationAction {
  type: ApplicationActionType
  payload: number
  payloadType?: string
}

const CounterContext = createContext<
{ state: ApplicationState, dispatch: React.Dispatch<ApplicationAction> } | undefined
>(undefined);

const ApplicationReducer = (
  state: ApplicationState,
  action: ApplicationAction,
): ApplicationState => {
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

interface ApplicationProviderProps {
  children: ReactNode
}

const ApplicationProvider: React.FC<ApplicationProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(ApplicationReducer, { id: 0 });

  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
};

const useApplicationContext = (): {
  state: ApplicationState
  dispatch: React.Dispatch<ApplicationAction>
} => {
  const context = useContext(CounterContext);
  if (context == null) {
    throw new Error("useApplicationContext must be used within a ApplicationProvider");
  }
  return context;
};

export { ApplicationProvider, useApplicationContext };
