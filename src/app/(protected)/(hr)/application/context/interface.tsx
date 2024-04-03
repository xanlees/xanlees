import { type LoadFromStorage } from "@src/common/components/localStorageContext/constant";

export interface ApplicationState {
  applicationId?: number
  physicalProfileId?: number
  workExperienceId?: number
  updateApplicationId?: number
}

type ApplicationStateActionType = "setApplicationId" | "setWorkExperienceId" |
"setIsUploaded" | "setPhysicalProfileId" | typeof LoadFromStorage | "clearState" | "setUpdateApplicationId";
export interface ApplicationAction {
  type: ApplicationStateActionType
  payload: number | boolean | ApplicationState
  payloadType?: string
}

