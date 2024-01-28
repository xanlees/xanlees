"use client";
import React from "react";
import { Card } from "@src/shadcn/elements";
import { applicationFromStep } from "@src/app/(protected)/(personal)/profile/lib/settings";
import FormStep from "@src/common/components/stepForm";
import { ApplicationProvider, useApplicationContext } from "@src/app/(protected)/(hr)/application/context";
import { ProfileProvider, useProfileContext } from "@src/app/(protected)/(personal)/context";

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
  const { state: stateApplication } = useApplicationContext();
  const { state: stateProfile  } = useProfileContext();
  let initialStep = stateProfile.personalAddressId ? 1 : 0;
  initialStep = stateProfile.profileId ? 2 : initialStep;
  initialStep = stateApplication.physicalProfileId ? 3 : initialStep;
  initialStep = stateProfile.isUploaded ? 4 : initialStep;
  initialStep = stateProfile.graduationId ? 5 : initialStep;
  initialStep = stateApplication.applicationId ? 6 : initialStep;
  initialStep = stateApplication.workExperienceId ? 7 : initialStep;
  console.log("stateApplication", stateApplication);
  console.log("stateProfile", stateProfile);
  return (
    <>
      <FormStep formStepsData={applicationFromStep}
        stepProps={{}}
        initialStep={5}
      />
    </>
  );
}

