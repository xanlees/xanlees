"use client";
import React, { useState } from "react";
import Stepper from "@keyvaluesystems/react-stepper";
import { ApplicationProvider, applicationFromStep } from "@src/app/(protected)/(hr)/application";
import { Card } from "@src/shadcn/elements";

export default function ApplicationCreate(): JSX.Element {
  const [currentStep, setCurrentStep] = useState(0);
  return (
    <ApplicationProvider>
      <Card className="w-1/2 mx-auto mt-10 rounded-md">
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
      </Card>
    </ApplicationProvider>
  );
}
