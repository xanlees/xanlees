"use client";
import { Show } from "@/shadcn/components/crud";
import React from "react";
import { useEmployees, usePersonalAddress, useProfile } from "../../hooks";
import { ProfileDetail } from "../../containers/show/ProfileDetail";
import { EmployeeDetail } from "../../containers/show/Employee";
import { useSector, useSectorId } from "../../hooks/useSector";
import { EducationDetail } from "../../containers/show/Education";
import { useEducation } from "../../hooks/useEducation";
import type { IEducation, IEmployee, IPersonalAddress, IProfile, ISector } from "@src/common/interface/interface";
import { DocumentPDF } from "../../containers/show/DocumentPDF";
import { AddressDetail } from "../../containers/show/Address";

export default function ProfileShow({ params }: { params: { id: number } }): JSX.Element {
  const { data: profileData } = useProfile<IProfile>({ profileId: params.id });
  const { data: employeeData } = useEmployees<IEmployee>({ profileId: params.id });
  const { data: educationData } = useEducation<IEducation[]>({ profileId: params.id });
  const { data: personalAddressData } = usePersonalAddress<IPersonalAddress[]>({ profileId: params.id });
  const sectorId = useSectorId(employeeData as IEmployee[]);
  const { data: sectorData } = useSector<ISector>({ sectorId });
  return (
    <Show>
      <div className="md:flex flex-row gap-2 mt-5">
        <ProfileDetail profileData={profileData} />
        <div className=" space-y-2">
          <div className="flex w-full gap-2 ">
            <EmployeeDetail employeeData={employeeData} sectorData={sectorData}/>
            <DocumentPDF profileId={params?.id}/>
          </div>
          <div className="flex w-full gap-2">
            <EducationDetail educationData={educationData as IEducation[]} />
            <AddressDetail personalAddressData={personalAddressData as IPersonalAddress[]} />
          </div>
        </div>
      </div>
    </Show>
  );
}

