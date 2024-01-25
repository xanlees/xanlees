"use client";
import React from "react";
import { Card } from "@src/shadcn/elements";
import { ProfileProvider } from "@src/app/(protected)/(personal)/context/context";
import FormStep from "@src/app/(protected)/(personal)/profile/components/formStep";
import { applicationFromStep } from "@src/app/(protected)/(personal)/profile/lib/settings";

export default function ApplicationCreate(): JSX.Element {
  return (
    <ProfileProvider>
      <Card className="w-1/2 mx-auto mt-10 rounded-md">
        <FormStep formStepsData={applicationFromStep} isEmployee={true}/>
      </Card>
    </ProfileProvider>
  );
}

