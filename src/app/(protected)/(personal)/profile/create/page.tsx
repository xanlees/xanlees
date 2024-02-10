"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Create } from "@/shadcn/components/crud";
import { formStepsData } from "../lib/settings";
import { useProfileContext, ProfileProvider, PROFILE_STORAGE_KEY } from "../../context";
import { type ProfileState } from "../../context/interface";
import { Button } from "@src/shadcn/elements";
import { BreadcrumbItems } from "@src/shadcn/components/breadcrumb/items";
import FormStep from "@src/common/components/stepForm";

const breadcrumbs = [
  { label: "Employee", href: "/employee" },
  { label: "Create" },
];

const ProfileCreate = () => {
  return (
    <ProfileProvider>
      <FormCreate />
    </ProfileProvider>
  );
};
const profileStep = 2;
const isUploadedStep = 3;

const FormCreate = () => {
  const router = useRouter();
  const { state, dispatch } = useProfileContext();

  let initialStep = (state.personalAddressId != null && state.personalAddressId !== 0) ? 1 : 0;
  initialStep = (state.profileId != null && state.profileId !== 0) ? profileStep : initialStep;
  initialStep = (state.isUploaded != null && state.isUploaded) ? isUploadedStep : initialStep;

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
      resource="employee"
      breadcrumb={<BreadcrumbItems breadcrumbs={breadcrumbs} />}
    >
      <FormStep formStepsData={formStepsData} initialStep={initialStep} />
      <Button className="w-20" onClick={handleButtonClick}>ຕໍ່ໄປ</Button>
    </Create>
  );
};

export default ProfileCreate;
