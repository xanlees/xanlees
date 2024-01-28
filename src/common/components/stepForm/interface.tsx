interface IStep {
  stepLabel: string
  stepDescription: React.ReactElement
  completed: boolean
}
export interface FormStepProp {
  formStepsData: {
    stepLabel: string;
    stepDescription: JSX.Element;
    completed: boolean;
  }[];
  stepProps: {};
  initialStep: number;
}