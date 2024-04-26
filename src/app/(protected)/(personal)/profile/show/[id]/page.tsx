"use client";
import React from "react";
import {
  AddressDetail,
  EducationDetail,
  ProfileDetail,
} from "../../containers/card";
import { Show } from "@/shadcn/components/crud";
import { useProfile } from "../../hooks/show";
import { type IProfile } from "../../interface/model";
import { EmployeeCard } from "@src/app/(protected)/(career)/employee/containers/card";
import { DocumentPDFCard } from "../../../document/containers/card";

export default function ProfileShow({
  params,
}: {
  params: { id: number }
}): JSX.Element {
  const profileId = Number(params.id ?? 0) ?? 0;
  const { data: profileData } = useProfile<IProfile>({ profileId: params.id });
  return (
    <Show>
      <div className="mt-5 flex flex-wrap justify-between">
        <div className="flex-1 min-w-[calc(100%/3 - 1rem)] p-2 space-y-3">
          <ProfileDetail profileData={profileData} visible={false} />
        </div>
        <div className="flex-1 min-w-[calc(100%/3 - 1rem)] p-2 space-y-3">
          <AddressDetail profileId={profileId} />
          <EducationDetail profileId={profileId} />
        </div>
        <div className="flex-1 min-w-[calc(100%/3 - 1rem)] p-2 space-y-3">
          <EmployeeCard profileId={profileId} />
          <DocumentPDFCard profileId={profileId} />
        </div>
      </div>
    </Show>
  );
}
