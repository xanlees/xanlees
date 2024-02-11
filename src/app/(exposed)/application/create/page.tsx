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
import { type ApplicationState } from "@src/app/(protected)/(hr)/application/context/interface";
import { type ProfileState } from "@src/app/(protected)/(personal)/context/interface";
import { hasValid } from "@src/common/lib/validation/hasValid";

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
  graduationStep: 5,
  applicationStep: 6,
  workExperienceStep: 7,
};

function ApplicationForm(): JSX.Element {
  const { state: stateApplication } = useApplicationContext();
  const { state: stateProfile } = useProfileContext();
  const initialStep = getStepState(stateProfile, stateApplication);
  return (
    <div className="shadow-lg">
      <div className="my-3 text-center bg-blue-300 rounded-sm">
        <p className="mx-auto text-xl font-bold">ຟອມສະໝັກພະນັກງານ </p>
        <p className="mx-auto text-sm">(ໃຊ້ເວລາປະມານ 10 ນາທີ) </p>
      </div>
      <FormStep
        formStepsData={applicationFromStep}
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
    case hasValid(stateApplication.workExperienceId):
      return STEPS.workExperienceStep;
    case hasValid(stateApplication.applicationId):
      return STEPS.applicationStep;
    case hasValid(stateProfile.graduationId):
      return STEPS.graduationStep;
    case hasValid(stateProfile.isUploaded === false):
      return STEPS.isUploadedStep;
    case hasValid(stateProfile.educationId):
      return STEPS.educationStep;
    case hasValid(stateApplication.physicalProfileId):
      return STEPS.physicalProfileStep;
    case hasValid(stateProfile.profileId):
      return STEPS.profileStep;
    case hasValid(stateProfile.personalAddressId):
      return STEPS.personalAddressStep;
    default:
      return 0;
  }
}
