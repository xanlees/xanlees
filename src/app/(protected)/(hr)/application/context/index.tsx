/* eslint-disable @typescript-eslint/naming-convention */
import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
} from "react";
import { ApplicationState, ApplicationAction } from "./interface";

export const APPLICATION_STORAGE_KEY = "creatingApplicationState";

const ApplicationContext = createContext<
{ state: ApplicationState, dispatch: React.Dispatch<ApplicationAction> } | undefined
>(undefined);

const initialApplicationState: ApplicationState = {
  applicationId: 0,
  graduationId: 0,
  personalAddressId: 0,
  profileId: 0,
  physicalProfileId: 0,
  workExperienceId: 0,
  isUploaded: false
};

const ApplicationReducer = (
  state: ApplicationState = initialApplicationState,
  action: ApplicationAction,
): ApplicationState => {
  switch (action.type) {
    case "setApplicationId":
      return { ...state, applicationId: action.payload as number };
    case "setGraduationId":
      return { ...state, graduationId: action.payload as number };
    case "setPersonalAddressId":
      return { ...state, personalAddressId: action.payload as number };
    case "setPhysicalProfileId":
        return { ...state, physicalProfileId: action.payload as number };
    case "setProfileId":
      return { ...state, profileId: action.payload as number };
    case "setWorkExperienceId":
        return { ...state, workExperienceId: action.payload as number };
    case "setIsUploaded":
      return { ...state, isUploaded: action.payload as boolean };
    case "loadFromLocalStorage":
      return { ...action.payload as ApplicationState };
    case "clearState":
        return { ...initialApplicationState };
    default:
      return state;
  }
};

interface ApplicationProviderProps {
  children: ReactNode
}

const ApplicationProvider: React.FC<ApplicationProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(ApplicationReducer, { });

  useEffect(() => {
    const storedState = localStorage.getItem(APPLICATION_STORAGE_KEY);
    if (storedState != null && storedState !== "undefined" && storedState !== "{}") {
      dispatch({ type: "loadFromLocalStorage", payload: JSON.parse(storedState) as ApplicationState });
    }
  }, []);

  useEffect(() => {
    if (Object.keys(state).length > 1) {
      localStorage.setItem(APPLICATION_STORAGE_KEY, JSON.stringify(state));
    }
  }, [state]);

  return (
    <ApplicationContext.Provider value={{ state, dispatch }}>
      {children}
    </ApplicationContext.Provider>
  );
};
const useApplicationContext = (): {
  state: ApplicationState
  dispatch: React.Dispatch<ApplicationAction>
} => {
  const context = useContext(ApplicationContext);
  if (context == null) {
    throw new Error("useApplicationContext must be used within a ApplicationProvider");
  }
  return context;
};
export { ApplicationProvider, useApplicationContext };
