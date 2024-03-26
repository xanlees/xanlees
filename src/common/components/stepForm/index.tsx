import Stepper from "@keyvaluesystems/react-stepper";
import React, { useEffect, useState } from "react";
import { type FormStepProp } from "./interface";

export default function FormStep({
  formStepsData,
  initialStep,
}: Readonly<FormStepProp>): JSX.Element {
  const [currentStep, setCurrentStep] = useState(initialStep);
  useEffect(() => {
    setCurrentStep(initialStep);
  }, [initialStep]);
  return (
    <div className="">
      <Stepper
        steps={formStepsData.map((step) => ({
          ...step,
          stepDescription: React.cloneElement(step.stepDescription, {
            setCurrentStep,
          }),
        }))}
        showDescriptionsForAllSteps
        orientation="vertical"
        currentStepIndex={currentStep}
      />
    </div>
  );
}
