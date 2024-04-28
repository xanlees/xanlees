/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client";
import { Table } from "@/shadcn/components/table";
import type { IApplication } from "../../interface";
import UpdateApplicationStatus from "@src/shadcn/components/updateOnSelect";
import { optionsConfig } from "../../lib/constant";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
