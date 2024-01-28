import React, {
  useReducer,
  useEffect,
  ReactNode
} from "react";
import { ProfileState } from "./interface";
import { ProfileContext } from ".";
import { ProfileReducer } from "./reducer";

export const PROFILE_STORAGE_KEY = "creatingProfileState";

export interface ProfileProviderProps {
  children: ReactNode;
}

export const ProfileProvider: React.FC<ProfileProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(ProfileReducer, {});

  useEffect(() => {
    const storedState = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (storedState != null && storedState !== "undefined" && storedState !== "{}") {
      dispatch({ type: "loadFromLocalStorage", payload: JSON.parse(storedState) as ProfileState });
    }
  }, []);

  useEffect(() => {
    if (Object.keys(state).length > 1) {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(state));
    }
  }, [state]);

  return (
    <ProfileContext.Provider value={{ state, dispatch }}>
      {children}
    </ProfileContext.Provider>
  );
};


