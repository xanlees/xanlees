"use client";
import { Create } from "@/shadcn/components/crud";
import { formStepsData } from "../lib/settings";
import React from "react";
import { useProfileContext } from "../../context";
import { PROFILE_STORAGE_KEY } from "../../context";
import { ProfileProvider } from "../../context";
import { type ProfileState } from "../../context/interface";
import { Button } from "@src/shadcn/elements";
import { BreadcrumbItems } from "@src/shadcn/components/breadcrumb/items";
import FormStep from "@src/common/components/stepForm";
import { useRouter } from "next/navigation";

const breadcrumbs = [
  { label: "Employee", href: "/employee" },
  { label: "Create" },
];

export default function ProfileCreate(): JSX.Element {
  return (
    <ProfileProvider>
      <FormCreate />
    </ProfileProvider>
  );
}

function FormCreate(): JSX.Element {
  const router = useRouter();
  const { state, dispatch } = useProfileContext();
  
  let initialStep = state.personalAddressId ? 1 : 0;
  initialStep = state.profileId ? 2 :initialStep;
  initialStep = state.isUploaded ? 3 :initialStep;

  const handleFormStep = () => {
    setTimeout(() => {
      dispatch({ type: 'setProfileId', payload: 123 });
    }, 1000);
  };

  const handleButtonClick = () => {
    const storedState = localStorage.getItem(PROFILE_STORAGE_KEY);
    const profileState = JSON.parse(storedState as string) as ProfileState
    if (profileState.profileId !== undefined && profileState.profileId !== 0) {
      router.push(`/employee/create/${profileState.profileId}`);
      dispatch({ type: "clearState", payload: false });
    }
  };

  return (
    <>
      <Create
        resource="employee"
        breadcrumb={<BreadcrumbItems breadcrumbs={breadcrumbs} />}
      >
        <ProfileProvider>
          <FormStep formStepsData={formStepsData}
            stepProps={{}}
            initialStep={initialStep} />
            <Button onClick={handleFormStep}>Simulate FormStep</Button>
          <Button className="w-20" onClick={handleButtonClick}>
            ຕໍ່ໄປ
          </Button>
        </ProfileProvider>
      </Create>
     
    </>
  );
}
