"use client";
import React from "react";
import {
  AddressDetail,
  EducationDetail,
} from "../../containers/card";
import { Show } from "@/shadcn/components/crud";
import { EmployeeCard } from "@src/app/(protected)/(career)/employee/containers/card";
import { DocumentPDFCard } from "../../../document/containers/card";

export default function ProfileShow({ params }: { params: { id: number } }): JSX.Element {
  const profileId = Number(params.id ?? 0) ?? 0;
  // const { data: profileData } = useProfile<IProfile>({ profileId });
  const redirect = `/employee/create/${profileId}/OFFICE/profile`;
  return (
    <Show>
      <div className="mt-5 flex flex-wrap justify-between gap-2">
        <div className="">
          {/* <ProfileDetail profileData={profileData} visible={false} /> */}
        </div>
        <div className="space-y-2">
          {/* <UserCard profileId={profileId} filterField={"profile"} userId={0} /> */}
          <EmployeeCard profileId={profileId} redirect={redirect} />
        </div>
        <div className="space-y-2">
          <DocumentPDFCard profileId={profileId} />
          <EducationDetail profileId={profileId}/>
        </div>
        <div className="">
          <AddressDetail profileId={profileId} />
        </div>
      </div>
    </Show>
  );
}
