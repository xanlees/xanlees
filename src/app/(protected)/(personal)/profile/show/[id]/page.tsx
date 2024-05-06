"use client";
import React from "react";
import {
  AddressDetail,
  EducationDetail,
  ProfileDetail,
} from "../../containers/card";
import { Show } from "@/shadcn/components/crud";
import { EmployeeCard } from "@src/app/(protected)/(career)/employee/containers/card";
import { DocumentPDFCard } from "../../../document/containers/card";
import { UserCard } from "@src/app/(protected)/user/containers/userCard";
import { type UseTableReturnType } from "@refinedev/react-table";
import { type HttpError } from "@refinedev/core";
import { type IUser } from "@src/app/(protected)/user/interface";
import { useUserCard } from "@src/app/(protected)/user/hook/useUserCard";
import { useProfileUser } from "../../hooks";
import { type IProfile } from "../../interface/model";

export default function ProfileShow({ params }: { params: { id: number } }): JSX.Element {
  const profileId = Number(params.id ?? 0) ?? 0;
  const { data: profileData } = useProfileUser<IProfile>({ profileId: profileId ?? 0, filterField: "profile" });
  const redirect = `/employee/create/${profileId}/OFFICE/profile`;
  const { table } = useUserCard({ profileId: 35, filterField: "profile" });

  return (
    <Show>
      <div className="mt-5 flex flex-wrap justify-between gap-2">
        <div className="">
          <ProfileDetail profileData={profileData} visible={false} user={0}/>
        </div>
        <div className="space-y-2">
          <UserCard profileId={35} filterField={"profile"} table={table as unknown as UseTableReturnType<IUser, HttpError>}/>
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
