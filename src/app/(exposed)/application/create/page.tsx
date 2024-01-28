"use client";
import React from "react";
import { Button, Card } from "@src/shadcn/elements";
import { ProfileProvider, useProfileContext } from "@src/app/(protected)/(personal)/context";
import { applicationFromStep } from "@src/app/(protected)/(personal)/profile/lib/settings";
import FormStep from "@src/common/components/stepForm";

export default function ApplicationCreate(): JSX.Element {
  return (
    <Card className="w-1/2 mx-auto mt-10 rounded-md">
      <ProfileProvider>
        <ApplicationForm />
      </ProfileProvider>
    </Card>
  );
}

function ApplicationForm(): JSX.Element {
  const { state, dispatch } = useProfileContext();
  let initialStep = state.personalAddressId ? 1 : 0;
  initialStep = state.profileId ? 2 : initialStep;
  initialStep = state.physicalProfileId ? 3 : initialStep;
  initialStep = state.isUploaded ? 3 : initialStep;
  initialStep = state.graduationId ? 3 : initialStep;
  initialStep = state.personalAddressId ? 3 : initialStep;
  console.log("initialStep", initialStep)
  console.log("initialSt]", initialStep)
  return (
    <>
      <FormStep formStepsData={applicationFromStep}
        stepProps={{}}
        initialStep={initialStep}
        state={state}
        dispatch={dispatch}
      />
    </>
  );
}
