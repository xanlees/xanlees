"use client";
import React from "react";
import { Show } from "@/shadcn/components/crud";
import { ProfileDetail, EmployeeDetail, DocumentPDF, AddressDetail, useProfile, useEmployees, usePersonalAddress, useSectorId } from "../../..";
import { type IProfile } from "../../interface/model";
import type { IEmployee, ISector } from "@career";
import type { IAddress } from "@personal";
import { useSector } from "@src/app/(protected)/(personal)/profile/hooks/show";

export default function AgentShow({ params }: { params: { id: number } }): JSX.Element {
  const { data: profileData } = useProfile<IProfile>({ profileId: params.id });
  const { data: employeeData } = useEmployees<IEmployee>({ profileId: params.id });
  const { data: personalAddressData } = usePersonalAddress<IAddress[]>({ profileId: params.id });
  const sectorId = useSectorId(employeeData as IEmployee[]);
  const { data: sectorData } = useSector<ISector>({ sectorId });

  return (
    <Show>
      <div className="flex-row gap-2 mt-5 md:flex">
        <div className="">
          <ProfileDetail profileData={profileData} visible={true} />
          <DocumentPDF profileId={params?.id}/>
        </div>
        <div className="space-y-2 ">
          <EmployeeDetail employeeData={employeeData} sectorData={sectorData}/>
        </div>
        <div className="">
          <AddressDetail personalAddressData={personalAddressData as IAddress[]} />
        </div>
      </div>
    </Show>
  );
}

