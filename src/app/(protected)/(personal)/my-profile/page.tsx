"use client";
import React from "react";

import { EmployeeCard } from "@src/app/(protected)/(career)/employee/containers/card";
import { getUserSession } from "@src/common/lib/getSession";
import { Show } from "@src/shadcn/components/crud";
import { BreadcrumbItems } from "@src/shadcn/components/breadcrumb/items";

import { UserCard } from "../../user/containers/userCard";
import { DocumentPDFCard } from "../document/containers/card";
import { AddressDetail, EducationDetail, ProfileDetail } from "../profile/containers/card";
import { useProfileUser } from "../profile/hooks";
import { type IProfile } from "../profile/interface/model";
import { useUserCard } from "../../user/hook/useUserCard";
import { type IUser } from "../../user/interface";
import { type HttpError } from "@refinedev/core";
import { type UseTableReturnType } from "@refinedev/react-table";

const breadcrumbs = [
  { label: "ພະນັກງານ", href: "/my-profile" },
];

export default function ProfileShow(): JSX.Element {
  const user = getUserSession()?.user?.id ?? 0;
  const { data: profileData } = useProfileUser<IProfile>({ userId: user ?? 0, filterField: "user" });
  const profileId = Number(profileData?.[0]?.id ?? 0) ?? 0;
  const redirect = `/employee/create/${profileId}/OFFICE/profile`;
  const { table } = useUserCard({ userId: user, filterField: "user" });
  return (
    <Show breadcrumb={<BreadcrumbItems breadcrumbs={breadcrumbs} />} showButtonEdit={false} showButtonDelete={false} >
      <div className="mt-5 flex flex-wrap justify-between gap-2">
        <div className="">
          <ProfileDetail profileData={profileData} visible={false} user={user}/>
        </div>
        <div className="space-y-2">
          <UserCard profileId={user ?? 0} filterField={"user"} table={table as unknown as UseTableReturnType<IUser, HttpError>}/>
          <EmployeeCard profileId={profileId} redirect={redirect} />
        </div>
        <div className="space-y-2">
          <DocumentPDFCard profileId={profileId} />
          <EducationDetail profileId={profileId}/>
          <AddressDetail profileId={profileId} />
        </div>
      </div>
    </Show>
  );
}
