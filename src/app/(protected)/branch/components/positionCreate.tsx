/* eslint-disable @typescript-eslint/naming-convention */
import Stepper from "@keyvaluesystems/react-stepper";
import React, { useState } from "react";
import { PositionForm } from "./positionForm";
import { BranchForm } from "./branchForm";
import { SectorForm } from "./sectorForm";

export const initialStepsArr = [
  {
    stepLabel: "Create Branch",
    stepDescription: <BranchForm redirect="create" />,
    completed: false,
  },
  {
    stepLabel: "Creating Sector",
    stepDescription: <SectorForm redirect="create" />,
    completed: false,
  },
  {
    stepLabel: "Create Position",
    stepDescription: <PositionForm redirect="create"/>,
    completed: false,
  },
];

export const PositionCreate: React.FC = () => {
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
