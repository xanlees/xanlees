"use client";
import React from "react";

import { EmployeeCard } from "@src/app/(protected)/(career)/employee/containers/card";
import { getUserSession } from "@src/common/lib/getSession";
import { Show } from "@src/shadcn/components/crud";

import { UserCard } from "../../user/containers/userCard";
import { DocumentPDFCard } from "../document/containers/card";
import { AddressDetail, EducationDetail, ProfileDetail } from "../profile/containers/card";
import { useProfile } from "../profile/hooks";
import { type IProfile } from "../profile/interface/model";

export default function ProfileShow(): JSX.Element {
  const user = getUserSession()?.user?.id;
  const { data: profileData } = useProfile<IProfile>({ userId: user });
  const profileId = Number(profileData?.[0]?.id ?? 0) ?? 0;
  const redirect = `/employee/create/${profileId}/OFFICE/profile`;
  return (
    <Show>
      <div className="mt-5 flex flex-wrap justify-between gap-2">
        <div className="">
          <ProfileDetail profileData={profileData} visible={false} />
        </div>
        <div className="space-y-2">
          <UserCard profileId={user ?? 0} filterField={"user"} userId={user ?? 0}/>
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
