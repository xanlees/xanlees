import { ReactNode } from "react";
import { ApplicationAction, ApplicationState } from "./interface";
import { ApplicationReducer } from "./reducer";
import { createContextProvider } from "@src/common/components/localStorageContext/provider";

export const APPLICATION_STORAGE_KEY = "creatingApplication";

const { LocalStorageProvider, useLocalStorageContext } = createContextProvider<ApplicationState, ApplicationAction >({
  reducer: ApplicationReducer,
  initialState: {},
  storageKey: APPLICATION_STORAGE_KEY,
});

export const ApplicationProvider: React.FC<{ children: ReactNode; }> = ({ children }) => {
  return (
    <LocalStorageProvider>
      {children}
    </LocalStorageProvider>
  );
};

export const useApplicationContext = useLocalStorageContext;
