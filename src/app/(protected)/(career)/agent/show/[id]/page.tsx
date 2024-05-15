"use client";
import React from "react";
import { EmployeeCard } from "../../../employee/containers/card";
import { Show } from "@/shadcn/components/crud";
import { type IProfile } from "@src/app/(protected)/(personal)/profile/interface/model";
import { UniqueNumberList } from "@src/app/(protected)/(personal)/profile/containers/card/UniqueNumber";
import { DocumentPDFCard } from "@src/app/(protected)/(personal)/document/containers/card";
import { useProfile } from "@src/app/(protected)/(personal)/profile/hooks";
import { AddressDetail, ProfileDetail } from "@src/app/(protected)/(personal)/profile/containers/card";

export default function AgentShow({ params }: { params: { id: number } }): JSX.Element {
  const profileId = Number(params.id ?? 0) ?? 0;
  const { data: profileData } = useProfile<IProfile>({ profileId: params.id });
  const { uniqueNumber } = profileData?.[0] ?? {};
  const redirect = `/employee/create/${profileId}/LOTTERY/profile`;
  return (
    <Show>
      <div className="flex flex-wrap justify-between gap-2 mt-5">
        <div className="">
          <ProfileDetail profileData={profileData} visible={true} disabled={false} userProfile={0} />
        </div>
        <div className="space-y-2">
          <UniqueNumberList uniqueNumber={uniqueNumber}/>
          <DocumentPDFCard profileId={profileId} />
        </div>
        <div className="space-y-2">
          <EmployeeCard profileId={profileId} redirect={redirect} title="ໜ້າວຽກ"/>
          <AddressDetail profileId={profileId} />
        </div>
      </div>
    </Show>
  );
}

