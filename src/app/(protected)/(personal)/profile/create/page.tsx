"use client";
import { Create } from "@/shadcn/components/crud";
import { createEmployeeSteps } from "../lib/settings";
import React, { useState } from "react";
import Stepper from "@keyvaluesystems/react-stepper";
import { ProfileProvider } from "../../context/context";
import { Button, Link } from "@src/shadcn/elements";
import { BreadcrumbItems } from "@src/shadcn/components/breadcrumb/items";

const breadcrumbs = [
  { label: "Employee", href: "/employee" },
  { label: "Create" },
];

export default function ProfileCreate(): JSX.Element {
  const [currentStep, setCurrentStep] = useState(0);
  const [profileID, setProfileID] = useState(0);
  return (
    <>
      <Create
        resource="employee"
        breadcrumb={<BreadcrumbItems breadcrumbs={breadcrumbs} />}
      >
        <ProfileProvider>
          <div>
            <Stepper
              steps={createEmployeeSteps.map((step) => ({
                ...step,
                stepDescription: React.cloneElement(step.stepDescription, {
                  setCurrentStep,
                  setProfileID,
                }),
              }))}
              orientation="vertical"
              currentStepIndex={currentStep}
              stepContent={() => <div className="w-[1600px] rounded-lg" />}
            />
          </div>
        </ProfileProvider>
      </Create>
      <Button className="w-20">
        <Link href={`/employee/create/${profileID}`}>ຕໍ່ໄປ</Link>
      </Button>
    </>
  );
}
