"use client";
import { Create } from "@/shadcn/components/crud";
import { applicationFromStep } from "../lib/settings";
import React, { useState } from "react";
import Stepper from "@keyvaluesystems/react-stepper";
import { Button, Link } from "@src/shadcn/elements";
import { BreadcrumbItems } from "@src/shadcn/components/breadcrumb/items";
import { ApplicationProvider } from "../context/context";

const breadcrumbs = [
  { label: "Employee", href: "/employee" },
  { label: "Create" },
];

export default function ApplicationCreate(): JSX.Element {
  const [currentStep, setCurrentStep] = useState(0);
  const [profileID, setProfileID] = useState(0);
  return (
    <>
      <Create
        resource="employee"
        breadcrumb={<BreadcrumbItems breadcrumbs={breadcrumbs} />}
      >
        <ApplicationProvider>
          <div>
            <Stepper
              steps={applicationFromStep.map((step) => ({
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
        </ApplicationProvider>
      </Create>
      <Button className="w-20">
        <Link href={`/employee/create/${profileID}`}>ຕໍ່ໄປ</Link>
      </Button>
    </>
  );
}
