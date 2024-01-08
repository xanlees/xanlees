/* eslint-disable @typescript-eslint/naming-convention */
import React, {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from "react";

interface EmployeeState {
  id: number
  profileId?: number
  graduationId?: number
  personalAddressId?: number
}
type EmployeeActionType = "setProfileId" | "SET_GRADUATION_ID" | "PERSONAL_ADDRESS";
interface EmployeeAction {
  type: EmployeeActionType
  payload: number
  payloadType?: string
}

const CounterContext = createContext<
{ state: EmployeeState, dispatch: React.Dispatch<EmployeeAction> } | undefined
>(undefined);

const EmployeeReducer = (
  state: EmployeeState,
  action: EmployeeAction,
): EmployeeState => {
  switch (action.type) {
    case "setProfileId":
      return { ...state, profileId: action.payload };
    case "SET_GRADUATION_ID":
      return { ...state, graduationId: action.payload };
    case "PERSONAL_ADDRESS":
      return { ...state, personalAddressId: action.payload };
    default:
      return state;
  }
};

interface EmployeeProviderProps {
  children: ReactNode
}

const EmployeeProvider: React.FC<EmployeeProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(EmployeeReducer, { id: 0 });

  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
};

const useEmployeeContext = (): {
  state: EmployeeState
  dispatch: React.Dispatch<EmployeeAction>
} => {
  const context = useContext(CounterContext);
  if (context == null) {
    throw new Error("useEmployeeContext must be used within a EmployeeProvider");
  }
  return context;
};

export { EmployeeProvider, useEmployeeContext };
