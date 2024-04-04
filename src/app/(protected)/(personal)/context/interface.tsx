import { type LoadFromStorage } from "@src/common/components/localStorageContext/constant";

export interface ProfileState {
  profileId?: number
  graduationId?: number
  personalCurrentAddressId?: number
  personalBornAddressId?: number
  applicationId?: number
  physicalProfileId?: number
  isUploaded?: boolean
  workExperienceId?: number
  educationId?: number
  updateApplicationId?: number
}
type ProfileActionType = "setProfileId" | "setGraduationId" | "setEducationId" |
"setPersonalCurrentAddressId" | "setPersonalBornAddressId" | "setApplicationId" | "setWorkExperienceId" | "setUpdateApplicationId" |
"setIsUploaded" | "setPhysicalProfileId" | typeof LoadFromStorage | "clearState";
export interface ProfileAction {
  type: ProfileActionType
  payload: number | boolean | ProfileState
  payloadType?: string
}
