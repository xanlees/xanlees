"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Create } from "@/shadcn/components/crud";
import { formStepsData } from "../lib/settings";
import { useProfileContext } from "../../context";
import { ProfileProvider } from "../../context";
import { PROFILE_STORAGE_KEY } from "../../context";
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

const FormCreate = () => {
  const router = useRouter();
  const { state, dispatch } = useProfileContext();

  let initialStep = state.personalAddressId ? 1 : 0;
  initialStep = state.profileId ? 2 : initialStep;
  initialStep = state.isUploaded ? 3 : initialStep;

  const handleButtonClick = () => {
    const storedState = localStorage.getItem(PROFILE_STORAGE_KEY);
    const profileState = JSON.parse(storedState as string) as ProfileState
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
      <FormStep formStepsData={formStepsData} stepProps={{}} initialStep={initialStep} />
      <Button className="w-20" onClick={handleButtonClick}>ຕໍ່ໄປ</Button>
    </Create>
  );
};

export default ProfileCreate;
