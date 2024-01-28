"use client";
import React from "react";
import { Card } from "@src/shadcn/elements";
import { applicationFromStep } from "@src/app/(protected)/(personal)/profile/lib/settings";
import FormStep from "@src/common/components/stepForm";
import { ApplicationProvider, useApplicationContext } from "@src/app/(protected)/(hr)/application/context";
import { ApplicationState } from "@src/app/(protected)/(hr)/application/context/interface";
import { ProfileProvider } from "@src/app/(protected)/(personal)/context/provider";

export default function ApplicationCreate(): JSX.Element {
  return (
    <Card className="w-1/2 mx-auto mt-10 rounded-md">
      <ApplicationProvider>
        <ProfileProvider>
          <ApplicationForm />
        </ProfileProvider>
      </ApplicationProvider>
    </Card>
  );
}

function ApplicationForm(): JSX.Element {
  const { state, dispatch } = useApplicationContext();
  let initialStep = state.personalAddressId ? 1 : 0;
  initialStep = state.profileId ? 2 : initialStep;
  initialStep = state.physicalProfileId ? 3 : initialStep;
  initialStep = state.isUploaded ? 3 : initialStep;
  initialStep = state.graduationId ? 3 : initialStep;
  initialStep = state.personalAddressId ? 3 : initialStep;
  console.log("state", state.personalAddressId)
  console.log("initialStep", initialStep)
  return (
    <>
      <FormStep formStepsData={applicationFromStep}
        stepProps={{}}
        initialStep={initialStep}
      />
    </>
  );
}

