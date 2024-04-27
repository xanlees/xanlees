"use client";
import React from "react";
import { Show } from "@/shadcn/components/crud";
import { ProfileDetail, DocumentPDF, useProfile, useEmployees, usePersonalAddress, useSectorId } from "../../..";
import type { IEmployee, ISector } from "@career";
import type { IAddress } from "@personal";
import { useSector } from "@src/app/(protected)/(personal)/profile/hooks/show";
import { type IProfile } from "@src/app/(protected)/(personal)/profile/interface/model";
import { UniqueNumberList } from "@src/app/(protected)/(personal)/profile/containers/card/UniqueNumber";

export default function AgentShow({ params }: { params: { id: number } }): JSX.Element {
  const { data: profileData } = useProfile<IProfile>({ profileId: params.id });
  const { data: employeeData } = useEmployees<IEmployee>({ profileId: params.id });
  const { data: personalAddressData } = usePersonalAddress<IAddress[]>({ profileId: params.id });
  const sectorId = useSectorId(employeeData as IEmployee[]);
  const { data: sectorData } = useSector<ISector>({ sectorId });
  const { uniqueNumber } = profileData?.[0] ?? {};
  return (
    <Show>
      <div className="flex-row gap-2 mt-5 md:flex">
        <div className="space-y-2">
          <ProfileDetail profileData={profileData} visible={true} />
        </div>
        <div className="space-y-2 ">
          {/* <EmployeeDetail employeeData={employeeData} sectorData={sectorData}/> */}
          <UniqueNumberList uniqueNumber={uniqueNumber}/>
          <DocumentPDF profileId={params?.id}/>
        </div>
        <div className="my-2 sm:my-0">
          {/* <AddressDetail personalAddressData={personalAddressData as IAddress[]} /> */}
        </div>
      </div>
    </Show>
  );
}

