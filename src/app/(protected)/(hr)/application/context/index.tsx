/* eslint-disable @typescript-eslint/naming-convention */
import { type ReactNode } from "react";
import { type ApplicationAction, type ApplicationState } from "./interface";
import { ApplicationReducer } from "./reducer";
import { createContextProvider } from "@src/common/components/localStorageContext/provider";

export const APPLICATION_STORAGE_KEY = "creatingApplication";

const initStateApplication = {
  applicationId: 0,
  physicalProfileId: 0,
  workExperienceId: 0,
};

const { LocalStorageProvider, useLocalStorageContext } = createContextProvider<ApplicationState, ApplicationAction >({
  reducer: ApplicationReducer,
  initialState: initStateApplication,
  storageKey: APPLICATION_STORAGE_KEY,
});

export const ApplicationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <LocalStorageProvider>
      {children}
    </LocalStorageProvider>
  );
};

export const useApplicationContext = useLocalStorageContext;
