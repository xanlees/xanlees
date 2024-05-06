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
import { Button } from "@src/shadcn/elements";
import { useRouter } from "next/navigation";

const breadcrumbs = [
  { label: "ພະນັກງານ", href: "/my-profile" },
];

export default function ProfileShow(): JSX.Element {
  const router = useRouter();
  const user = getUserSession()?.user?.id ?? 0;
  const { data: profileData } = useProfileUser<IProfile>({ userId: user ?? 0 });
  const profileId = Number(profileData?.[0]?.id ?? 0) ?? 0;
  const redirect = `/employee/create/${profileId}/OFFICE/profile`;
  const handleButtonEdit = () => {
    router.push(`/profile/edit/${profileId}`);
  };
  const handleButtonCreate = () => {
    router.push(`/profile/create/${profileId}`);
  };
  const { table } = useUserCard({ userId: user, filterField: "user" });
  return (
    <Show
      breadcrumb={<BreadcrumbItems breadcrumbs={breadcrumbs} />}
      showButtonEdit={false}
      showButtonDelete={false}
    >
      <Button className="w-20" onClick={handleButtonEdit}>ແກ້ໄຂ</Button>
      <Button className="w-20" onClick={handleButtonCreate}>ສ້າງ</Button>
      <div className="flex flex-wrap gap-1 h-fit">
        <ProfileDetail profileData={profileData} visible={false} user={user}/>
        <UserCard profileId={user ?? 0} filterField={"user"} table={table as unknown as UseTableReturnType<IUser, HttpError>}/>
        <EmployeeCard profileId={profileId} redirect={redirect} />
        <DocumentPDFCard profileId={profileId} />
        <EducationDetail profileId={profileId}/>
        <AddressDetail profileId={profileId} />
      </div>
    </Show>
  );
}
