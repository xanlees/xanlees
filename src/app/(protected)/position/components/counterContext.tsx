/* eslint-disable @typescript-eslint/naming-convention */
import React, {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from "react";

interface CounterState {
  id: number
  branchId?: number
  sectorId?: number
}
type CounterActionType = "SET_BRANCH" | "SET_SECTOR";
interface CounterAction {
  type: CounterActionType
  payload: number
  payloadType?: string
}

const CounterContext = createContext<
{ state: CounterState, dispatch: React.Dispatch<CounterAction> } | undefined
>(undefined);

const counterReducer = (
  state: CounterState,
  action: CounterAction,
): CounterState => {
  switch (action.type) {
    case "SET_BRANCH":
      return { ...state, branchId: action.payload };
    case "SET_SECTOR":
      return { ...state, sectorId: action.payload };
    default:
      return state;
  }
};

interface CounterProviderProps {
  children: ReactNode
}

const CounterProvider: React.FC<CounterProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(counterReducer, { id: 0 });

  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
};

const useCounter = (): {
  state: CounterState
  dispatch: React.Dispatch<CounterAction>
} => {
  const context = useContext(CounterContext);
  if (context == null) {
    throw new Error("useCounter must be used within a CounterProvider");
  }
  return context;
};

export { CounterProvider, useCounter };
