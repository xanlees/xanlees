"use client";

import { Create } from "@/shadcn/components/crud";
import { EmployeeProvider } from "../../context/context";
import { createEmployeeSteps } from "../lib/settings";
import { useState } from "react";
import Stepper from "@keyvaluesystems/react-stepper";

export default function EmployeeCreate(): JSX.Element {
  const [currentStep, setCurrentStep] = useState(0);
  const handleStepClick = (_: any, index: number) => {
    setCurrentStep(index);
  };
  return (
    <Create>
      <EmployeeProvider>
        <Stepper
          steps={createEmployeeSteps}
          orientation="vertical"
          currentStepIndex={currentStep}
          onStepClick={handleStepClick}
          stepContent={() => <div className="w-[1600px] rounded-lg" />}
        />
      </EmployeeProvider>
    </Create>
  );
}
