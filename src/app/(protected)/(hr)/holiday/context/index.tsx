import { type ReactNode } from "react";
import { HolidayReducer } from "./reducer";
import { type IHolidayState, type IHolidayAction } from "./interface";
import { createContextProvider } from "@src/common/components/localStorageContext/provider";

export const branchfileStorageKey = "creatingBranchState";
export const holidayfileStorageKey = "creatingIHolidayState";

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

export type { IHolidayState };
