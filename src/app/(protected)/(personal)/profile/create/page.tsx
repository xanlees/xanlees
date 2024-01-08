"use client";

import { Create } from "@/shadcn/components/crud";
import { createEmployeeSteps } from "../lib/settings";
import React, { useState } from "react";
import Stepper from "@keyvaluesystems/react-stepper";
import { ProfileProvider, useProfileContext } from "../../context/context";
import { Button, Link } from "@src/shadcn/elements";
import { BreadcrumbItems } from "@src/shadcn/components/breadcrumb/items";

const breadcrumbs = [
  { label: "Employee", href: "/employee" },
  { label: "Create" },
];

export default function ProfileCreate(): JSX.Element {
  const { state } = useProfileContext();
  const [currentStep, setCurrentStep] = useState(0);
  const handleStepClick = (_: any, index: number) => {
    setCurrentStep(index);
  };
  console.log("state", state);
  return (
    <>
      <Create resource="employee" breadcrumb={<BreadcrumbItems breadcrumbs={breadcrumbs} />}>
        <ProfileProvider>
          <Stepper
            steps={createEmployeeSteps.map((step) => ({
              ...step,
              stepDescription: React.cloneElement(step.stepDescription, { setCurrentStep }),
            }))}
            orientation="vertical"
            currentStepIndex={currentStep}
            onStepClick={handleStepClick}
            stepContent={() => <div className="w-[1600px] rounded-lg" />} />
        </ProfileProvider>
      </Create>
      <Button>
        <Link href={`/employee/create/${state?.profileId}`}>ຕໍ່ໄປ</Link>
      </Button>
    </>
  );
}
