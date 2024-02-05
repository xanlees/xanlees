"use client";
import React from "react";
import { Card } from "@src/shadcn/elements";
import { applicationFromStep } from "@src/app/(protected)/(personal)/profile/lib/settings";
import FormStep from "@src/common/components/stepForm";
import {
  ApplicationProvider,
  useApplicationContext,
} from "@src/app/(protected)/(hr)/application/context";
import {
  ProfileProvider,
  useProfileContext,
} from "@src/app/(protected)/(personal)/context";

export default function ApplicationCreate(): JSX.Element {
  return (
    <Card className="w-1/2 mx-auto mt-10 mb-20 rounded-md">
      <ApplicationProvider>
        <ProfileProvider>
          <ApplicationForm />
        </ProfileProvider>
      </ApplicationProvider>
    </Card>
  );
}
const STEPS = {
  personalAddressStep: 1,
  profileStep: 2,
  physicalProfileStep: 3,
  isUploadedStep: 4,
  graduationStep: 5,
  applicationStep: 6,
  workExperienceStep: 7,
};

function ApplicationForm(): JSX.Element {
  const { state: stateApplication } = useApplicationContext();
  const { state: stateProfile } = useProfileContext();
  let initialStep = (stateProfile.personalAddressId != null) ? STEPS.personalAddressStep : 0;
  initialStep = (stateProfile.profileId != null) ? STEPS.profileStep : initialStep;
  initialStep = (stateApplication.physicalProfileId != null) ? STEPS.physicalProfileStep : initialStep;
  initialStep = (stateProfile.isUploaded != null) ? STEPS.isUploadedStep : initialStep;
  initialStep = (stateProfile.graduationId != null) ? STEPS.graduationStep : initialStep;
  initialStep = (stateApplication.applicationId != null) ? STEPS.applicationStep : initialStep;
  initialStep = (stateApplication.workExperienceId != null) ? STEPS.workExperienceStep : initialStep;
  return (
    <FormStep
      formStepsData={applicationFromStep}
      stepProps={{}}
      initialStep={initialStep}
    />
  );
}
