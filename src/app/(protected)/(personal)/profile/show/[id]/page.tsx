"use client";
import React from "react";
import {
  AddressDetail,
  EducationDetail,
  ProfileDetail,
} from "../../containers/card";
import { Show } from "@/shadcn/components/crud";
import {
  useProfile,
} from "../../hooks/show";
import { type IProfile } from "../../interface/model";
import { EmployeeCard } from "@src/app/(protected)/(career)/employee/containers/card";
import { DocumentPDFCard } from "../../../document/containers/card";

export default function ProfileShow({ params }: { params: { id: number } }): JSX.Element {
  const profileId = Number(params.id ?? 0) ?? 0;
  const { data: profileData } = useProfile<IProfile>({ profileId: params.id });
  return (
    <Show>
      <div className="flex-row gap-2 mt-5 md:flex">
        <div className="space-y-2">
          <ProfileDetail profileData={profileData} visible={false} />
        </div>
        <div className="space-y-2 ">
          <EmployeeCard profileId={profileId}/>
          <EducationDetail profileId={profileId} />
        </div>
        <div className="my-2 sm:my-0">
          <AddressDetail profileId={profileId}/>
          <DocumentPDFCard profileId={profileId}/>
        </div>
      </div>
    </Show>
  );
}

