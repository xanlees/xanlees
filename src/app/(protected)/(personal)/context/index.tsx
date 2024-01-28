/* eslint-disable @typescript-eslint/naming-convention */
import React, {
  createContext,
  useContext,
} from "react";
import { ProfileState, ProfileAction } from "./interface";

export const ProfileContext = createContext<
{ state: ProfileState, dispatch: React.Dispatch<ProfileAction> } | undefined
>(undefined);

export const initialProfileState: ProfileState = {
  profileId: 0,
  graduationId: 0,
  personalAddressId: 0,
  applicationId: 0,
  physicalProfileId: 0,
  workExperienceId: 0,
  isUploaded: false,
};

const useProfileContext = (): {
  state: ProfileState
  dispatch: React.Dispatch<ProfileAction>
} => {
  const context = useContext(ProfileContext);
  if (context == null) {
    throw new Error("useProfileContext must be used within a ProfileProvider");
  }
  return context;
};
export { useProfileContext };