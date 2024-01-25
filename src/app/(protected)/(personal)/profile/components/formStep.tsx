"use client";
import React, { useState } from "react";
import Stepper from "@keyvaluesystems/react-stepper";

interface FormStepProps {
  formStepsData: Array<{
    stepLabel: string
    stepDescription: React.ReactElement
    completed: boolean
  }>
  setProfileID?: (id: number) => void
  isEmployee?: boolean
}

export default function FormStep({ formStepsData, setProfileID, isEmployee }: FormStepProps): JSX.Element {
  const [currentStep, setCurrentStep] = useState(0);
  return (
    <div>
      <Stepper
        steps={formStepsData.map((step) => ({
          ...step,
          stepDescription: React.cloneElement(step.stepDescription, {
            setCurrentStep,
            setProfileID,
            isEmployee,
          }),
        }))}
        orientation="vertical"
        currentStepIndex={currentStep}
        stepContent={() => <div className="w-[1600px] rounded-lg" />}
      />
    </div>

  );
}
