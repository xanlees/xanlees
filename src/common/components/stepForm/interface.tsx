export interface FormStepProp {
  formStepsData: StepDescriptionProps[]
  initialStep: number
}

export interface StepDescriptionProps {
  stepLabel: string
  stepDescription: JSX.Element
  completed: boolean
}
