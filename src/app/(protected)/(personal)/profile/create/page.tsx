"use client";

import { Create } from "@/shadcn/components/crud";
import { createEmployeeSteps } from "../lib/settings";
import { useState } from "react";
import Stepper from "@keyvaluesystems/react-stepper";
import { ProfileProvider } from "../../context/context";

export default function ProfileCreate(): JSX.Element {
  const [currentStep, setCurrentStep] = useState(0);
  const handleStepClick = (_: any, index: number) => {
    setCurrentStep(index);
  };
  return (
    <Create>
      <ProfileProvider>
        <Stepper
          steps={createEmployeeSteps}
          orientation="vertical"
          currentStepIndex={currentStep}
          onStepClick={handleStepClick}
          stepContent={() => <div className="w-[1600px] rounded-lg" />}
        />
      </ProfileProvider>
    </Create>
  );
}
