import Stepper from "@keyvaluesystems/react-stepper";
import React, { useEffect, useState } from "react";
import { type FormStepProps } from "./interface";

export default function FormStep({ formStepsData, stepProps, initialStep, state, dispatch }: FormStepProps): JSX.Element {
  const [currentStep, setCurrentStep] = useState(initialStep);
  useEffect(() => {
    setCurrentStep(initialStep);
  }, [initialStep]);

  return (
    <div>
      <Stepper
        steps={formStepsData.map((step) => ({
          ...step,
          stepDescription: React.cloneElement(step.stepDescription, {
            setCurrentStep,
            state,
            dispatch,
            ...stepProps,
          }),

        }))}
        orientation="vertical"
        currentStepIndex={currentStep}
        stepContent={() => <div className="w-[1600px] rounded-lg" />}
      />
    </div>
  );
}
