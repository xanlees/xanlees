
interface IStep {
  stepLabel: string
  stepDescription: React.ReactElement
  completed: boolean
}
export interface FormStepProps {
  formStepsData: IStep[]
  stepProps: Record<any, any>
  initialStep: number
}
