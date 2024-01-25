
interface IStep {
  stepLabel: string
  stepDescription: React.ReactElement
  completed: boolean
}
export interface FormStepProps {
  formStepsData: IStep[]
  stepContent: React.ComponentType<any> // You can customize the type based on your step content needs
}
