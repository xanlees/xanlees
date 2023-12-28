/* eslint-disable @typescript-eslint/naming-convention */
import Stepper from "@keyvaluesystems/react-stepper";
import React, { useState } from "react";
import { PersonalAddressForm } from "./personalAddressForm";
import { ProfileForm } from "./profileForm";

export const initialStepsArr = [
  {
    stepLabel: "Personal Address",
    stepDescription: <PersonalAddressForm redirect="create" />,
    completed: false,
  },
  {
    stepLabel: "Creating Profile",
    stepDescription: <ProfileForm redirect="edit" />,
    completed: false,
  },
  {
    stepLabel: "Adding description",
    stepDescription: "Adding description to Employee",
    completed: false,
  },
];

export const EmployeeCreate: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const handleStepClick = (_: any, index: number) => {
    setCurrentStep(index);
  };
  return (
    <Stepper
      steps={initialStepsArr}
      orientation="vertical"
      currentStepIndex={currentStep}
      onStepClick={handleStepClick}
      stepContent={() => <div className="w-[1600px]" />}
    />
  );
};
