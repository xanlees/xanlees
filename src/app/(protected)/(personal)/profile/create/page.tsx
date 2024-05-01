"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Create } from "@/shadcn/components/crud";
import {
  useProfileContext,
  ProfileProvider,
  employeeProfileStorageKey,
} from "../../context";
import { type ProfileState } from "../../context/interface";
import { Button, Card, CardHeader } from "@src/shadcn/elements";
import { BreadcrumbItems } from "@src/shadcn/components/breadcrumb/items";
import FormStep from "@src/common/components/stepForm";
import { hasValid } from "@src/common/lib/validation/hasValid";
import {
  DocumentForm,
  EducationForm,
  ProfileForm,
  PersonalAddressForm,
} from "@personal";

const breadcrumbs = [
  { label: "ພະນັກງານ", href: "/profile" },
  { label: "ສ້າງພະນັກງານ" },
];

const ProfileCreate = () => {
  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    <ProfileProvider storageKeys={employeeProfileStorageKey} >
      <FormCreate />
    </ProfileProvider>
  );
};
const FormCreate = () => {
  const router = useRouter();
  const { state, dispatch } = useProfileContext();
  const [isWaiting, setIsWaiting] = useState(false);
  const initialStep = getStepState(state);
  const handleButtonClick = () => {
    setIsWaiting(true);
    const storedState = localStorage.getItem(employeeProfileStorageKey);
    const profileState = JSON.parse(storedState as string) as ProfileState;
    if (profileState.profileId !== undefined && profileState.profileId !== 0) {
      router.push(`/employee/create/${profileState.profileId}/OFFICE/user`);
      dispatch({ type: "clearState", payload: false });
    }
  };
  return (
    <Create
      title="ຟອມສ້າງພະນັກງານ"
      resource="profile"
      breadcrumb={<BreadcrumbItems breadcrumbs={breadcrumbs} />}
    >
      <Card className="mx-auto mt-10 mb-20 rounded-md shadow-lg max-w-[900px]">
        <CardHeader>
          <span className="w-full py-4 text-2xl font-bold text-center text-white bg-blue-500 border rounded-t-2xl ">ຟອມສ້າງພະນັກງານ</span>
        </CardHeader>
        <FormStep formStepsData={formStepsData} initialStep={initialStep} />
        <div className="flex justify-center w-full p-3">
          <Button className="w-20" onClick={handleButtonClick}>{isWaiting ? "ລໍຖ້າ" : "ຕໍ່ໄປ"}</Button>
        </div>
      </Card>
    </Create>
  );
};

function getStepState(state: ProfileState) {
  const profileStep = 0;
  const personalBornAddressStep = 1;
  const personalCurrentAddressStep = 2;
  const documentStep = 3;
  const educationStep = 4;
  switch (true) {
    case hasValid(state.isUploaded):
      return educationStep;
    case hasValid(state.personalCurrentAddressId):
      return documentStep;
    case hasValid(state.personalBornAddressId):
      return personalCurrentAddressStep;
    case hasValid(state.profileId):
      return personalBornAddressStep;
    default:
      return profileStep;
  }
}

const formStepsData = [
  { stepLabel: "ຂໍ້ມູນສ່ວນບຸກຄົນ", stepDescription: <ProfileForm isEmployee={true} type="EMPLOYEE" />, completed: false },
  { stepLabel: "ທີ່ນຖານບ້ານເກີດ", stepDescription: <PersonalAddressForm isCurrent={false} />, completed: false },
  { stepLabel: "ທີຢູ່ປະຈຸບັນ", stepDescription: <PersonalAddressForm />, completed: false },
  { stepLabel: "ເອກສານຕິດຄັດ", stepDescription: <DocumentForm />, completed: false },
  { stepLabel: "ປະຫວັດການສຶກສາ", stepDescription: <EducationForm />, completed: false },
];
export default ProfileCreate;
