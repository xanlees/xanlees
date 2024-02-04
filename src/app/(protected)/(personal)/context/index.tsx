import { ReactNode } from "react";
import { ProfileAction, ProfileState } from "./interface";
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

export const ProfileProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  return (
    <LocalStorageProvider>
      {children}
    </LocalStorageProvider>
  );
};

export const useProfileContext = useLocalStorageContext;
