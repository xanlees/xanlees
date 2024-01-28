import { ReactNode } from "react";

export interface ProviderProps<State, Action> {
    reducer: (state: State | Object, action: any) => State;
    initialState: State;
    storageKey: string;
  }