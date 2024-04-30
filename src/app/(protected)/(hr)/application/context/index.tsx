/* eslint-disable @typescript-eslint/naming-convention */
import { type ReactNode } from "react";
import { type ApplicationAction, type ApplicationState } from "./interface";
import { ApplicationReducer } from "./reducer";
import { createContextProvider } from "@src/common/components/localStorageContext/provider";

export const applicationStorageKey = "creatingApplication";

const initStateApplication = {
};

const { LocalStorageProvider, useLocalStorageContext } = createContextProvider<ApplicationState, ApplicationAction >({
  reducer: ApplicationReducer,
  initialState: initStateApplication,
});

export const ApplicationProvider: React.FC<{ children: ReactNode, storageKeys: string }> = ({ children, storageKeys }) => {
  return (
    <LocalStorageProvider storageKey={storageKeys}>
      {children}
    </LocalStorageProvider>
  );
};
export const useApplicationContext = useLocalStorageContext;
