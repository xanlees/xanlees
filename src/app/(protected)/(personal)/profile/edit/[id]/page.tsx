"use client";

import React from "react";
import { Edit } from "@/shadcn/components/crud";
import { ProfileForm, ProfileProvider } from "@personal";
import { Card, CardHeader } from "@src/shadcn/elements";
import FormStep from "@src/common/components/stepForm";
import { useOne } from "@refinedev/core";
import { type IProfile } from "../../interface/model";

export default function ProfileEdit({
  params,
}: {
  params: { id: number }
}): JSX.Element {
  const { data } = useOne<IProfile>({
    resource: "profile",
    id: Number(params.id ?? 0),
  });
  const profileId = Number(data?.data?.id) ?? 0;
  const form = formStepDataList({ profileId });
  return (
    <Edit title="ຟອມສ້າງພະນັກງານ" resource="profile">
      <Card className="mx-auto mt-10 mb-20 rounded-md shadow-lg max-w-[900px]">
        <CardHeader>
          <span className="w-full py-4 text-2xl font-bold text-center text-white bg-blue-500 border rounded-t-2xl ">
            ຟອມສ້າງພະນັກງານ
          </span>
        </CardHeader>
        <ProfileProvider>
          <FormStep formStepsData={form} showDescriptionsForAllSteps />
        </ProfileProvider>
      </Card>
    </Edit>
  );
}

export const formStepDataList = ({ profileId }: { profileId: number }) => [
  {
    stepLabel: "ຂໍ້ມູນສ່ວນບຸກຄົນ",
    stepDescription: <ProfileForm isEmployee={true} type="EMPLOYEE" />,
    completed: false,
    isEdit: true,
  },
];
