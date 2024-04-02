"use client";
import React from "react";
import {
  AddressDetail,
  DocumentPDF,
  EducationDetail,
  EmployeeDetail,
  ProfileDetail,
} from "../../containers/card";
import { Show } from "@/shadcn/components/crud";
import {
  useEducation,
  useEmployees,
  usePersonalAddress,
  useProfile,
  useSector,
  useSectorId,
} from "../../hooks/show";
import { type IProfile } from "../../interface/model";
import type { IEmployee, ISector } from "@career";
import type { IEducation, IAddress } from "@personal";

export default function ProfileShow({ params }: { params: { id: number } }): JSX.Element {
  const { data: profileData } = useProfile<IProfile>({ profileId: params.id });
  const { data: employeeData } = useEmployees<IEmployee>({ profileId: params.id });
  const { data: educationData } = useEducation<IEducation[]>({ profileId: params.id });
  const { data: personalAddressData } = usePersonalAddress<IAddress[]>({ profileId: params.id });
  const sectorId = useSectorId(employeeData as IEmployee[]);
  const { data: sectorData } = useSector<ISector>({ sectorId });
  return (
    <Show>
      <div className="md:flex flex-row gap-2 mt-5">
        <ProfileDetail profileData={profileData} visible="agent" />
        <div className=" space-y-2">
          <div className="flex w-full gap-2 ">
            <EmployeeDetail employeeData={employeeData} sectorData={sectorData}/>
            <DocumentPDF profileId={params?.id}/>
          </div>
          <div className="flex w-full gap-2">
            <EducationDetail educationData={educationData as IEducation[]} />
            <AddressDetail personalAddressData={personalAddressData as IAddress[]} />
          </div>
        </div>
      </div>
    </Show>
  );
}

