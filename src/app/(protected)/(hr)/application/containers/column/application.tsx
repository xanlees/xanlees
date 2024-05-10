import moment from "moment";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { Table } from "@/shadcn/components/table";
import UpdateApplicationStatus from "@src/shadcn/components/updateOnSelect";

import { type IWorkExperience } from "../../../work-experience/interface";
import { optionsConfig } from "../../lib/constant";

import type { IApplication } from "../../interface";
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

export function ApplicationStatusColumn() {
  const { handleChange, setProfile } = getApplicationStatusRedirect();
  return (
    <Table.Column<IApplication>
      header="ສະຖານະຂອງຟອມ"
      id="application_status"
      accessorKey="applicationStatus"
      cell={({ row: { original } }) => {
        const { applicationStatus, id, profileId } = original;
        const applicationID = id ?? 0;
        useEffect(() => {
          setProfile(profileId?.id);
        }, [profileId]);
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
export function getApplicationStatusRedirect() {
  const [selectedDate, setSelectedDate] = useState<string | number>("New");
  const [profile, setProfile] = useState<number | undefined>();
  const router = useRouter();
  useEffect(() => {
    if (selectedDate === "Hired" && profile) {
      router.push(`/employee/create/${profile}/OFFICE/user`);
    }
  }, [selectedDate, profile, router]);
  const handleChange = (val: string | number) => {
    setSelectedDate(val);
  };
  return { setSelectedDate, setProfile, handleChange };
}
