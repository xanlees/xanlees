import { type ReactNode } from "react";
import { HolidayReducer } from "./reducer";
import { type IHolidayState, type IHolidayAction } from "./interface";
import { createContextProvider } from "@src/common/components/localStorageContext/provider";

export const employeeProfileStorageKey = "creatingEmployeeProfileState";
export const holidayfileStorageKey = "creatingIHolidayState";
export const applicationProfileStorageKey = "creatingApplicationProfileState";

const { LocalStorageProvider, useLocalStorageContext } = createContextProvider<
IHolidayState,
IHolidayAction
>({
  reducer: HolidayReducer,
  initialState: {},
});

export const HolidayProvider: React.FC<{ children: ReactNode, storageKeys: string }> = ({ children, storageKeys }) => {
  return (
    <LocalStorageProvider storageKey={storageKeys}>
      {children}
    </LocalStorageProvider>
  );
};

export const useHolidayContext = useLocalStorageContext;
