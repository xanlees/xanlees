import { type ReactNode, createContext, useContext, useEffect, useReducer, type FC, type Dispatch } from "react";
import { type ProviderProps } from "./interface";
import { LoadFromStorage } from "./constant";

// eslint-disable-next-line @typescript-eslint/naming-convention
export function createContextProvider<T, A>({ reducer, initialState }: ProviderProps<T, A>) {
  const Context = createContext<{ state: T, dispatch: Dispatch<A> } | undefined>(
    undefined,
  );
  const LocalStorageProvider: FC<{ children: ReactNode, storageKey: string }> = ({ children, storageKey }: { storageKey: string, children: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
      const storedState = localStorage.getItem(storageKey);
      if (storedState != null && storedState !== "undefined" && storedState !== "{}") {
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        dispatch({ type: `${LoadFromStorage}`, payload: JSON?.parse(storedState) as T } as A);
      }
    }, []);
    useEffect(() => {
      if (Object.keys(state as Record<string, unknown>).length > 0) {
        localStorage.setItem(storageKey, JSON?.stringify(state));
      }
    }, [state, storageKey]);
    return (
      <Context.Provider value={{ state, dispatch }}>
        {children}
      </Context.Provider>
    );
  };
  const useLocalStorageContext = (): { state: T, dispatch: Dispatch<A> } => {
    const context = useContext(Context);
    if (context == null) {
      throw new Error("useGenericContext must be used within a GenericContextProvider");
    }
    return context;
  };
  return { LocalStorageProvider, useLocalStorageContext, Context };
}
