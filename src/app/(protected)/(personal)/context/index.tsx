import { type ReactNode } from "react";
import { type ProfileAction, type ProfileState } from "./interface";
import { ProfileReducer } from "./reducer";
import { createContextProvider } from "@src/common/components/localStorageContext/provider";

export const employeeProfileStorageKey = "creatingEmployeeProfileState";
export const agentProfileStorageKey = "creatingAgentProfileState";
export const applicationProfileStorageKey = "creatingApplicationProfileState";

const { LocalStorageProvider, useLocalStorageContext } = createContextProvider<
ProfileState,
ProfileAction
>({
  reducer: ProfileReducer,
  initialState: {},
});

export const ProfileProvider: React.FC<{ children: ReactNode, storageKeys: string }> = ({ children, storageKeys }) => {
  return (
    <LocalStorageProvider storageKey={storageKeys}>
      {children}
    </LocalStorageProvider>
  );
};

export const useProfileContext = useLocalStorageContext;
