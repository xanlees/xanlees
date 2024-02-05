import { type LoadFromStorage } from "@src/common/components/localStorageContext/constant";

export interface ProfileState {
  profileId?: number
  graduationId?: number
  personalAddressId?: number
  applicationId?: number
  physicalProfileId?: number
  isUploaded?: boolean
  workExperienceId?: number
}
type ProfileActionType = "setProfileId" | "setGraduationId" |
"setPersonalAddressId" | "setApplicationId" | "setWorkExperienceId" |
"setIsUploaded" | "setPhysicalProfileId" | typeof LoadFromStorage | "clearState";
export interface ProfileAction {
  type: ProfileActionType
  payload: number | boolean | ProfileState
  payloadType?: string
}
