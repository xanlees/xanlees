import { ProfileAction, ProfileState } from "@src/app/(protected)/(personal)/context/interface"
import { Dispatch } from "react"

interface IStep {
  stepLabel: string
  stepDescription: React.ReactElement
  completed: boolean
}
export interface FormStepProps {
  formStepsData: IStep[]
  stepProps: Record<any, any>
  initialStep: number
  state?: ProfileState; 
  dispatch?: Dispatch<ProfileAction>; 
}
