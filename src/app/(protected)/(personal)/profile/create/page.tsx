"use client";
import { Create } from "@/shadcn/components/crud";
import { formStepsData } from "../lib/settings";
import React, { useState } from "react";
import { ProfileProvider, useProfileContext, type ProfileState } from "../../context";
import { Button, Link } from "@src/shadcn/elements";
import { BreadcrumbItems } from "@src/shadcn/components/breadcrumb/items";
import FormStep from "@src/common/components/stepForm";

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
  const [profileID, setProfileID] = useState(0);
  const { state }: { state: ProfileState } = useProfileContext();
  let initialStep = state.personalAddressId ? 1 : 0;
  initialStep = state.profileId ? 2 :initialStep;

  return (
    <>
      <Create
        resource="employee"
        breadcrumb={<BreadcrumbItems breadcrumbs={breadcrumbs} />}
      >
        <ProfileProvider>
          <FormStep formStepsData={formStepsData}
            stepProps={setProfileID}
            initialStep={initialStep} />
        </ProfileProvider>
      </Create><Button className="w-20">
        <Link className="w-full h-full" href={`/employee/create/${profileID}`}>ຕໍ່ໄປ</Link>
      </Button>
    </>
  );
}
