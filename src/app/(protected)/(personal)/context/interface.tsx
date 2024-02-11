import { type LoadFromStorage } from "@src/common/components/localStorageContext/constant";

export interface ProfileState {
  profileId?: number
  graduationId?: number
  personalAddressId?: number
  applicationId?: number
  physicalProfileId?: number
  isUploaded?: boolean
  workExperienceId?: number
  educationId?: number
}
type ProfileActionType = "setProfileId" | "setGraduationId" | "setEducationId" |
"setPersonalAddressId" | "setApplicationId" | "setWorkExperienceId" |
"setIsUploaded" | "setPhysicalProfileId" | typeof LoadFromStorage | "clearState";
export interface ProfileAction {
  type: ProfileActionType
  payload: number | boolean | ProfileState
  payloadType?: string
}
