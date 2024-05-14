import moment from "moment";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { Table } from "@/shadcn/components/table";
import UpdateApplicationStatus from "@src/shadcn/components/updateOnSelect";

import { type IApplication } from "../../interface";
import { optionsConfig } from "../../lib/constant";

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
  const { handleChange } = getApplicationStatusRedirect();
  return (
    <Table.Column<IApplication>
      header="ສະຖານະຂອງຟອມ"
      id="application_status"
      accessorKey="applicationStatus"
      cell={({ row: { original } }) => {
        const { applicationStatus, id, profileId } = original;
        const applicationID = id ?? 0;
        return (
          <UpdateApplicationStatus
            defaultValue={applicationStatus}
            id={applicationID}
            optionsConfig={optionsConfig}
            field="applicationStatus"
            resource="application"
            onChange={(value) => { handleChange(value, profileId.id); }}
            className="w-[120px]"
          />
        );
      }}
    />
  );
}

export function getApplicationStatusRedirect() {
  const [selectedStatus, setSelectedStatus] = useState<string | number>("New");
  const router = useRouter();
  const handleChange = (newValue: string | number, profileId: number) => {
    setSelectedStatus(newValue);
    if (newValue === "Hired") {
      router.push(`/employee/create/${profileId}/OFFICE/user`);
    }
  };
  return { setSelectedStatus, handleChange, selectedStatus };
}
