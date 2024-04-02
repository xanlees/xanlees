"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Create } from "@/shadcn/components/crud";
import { useProfileContext, ProfileProvider, PROFILE_STORAGE_KEY } from "../../context";
import { type ProfileState } from "../../context/interface";
import { Button } from "@src/shadcn/elements";
import { BreadcrumbItems } from "@src/shadcn/components/breadcrumb/items";
import FormStep from "@src/common/components/stepForm";
import { hasValid } from "@src/common/lib/validation/hasValid";
import { DocumentForm, EducationForm, PersonalBornAddressForm, PersonalCurrentAddressForm, ProfileForm } from "@personal";

const breadcrumbs = [
  { label: "ພະນັກງານ", href: "/profile" },
  { label: "ສ້າງພະນັກງານ" },
];

const ProfileCreate = () => {
  return (
    <ProfileProvider>
      <FormCreate />
    </ProfileProvider>
  );
};

const FormCreate = () => {
  const router = useRouter();
  const { state, dispatch } = useProfileContext();

  const initialStep = getStepState(state);

  const handleButtonClick = () => {
    const storedState = localStorage.getItem(PROFILE_STORAGE_KEY);
    const profileState = JSON.parse(storedState as string) as ProfileState;
    if (profileState.profileId !== undefined && profileState.profileId !== 0) {
      router.push(`/employee/create/${profileState.profileId}`);
      dispatch({ type: "clearState", payload: false });
    }
  };
  return (
    <Create
      title="ຟອມສ້າງພະນັກງານ"
      resource="profile"
      breadcrumb={<BreadcrumbItems breadcrumbs={breadcrumbs} />}
    >
      <div className="flex justify-center">
        <div className="flex flex-col border shadow-2xl rounded-2xl">
          <span className="w-full p-5 text-2xl font-bold text-center text-white bg-blue-500 border rounded-t-2xl">ຟອມສ້າງພະນັກງານ</span>
          <FormStep formStepsData={formStepsData} initialStep={initialStep} />
          <div className="flex justify-center w-full p-3">
            <Button className="w-20" onClick={handleButtonClick}>ຕໍ່ໄປ</Button>
          </div>
        </div>
      </div>
    </Create>
  );
};
function getStepState(state: ProfileState) {
  const personalAddressStep = 0;
  const profileStep = 1;
  const documentStep = 2;
  const educationStep = 3;

  switch (true) {
    case hasValid(state.isUploaded):
      return educationStep;
    case hasValid(state.profileId):
      return documentStep;
    case hasValid(state.personalAddressId):
      return profileStep;
    default:
      return personalAddressStep;
  }
}
const formStepsData = [
  {
    stepLabel: "ຂໍ້ມູນສ່ວນບຸກຄົນ",
    stepDescription: <ProfileForm isEmployee={true}/>,
    completed: false,
  },
  {
    stepLabel: "ທີຢູ່ອາໄສ",
    stepDescription: (
      <div><PersonalCurrentAddressForm/><PersonalBornAddressForm/></div>
    ),
    completed: false,
  },
  {
    stepLabel: "ເອກສານຕິດຄັດ",
    stepDescription: <DocumentForm/>,
    completed: false,
  },
  {
    stepLabel: "ປະຫວັດການສຶກສາ",
    stepDescription: <EducationForm />,
    completed: false,
  },
];
export default ProfileCreate;

