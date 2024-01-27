"use client";
import { Create } from "@/shadcn/components/crud";
import { formStepsData } from "../lib/settings";
import React from "react";
import { ProfileProvider, useProfileContext } from "../../context";
import { ProfileAction, type ProfileState } from "../../context/interface";
import { Button, Link } from "@src/shadcn/elements";
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
  const { state, dispatch }: { state: ProfileState, dispatch: React.Dispatch<ProfileAction> } = useProfileContext();
  let initialStep = state.personalAddressId ? 1 : 0;
  initialStep = state.profileId ? 2 :initialStep;
  initialStep = state.isUploaded ? 3 :initialStep;

  const handleButtonClick = () => {
    if (state.profileId !== 0){
      router.push(`/employee/create/${state.profileId}`);
      dispatch({ type: "clearState", payload: false});
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
        </ProfileProvider>
      </Create>
      <Button className="w-20" onClick={handleButtonClick} disabled={state.profileId === 0}>
        ຕໍ່ໄປ
      </Button>
    </>
  );
}
