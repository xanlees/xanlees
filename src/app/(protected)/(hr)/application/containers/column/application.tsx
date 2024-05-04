"use client";
import { Table } from "@/shadcn/components/table";
import moment from "moment";
import type { IApplication } from "../../interface";
import UpdateApplicationStatus from "@src/shadcn/components/updateOnSelect";
import { optionsConfig } from "../../lib/constant";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { type IWorkExperience } from "../../../work-experience/interface";

export const ApplicationDate = (
  <Table.Column
    header="ສະໝັກວັນທີ"
    id="createdOn"
    accessorKey="createdOn"
    cell={(props) => {
      const createdOn = props.getValue();
      if (typeof createdOn === "string") {
        return moment(createdOn).format("DD MMM YYYY");
      }
      return "";
    }}
  />
);

export function ApplicationStatusColumn() {
  const [selectedDate, setSelectedDate] = useState<string | number>("New");
  const handleChange = (val: string | number) => {
    setSelectedDate(val);
  };
  return (
    <Table.Column
      header="ສະຖານະຂອງຟອມ"
      id="application_status"
      accessorKey="applicationStatus"
      cell={(props) => {
        const { applicationStatus, id } =
          (props.row.original as IApplication) ?? {};
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const profile = props.row.original.profileId.id as unknown as number;
        const applicationID = id ?? 0;
        RedirectToCreateEmployee({ selectedDate, profile });
        return (
          <UpdateApplicationStatus
            defaultValue={applicationStatus}
            id={applicationID}
            optionsConfig={optionsConfig}
            field="applicationStatus"
            resource="application"
            onChange={handleChange}
            className="w-[120px]"
          />
        );
      }}
    />
  );
}
function RedirectToCreateEmployee({ selectedDate, profile }: { selectedDate: string | number, profile?: number }) {
  const router = useRouter();
  useEffect(() => {
    if (selectedDate === "Hired") {
      router.push(`/employee/create/${profile}/OFFICE/user`);
    }
  }, [selectedDate, router]);
}

export function workExperienceColumn(dataWorkExperience: IWorkExperience[]) {
  return (
    <Table.Column
      header={"ປະສົບການເຮັດວຽກ"}
      accessorKey="id"
      id="applicationId"
      cell={({ row: { original } }) => {
        const display = (dataWorkExperience as { data?: IWorkExperience[] })?.data?.filter((item) => item?.applicationId === original.id);
        return (
          <div className="space-y-2">
            {display?.map((item, index) => (
              <div key={item.id} className="">
                <div className="flex items-start text-md">
                  <span className="mx-2">{index + 1}.</span>
                  <div className="flex">
                    <div className="mx-1 text-gray-400">ຢູ່ທີ:</div>
                    <div className="">{item.company}</div>
                  </div>
                  <div className="flex">
                    <div className="mx-1 text-gray-400">ເປັນເວລາ:</div>
                    <div className="">{item.time}/{item.position}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      }}
    />
  );
}
