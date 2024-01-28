
export interface ProfileState {
  profileId?: number;
  graduationId?: number;
  personalAddressId?: number;
  applicationId?: number;
  physicalProfileId?: number
  isUploaded?: boolean;
}
type ProfileActionType = "setProfileId" | "setGraduationId" |
  "setPersonalAddressId" | "setApplicationId" |
  "setIsUploaded" | "setPhysicalProfileId" | "loadFromLocalStorage"| "clearState";
export interface ProfileAction {
  type: ProfileActionType;
  payload: number | boolean | ProfileState | {} ;
  payloadType?: string;
}
