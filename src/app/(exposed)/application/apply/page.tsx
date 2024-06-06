"use client";
import React from "react";

import {
  applicationFromStep, ApplicationProvider, type ApplicationState, applicationStorageKey,
  useApplicationContext,
} from "@hr";
import {
  applicationProfileStorageKey, ProfileProvider, type ProfileState, useProfileContext,
} from "@personal";

import FormStep from "@src/common/components/stepForm";
import { hasValid } from "@src/common/lib/validation/hasValid";
import { Button, Card } from "@src/shadcn/elements";

export default function ApplicationCreate(): JSX.Element {
  return (
    <Card className="mx-auto mt-10 mb-20 rounded-md shadow-lg max-w-[900px]">
      <ApplicationProvider storageKeys={applicationStorageKey}>
        <ProfileProvider storageKeys={applicationProfileStorageKey}>
          <ApplicationForm />
        </ProfileProvider>
      </ApplicationProvider>
    </Card>
  );
}

const STEPS = {
  profileStep: 0,
  personalBornAddressStep: 1,
  personalCurrentAddressStep: 2,
  physicalProfileStep: 3,
  isUploadedStep: 4,
  educationStep: 5,
  applicationStep: 6,
  workExperienceStep: 7,
  skillStep: 8,
  updateApplicationStep: 9,
};

function ApplicationForm(): JSX.Element {
  const applicationContext = useApplicationContext() as {
    state: ApplicationState
  };
  const profileContext = useProfileContext() as { state: ProfileState };
  const initialStep = getStepState(
    profileContext.state,
    applicationContext.state,
  );
  const handleButtonClick = () => {
    localStorage.removeItem(applicationStorageKey);
    localStorage.removeItem(applicationProfileStorageKey);
    window.location.reload();
  };
  return (
    <div className="p-4 shadow-lg sm:p-6 lg:p-8">
      <div className="p-4 mx-2 my-3 text-center bg-blue-300 rounded-sm">
        <p className="text-xl font-bold">ຟອມສະໝັກພະນັກງານ </p>
        <p className="text-sm">(ໃຊ້ເວລາປະມານ 10 ນາທີ) </p>
      </div>
      <FormStep formStepsData={applicationFromStep} initialStep={initialStep}/>
      <div className="text-center">
        <Button onClick={handleButtonClick}>ປະກອບຟອມສະໝັກວຽກຄັ້ງໃໝ່ອີກ</Button>
      </div>
      <div className="p-4 my-3 text-center bg-blue-300 rounded-sm">
        <p className="text-xl font-bold">ຂອບໃຈທ່ານທີ່ໄວ້ໃຈ </p>
        <p className="text-xl font-bold">ໃນບໍລິສັດຂອງພວກເຮົາ </p>
      </div>
    </div>
  );
}

function getStepState(stateProfile: ProfileState, stateApplication: ApplicationState) {
  switch (true) {
    case hasValid(stateApplication.skillId as number):
      return STEPS.updateApplicationStep;
    case hasValid(stateApplication.workExperienceId as number):
      return STEPS.skillStep;
    case hasValid(stateApplication.applicationId as number):
      return STEPS.workExperienceStep;
    case hasValid(stateProfile.educationId as number):
      return STEPS.applicationStep;
    case hasValid(stateProfile.isUploaded as boolean):
      return STEPS.educationStep;
    case hasValid(stateApplication.physicalProfileId as number):
      return STEPS.isUploadedStep;
    case hasValid(stateProfile.personalCurrentAddressId as number):
      return STEPS.physicalProfileStep;
    case hasValid(stateProfile.personalBornAddressId as number):
      return STEPS.personalCurrentAddressStep;
    case hasValid(stateProfile.profileId as number):
      return STEPS.personalBornAddressStep;
    default:
      return STEPS.profileStep;
  }
}
