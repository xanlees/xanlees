import { ReactNode, createContext, useContext, useEffect, useReducer } from "react";
import { ProviderProps } from "./interface";
import { LoadFromStorage } from "./constant";

export function createContextProvider<State, Action>({
    reducer,
    initialState,
    storageKey,
  }: ProviderProps<State, Action>) {
    const Context = createContext<{ state: State; dispatch: React.Dispatch<Action> } | undefined>(
      undefined
    );

    const LocalStorageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
      const [state, dispatch] = useReducer(reducer, initialState);
      useEffect(() => {
        const storedState = localStorage.getItem(storageKey);
        if (storedState != null && storedState !== "undefined" && storedState !== "{}") {
          dispatch({ type: `${LoadFromStorage}`, payload: JSON?.parse(storedState) as State });
        }
      }, []);

      useEffect(() => {
        if (Object.keys(state as Object).length > 1) {
          localStorage.setItem(storageKey, JSON?.stringify(state));
        }
      }, [state]);
  
      return (
        <Context.Provider value={{ state, dispatch }}>
          {children}
        </Context.Provider>
      );
    };
  
    const useLocalStorageContext = (): { state: State; dispatch: React.Dispatch<Action> } => {
      const context = useContext(Context);
      if (context == null) {
        throw new Error("useGenericContext must be used within a GenericContextProvider");
      }
      return context;
    };
    return { LocalStorageProvider: LocalStorageProvider, useLocalStorageContext: useLocalStorageContext };
  }