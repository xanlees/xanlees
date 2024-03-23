/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client";
import React from "react";
import { Card } from "@src/shadcn/elements";
import FormStep from "@src/common/components/stepForm";
import { applicationFromStep, ApplicationProvider, useApplicationContext, type ApplicationState } from "@hr";
import { ProfileProvider, useProfileContext, type ProfileState } from "@personal";
import { hasValid } from "@src/common/lib/validation/hasValid";
import { type StepDescriptionProps } from "@src/common/components/stepForm/interface";

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
  educationStep: 5,
  applicationStep: 6,
  workExperienceStep: 7,
};

function ApplicationForm(): JSX.Element {
  const applicationContext = useApplicationContext() as { state: ApplicationState };
  const profileContext = useProfileContext() as { state: ProfileState };
  const initialStep = getStepState(profileContext.state, applicationContext.state);
  return (
    <div className="shadow-lg">
      <div className="my-3 text-center bg-blue-300 rounded-sm">
        <p className="mx-auto text-xl font-bold">ຟອມສະໝັກພະນັກງານ </p>
        <p className="mx-auto text-sm">(ໃຊ້ເວລາປະມານ 10 ນາທີ) </p>
      </div>
      <FormStep
        formStepsData={applicationFromStep as unknown as StepDescriptionProps[]}
        initialStep={initialStep}
      />
      <div className="my-3 text-center bg-blue-300 rounded-sm">
        <p className="mx-auto text-xl font-bold">ຂອບໃຈທ່ານທີ່ໄວ້ໃຈ </p>
        <p className="mx-auto text-xl font-bold">ນຳບໍລິສັດຂອງພວກເຮົາ </p>
      </div>
    </div>
  );
}
function getStepState(stateProfile: ProfileState, stateApplication: ApplicationState) {
  switch (true) {
    case hasValid(stateApplication.workExperienceId as number):
      return STEPS.workExperienceStep;
    case hasValid(stateApplication.applicationId as number):
      return STEPS.applicationStep;
    case hasValid(stateProfile.educationId as number):
      return STEPS.educationStep;
    case hasValid(stateProfile.isUploaded as boolean):
      return STEPS.isUploadedStep;
    case hasValid(stateApplication.physicalProfileId as number):
      return STEPS.physicalProfileStep;
    case hasValid(stateProfile.profileId as number):
      return STEPS.profileStep;
    case hasValid(stateProfile.personalAddressId as number):
      return STEPS.personalAddressStep;
    default:
      return 0;
  }
}
