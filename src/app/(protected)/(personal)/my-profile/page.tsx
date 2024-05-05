"use client";
import React from "react";

import { EmployeeCard } from "@src/app/(protected)/(career)/employee/containers/card";
import { getUserSession } from "@src/common/lib/getSession";
import { Show } from "@src/shadcn/components/crud";

import { UserCard } from "../../user/containers/userCard";
import { DocumentPDFCard } from "../document/containers/card";
import { AddressDetail, EducationDetail, ProfileDetail } from "../profile/containers/card";
import { useProfileUser } from "../profile/hooks";
import { type IProfile } from "../profile/interface/model";

export default function ProfileShow(): JSX.Element {
  const user = getUserSession()?.user?.id;
  const { data: profileData } = useProfileUser<IProfile>({ userId: user ?? 0 });
  console.log("profileData", profileData);
  const profileId = Number(profileData?.[0]?.id ?? 0) ?? 0;
  const redirect = `/employee/create/${profileId}/OFFICE/profile`;
  return (
    <Show>
      <div className="flex flex-wrap gap-1 h-fit">
        <ProfileDetail profileData={profileData} visible={false} />
        <UserCard profileId={user ?? 0} filterField={"user"} userId={user ?? 0}/>
        <EmployeeCard profileId={profileId} redirect={redirect} />
        <DocumentPDFCard profileId={profileId} />
        <EducationDetail profileId={profileId}/>
        <AddressDetail profileId={profileId} />
      </div>
    </Show>
  );
}
