"use client";

import React from "react";
import { AddressDetail, ProfileDetail, useProfile } from "../../../index";
import { EmployeeCard } from "../../../employee/containers/card";
import { Show } from "@/shadcn/components/crud";
import { type IProfile } from "@src/app/(protected)/(personal)/profile/interface/model";
import { UniqueNumberList } from "@src/app/(protected)/(personal)/profile/containers/card/UniqueNumber";
import { DocumentPDFCard } from "@src/app/(protected)/(personal)/document/containers/card";

export default function AgentShow({ params }: { params: { id: number } }): JSX.Element {
  const profileId = Number(params.id ?? 0) ?? 0;
  const { data: profileData } = useProfile<IProfile>({ profileId: params.id });
  const { uniqueNumber } = profileData?.[0] ?? {};
  return (
    <Show>
      <div className="mt-5 flex flex-wrap justify-between gap-2">
        <div className="">
          <ProfileDetail profileData={profileData} visible={true} />
        </div>
        <div className="space-y-2">
          <UniqueNumberList uniqueNumber={uniqueNumber}/>
          <DocumentPDFCard profileId={profileId} />
        </div>
        <div className="space-y-2">
          <EmployeeCard profileId={profileId} />
          <AddressDetail profileId={profileId} />
        </div>
      </div>
    </Show>
  );
}

