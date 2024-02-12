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
} from "../../interface";
import { EmployeeCard } from "../element/employeeCardProfile";
import React from "react";
import {
  AddressSection,
  EducationSection,
  JoiningDateSection,
  SectionPosition,
  UniqueNumber,
} from "../element/employeeCardInfo";
import { DocumentPDF } from "../element/DocumentPDF";

export default function EmployeeShow({
  params,
}: {
  params: { id: number }
}): JSX.Element {
  const { data: dataEmployee } = useList<any>({
    resource: "employee",
    errorNotification: false,
    filters: [
      {
        field: "profile_id",
        operator: "eq",
        value: params?.id,
      },
    ],
  });
  const { data: sectorData } = useList<ISector>({
    resource: "sector",
    errorNotification: false,
    filters: [
      {
        field: "id",
        operator: "eq",
        value: dataEmployee?.data?.[0]?.positionId?.sectorId,
      },
    ],
  });
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
            <EmployeeCard record={dataEmployee} />
          </div>
          <div className="col-span-4 sm:col-span-9">
            <div className="p-6 my-2 border rounded-lg">
              <SectionPosition record={dataEmployee} sectorData={sectorData} />
              <AddressSection personalAddressData={personalAddressData?.data?.[0]} />
              <EducationSection educationData={educationData} />
              <JoiningDateSection joiningDate={dataEmployee?.joiningDate} />
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
