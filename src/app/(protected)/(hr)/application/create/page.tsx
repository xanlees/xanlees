"use client";
import { applicationFromStep } from "../lib/settings";
import React, { useState } from "react";
import Stepper from "@keyvaluesystems/react-stepper";
import { ApplicationProvider } from "../context/context";

export default function ApplicationCreate(): JSX.Element {
  const [currentStep, setCurrentStep] = useState(0);
  return (
    <ApplicationProvider>
      <div>
        <Stepper
          steps={applicationFromStep.map((step) => ({
            ...step,
            stepDescription: React.cloneElement(step.stepDescription, {
              setCurrentStep,
            }),
          }))}
          orientation="vertical"
          currentStepIndex={currentStep}
          stepContent={() => <div className="w-[1600px] rounded-lg" />}
        />
      </div>
    </ApplicationProvider>
  );
}
