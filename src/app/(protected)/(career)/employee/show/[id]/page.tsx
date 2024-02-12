/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-lines-per-function */

"use client";
import { useList } from "@refinedev/core";
import { Show } from "@/shadcn/components/crud";
import type {
  IEducation,
  ISector,
  IPersonalAddress,
  IProfile,
} from "../../interface";
import { EmployeeCard } from "../../containers/show/employeeCardProfile";
import React from "react";
import {
  AddressSection,
  EducationSection,
  JoiningDateSection,
  SectionPosition,
  UniqueNumber,
} from "../../containers/show/employeeCardInfo";
import { DocumentPDF } from "../../containers/show/DocumentPDF";
import { useListService, filterProfile, filterEmployee, filterSector } from "../../hooks/useEmployee";
import { usePositionId } from "../../hooks/usePositionId";

export default function EmployeeShow({ params }: { params: { id: number } }): JSX.Element {
  const filtersProfile = filterProfile({ profileId: params?.id });
  const dataProfile = useListService<IProfile>({ resource: "profile", filters: filtersProfile });
  const filtersEmployee = filterEmployee({ profileId: params?.id });
  const dataEmployee = useListService<any>({ resource: "employee", filters: filtersEmployee });
  const position = usePositionId(dataEmployee?.data);
  const filtersSector = filterSector({ sectorId: position });
  const sectorData = useListService<ISector>({ resource: "sector", filters: filtersSector });
  console.log("filtersSector", filtersSector);
  const { data: personalAddressData } = useList<IPersonalAddress>({
    resource: "personal_address",
    errorNotification: false,
    filters: [
      {
        field: "id",
        operator: "eq",
        value: dataEmployee?.data?.[0]?.personalAddressId?.id,
      },
    ],
  });
  const { data: educationData } = useList<IEducation>({
    resource: "education",
    errorNotification: false,
    filters: [
      {
        field: "profile_id",
        operator: "eq",
        value: params?.id,
      },
    ],
  });
  return (
    <Show>
      <div className="py-5">
        <div className="grid grid-cols-4 gap-6 sm:grid-cols-12">
          <div className="col-span-4 sm:col-span-3">
            <EmployeeCard dataProfile={dataProfile} />
          </div>
          <div className="col-span-4 sm:col-span-9">
            <div className="p-6 my-2 border rounded-lg">
              <SectionPosition employee={dataEmployee} sectorData={sectorData} />
              <AddressSection personalAddressData={personalAddressData?.data?.[0]} />
              <EducationSection educationData={educationData} />
              <JoiningDateSection joiningDate={dataEmployee?.data?.[0]?.joiningDate} />
            </div>
            <div className="flex-row gap-x-2 gap-y-2 sm:flex">
              <div className="w-full p-6 my-1 border rounded-lg sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2">
                <UniqueNumber record={dataEmployee} />
              </div>
              <DocumentPDF profileId={params?.id}/>
            </div>
          </div>
        </div>
      </div>
    </Show>
  );
}
