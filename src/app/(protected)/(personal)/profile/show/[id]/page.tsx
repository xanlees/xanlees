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
import { UserCard } from "../../containers/card/userCard";

export default function ProfileShow({ params }: { params: { id: number } }): JSX.Element {
  const profileId = Number(params.id ?? 0) ?? 0;
  const { data: profileData } = useProfile<IProfile>({ profileId: params.id });
  if (profileId === 0) {
    return <div className="px-5 py-2">ບໍ່ມີຂໍ້ມູນ</div>;
  }
  return (
    <Show>
      <div className="mt-5 flex flex-wrap justify-between gap-2">
        <div className="">
          <ProfileDetail profileData={profileData} visible={false} />
        </div>
        <div className="space-y-2">
          <UserCard profileId={profileId}/>
          <EmployeeCard profileId={profileId} />
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
