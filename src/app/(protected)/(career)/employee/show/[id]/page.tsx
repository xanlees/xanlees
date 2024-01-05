/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-lines-per-function */

"use client";

import { useList, useOne, useShow } from "@refinedev/core";
import { Show } from "@/shadcn/components/crud";
import type {
  IEducation,
  IEmployee,
  IPersonalAddress,
  ISector,
} from "../../interface";
import { EmployeeCard } from "../element/employeeCardProfile";
import React from "react";
import { AddressSection, EducationSection, JoiningDateSection, SectionPosition } from "../element/employeeCardInfo";

// eslint-disable-next-line @typescript-eslint/naming-convention
export default function EmployeeShow({
  params,
}: {
  params: { id: number }
}): JSX.Element {
  const { queryResult } = useShow<IEmployee>();
  const { data } = queryResult;
  const record: IEmployee | undefined = data?.data;
  const { data: sectorData } = useOne<ISector>({
    resource: "sector",
    id: record?.positionDetail.sectorId,
  });
  const { data: personalAddressData } = useOne<IPersonalAddress>({
    resource: "personal_address",
    id: record?.profileDetail.personalAddressId,
  });
  const { data: educationData } = useList<IEducation>({
    resource: "education",
    errorNotification: false,
    filters: [
      {
        field: "profile_id",
        operator: "eq",
        value: record?.positionId ?? 0,
      },
    ],
  });
  return (
    <Show>
      <div className="py-5">
        <div className="grid grid-cols-4 gap-6 sm:grid-cols-12">
          <div className="col-span-4 sm:col-span-3">
            <EmployeeCard record={record} />
          </div>
          <div className="col-span-4 sm:col-span-9 ">
            <div className="p-6 border rounded-lg">
              <SectionPosition record={record} sectorData={sectorData?.data} />
              <AddressSection personalAddressData={personalAddressData} />
              <EducationSection educationData={educationData} />
              <JoiningDateSection joiningDate={record?.joiningDate} />
            </div>
          </div>
        </div>
      </div>
    </Show>
  );
}
