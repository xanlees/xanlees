/* eslint-disable @typescript-eslint/naming-convention */
import React, {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from "react";

interface PositionState {
  id: number
  branchId?: number
  sectorId?: number
}
type PositionActionType = "SET_BRANCH" | "SET_SECTOR";
interface PositionAction {
  type: PositionActionType
  payload: number
  payloadType?: string
}

const PositionContext = createContext<
{ state: PositionState, dispatch: React.Dispatch<PositionAction> } | undefined
>(undefined);

const PositionReducer = (
  state: PositionState,
  action: PositionAction,
): PositionState => {
  switch (action.type) {
    case "SET_BRANCH":
      return { ...state, branchId: action.payload };
    case "SET_SECTOR":
      return { ...state, sectorId: action.payload };
    default:
      return state;
  }
};

interface PositionProviderProps {
  children: ReactNode
}

const PositionProvider: React.FC<PositionProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(PositionReducer, { id: 0 });

  return (
    <PositionContext.Provider value={{ state, dispatch }}>
      {children}
    </PositionContext.Provider>
  );
};

const usePositionContext = (): {
  state: PositionState
  dispatch: React.Dispatch<PositionAction>
} => {
  const context = useContext(PositionContext);
  if (context == null) {
    throw new Error("usePosition must be used within a PositionProvider");
  }
  return context;
};

export { PositionProvider, usePositionContext };
