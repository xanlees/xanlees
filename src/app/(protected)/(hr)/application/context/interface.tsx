
export interface ApplicationState {
  profileId?: number;
  graduationId?: number;
  personalAddressId?: number;
  applicationId?: number;
  physicalProfileId?: number
  isUploaded?: boolean
  workExperienceId?: number
}
type ApplicationStateActionType = "setProfileId" | "setGraduationId" |
  "setPersonalAddressId" | "setApplicationId" | "setWorkExperienceId" |
  "setIsUploaded" | "setPhysicalProfileId" | "loadFromLocalStorage"| "clearState";

export interface ApplicationAction {
  type: ApplicationStateActionType;
  payload: number | boolean | ApplicationState | {} ;
  payloadType?: string;
}
