"use client";
import React from "react";
import { Button, Card } from "@src/shadcn/elements";
import FormStep from "@src/common/components/stepForm";
import {
  applicationFromStep,
  ApplicationProvider,
  useApplicationContext,
  type ApplicationState,
} from "@hr";
import {
  ProfileProvider,
  useProfileContext,
  type ProfileState,
} from "@personal";
import { hasValid } from "@src/common/lib/validation/hasValid";

export default function ApplicationCreate(): JSX.Element {
  return (
    <Card className="mx-auto mt-10 mb-20 rounded-md shadow-lg max-w-[900px]">
      <ApplicationProvider>
        <ProfileProvider>
          <ApplicationForm />
        </ProfileProvider>
      </ApplicationProvider>
    </Card>
  );
}

const STEPS = {
  profileStep: 0,
  personalCurrentAddressStep: 1,
  personalBornAddressStep: 2,
  physicalProfileStep: 3,
  isUploadedStep: 4,
  educationStep: 5,
  applicationStep: 6,
  workExperienceStep: 7,
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
    localStorage.removeItem("creatingApplication");
    localStorage.removeItem("creatingProfileState");
    window.location.reload();
  };

  return (
    <div className="shadow-lg p-4 sm:p-6 lg:p-8">
      <div className="my-3 text-center bg-blue-300 rounded-sm mx-2 p-4">
        <p className="text-xl font-bold">ຟອມສະໝັກພະນັກງານ </p>
        <p className="text-sm">(ໃຊ້ເວລາປະມານ 10 ນາທີ) </p>
      </div>
      <FormStep formStepsData={applicationFromStep} initialStep={initialStep} />
      <div className="text-center">
        <Button onClick={handleButtonClick}>ເລີ້ມຕົ້ນໃຫມ່</Button>
      </div>
      <div className="my-3 text-center bg-blue-300 rounded-sm p-4">
        <p className="text-xl font-bold">ຂອບໃຈທ່ານທີ່ໄວ້ໃຈ </p>
        <p className="text-xl font-bold">ນຳບໍລິສັດຂອງພວກເຮົາ </p>
      </div>
    </div>
  );
}

function getStepState(
  stateProfile: ProfileState,
  stateApplication: ApplicationState,
) {
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
    case hasValid(stateProfile.personalCurrentAddressId as number):
      return STEPS.personalBornAddressStep;
    case hasValid(stateProfile.profileId as number):
      return STEPS.personalCurrentAddressStep;
    default:
      return STEPS.profileStep;
  }
}
