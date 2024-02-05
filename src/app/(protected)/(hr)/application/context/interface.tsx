import { type LoadFromStorage } from "@src/common/components/localStorageContext/constant";

export interface ApplicationState {
  applicationId?: number
  physicalProfileId?: number
  workExperienceId?: number
}
type ApplicationStateActionType = "setApplicationId" | "setWorkExperienceId" |
"setIsUploaded" | "setPhysicalProfileId" | typeof LoadFromStorage | "clearState";

export interface ApplicationAction {
  type: ApplicationStateActionType
  payload: number | boolean | ApplicationState
  payloadType?: string
}

