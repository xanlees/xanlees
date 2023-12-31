import Stepper from "@keyvaluesystems/react-stepper";
import React, { useState } from "react";

import { EducationForm } from "./educationForm";
import { EmployeeForm } from "./employeeForm";
import { GraduationForm } from "./graduationForm";
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
    stepDescription: <ProfileForm redirect="create" />,
    completed: false,
  },
  {
    stepLabel: "Create Graduation",
    stepDescription: <GraduationForm redirect="create" />,
    completed: false,
  },
  {
    stepLabel: "Create Education",
    stepDescription: <EducationForm redirect="create" />,
    completed: false,
  },
  {
    stepLabel: "Create Employee",
    stepDescription: <EmployeeForm redirect="create" />,
    completed: false,
  },
];

export const EmployeeCreate: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(2);
  const handleStepClick = (_: any, index: number) => {
    setCurrentStep(index);
  };
  return (
    <Stepper
      steps={initialStepsArr}
      orientation="vertical"
      currentStepIndex={currentStep}
      onStepClick={handleStepClick}
      stepContent={() => <div className="w-[1600px] rounded-lg" />}
    />
  );
};
