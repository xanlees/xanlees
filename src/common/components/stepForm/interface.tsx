export interface FormStepProp {
  formStepsData: Array<{
    stepLabel: string
    stepDescription: JSX.Element
    completed: boolean
  }>
  initialStep?: number
  disableStepNavigation?: boolean
  showDescriptionsForAllSteps?: boolean
}
