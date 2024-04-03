"use client";
import React from "react";
import { Create } from "@/shadcn/components/crud";
import { BreadcrumbItems } from "@src/shadcn/components/breadcrumb/items";
import FormStep from "@src/common/components/stepForm";
import { DocumentForm, PersonalAddressForm, ProfileProvider, type ProfileState } from "@src/app/(protected)/(personal)";
import { useRouter } from "next/navigation";
import { Button } from "@src/shadcn/elements";
import { useProfileContext } from "../../index";
import { PROFILE_STORAGE_KEY } from "@src/app/(protected)/(personal)/context";
import { ProfileForm } from "../containers/form/form";

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
  const { dispatch } = useProfileContext();
  const handleButtonClick = () => {
    const storedState = localStorage.getItem(PROFILE_STORAGE_KEY);
    const profileState = JSON.parse(storedState as string) as ProfileState;
    if (profileState.profileId !== undefined && profileState.profileId !== 0) {
      router.push(`/employee/create/${profileState?.profileId}`);
      dispatch({ type: "clearState", payload: true });
      localStorage.removeItem(PROFILE_STORAGE_KEY);
    }
  };
  return (
    <Create title="ຟອມສ້າງພະນັກງານ" resource="profile" breadcrumb={<BreadcrumbItems breadcrumbs={breadcrumbs} />} >
      <div className="flex justify-center">
        <div className="flex flex-col border shadow-2xl rounded-2xl">
          <span className="w-full p-5 text-2xl font-bold text-center text-white bg-blue-500 border rounded-t-2xl">ຟອມສ້າງພະນັກງານ</span>
          <FormStep formStepsData={formStepsData} initialStep={0} />
          <div className="flex justify-center w-full p-3">
            <Button className="w-20" onClick={handleButtonClick}>ຕໍ່ໄປ</Button>
          </div>
        </div>
      </div>
    </Create>
  );
};

export const formStepsData = [
  {
    stepLabel: "ສ້າງໂປຣໄຟລ໌",
    stepDescription: <ProfileForm />,
    completed: false,
  },
  {
    stepLabel: "ທີຢູ່ປະຈຸບັນ",
    stepDescription: (
      <PersonalAddressForm />
    ),
    completed: false,
  },
  {
    stepLabel: "ທີ່ນຖານບ້ານເກີດ",
    stepDescription: (
      <PersonalAddressForm isCurrent={false}/>
    ),
    completed: false,
  },
  {
    stepLabel: "ເອກສານ",
    stepDescription: <DocumentForm/>,
    completed: false,
  },
];

export default ProfileCreate;
