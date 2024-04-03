import React, { useEffect, useState } from "react";
import Stepper from "@keyvaluesystems/react-stepper";
import { type FormStepProp } from "./interface";

export default function FormStep({
  formStepsData,
  initialStep = 0,
  disableStepNavigation = false,
  showDescriptionsForAllSteps = true,
}: Readonly<FormStepProp>): JSX.Element {
  const [currentStep, setCurrentStep] = useState(initialStep);

  useEffect(() => {
    setCurrentStep(initialStep);
  }, [initialStep]);

  const handleStepClick = (step: any, index: number) => {
    if (!disableStepNavigation) {
      setCurrentStep(index);
    }
  };

  return (
    <div className="">
      <Stepper
        steps={formStepsData}
        orientation="vertical"
        currentStepIndex={currentStep}
        onStepClick={disableStepNavigation ? undefined : handleStepClick}
        showDescriptionsForAllSteps={showDescriptionsForAllSteps}
      />
    </div>
  );
}
