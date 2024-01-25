import Stepper from "@keyvaluesystems/react-stepper";
import React, { useState } from "react";
import { type FormStepProps } from "./interface";

export default function FormStep({ formStepsData, stepContent }: FormStepProps): JSX.Element {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div>
      <Stepper
        steps={formStepsData.map((step) => ({
          ...step,
          stepDescription: React.cloneElement(step.stepDescription, {
            setCurrentStep,
            ...stepContent,
          }),

        }))}
        orientation="vertical"
        currentStepIndex={currentStep}
        stepContent={() => <div className="w-[1600px] rounded-lg" />}
      />
    </div>
  );
}
