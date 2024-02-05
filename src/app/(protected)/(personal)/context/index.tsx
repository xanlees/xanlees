/* eslint-disable @typescript-eslint/naming-convention */
import { type ReactNode } from "react";
import { type ProfileAction, type ProfileState } from "./interface";
import { ProfileReducer } from "./reducer";
import { createContextProvider } from "@src/common/components/localStorageContext/provider";

export const PROFILE_STORAGE_KEY = "creatingProfileState";

const { LocalStorageProvider, useLocalStorageContext } = createContextProvider<
ProfileState,
ProfileAction
>({
  reducer: ProfileReducer,
  initialState: {},
  storageKey: PROFILE_STORAGE_KEY,
});

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <LocalStorageProvider>
      {children}
    </LocalStorageProvider>
  );
};

export const useProfileContext = useLocalStorageContext;
