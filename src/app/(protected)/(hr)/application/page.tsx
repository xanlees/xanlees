"use client";
import {
  ApplicationDate,
  ApplicationStatusColumn,
  AppliedPosition,
  ExpectedSalary,
  FullNameColumn,
  TagIDColumn,
  workExperienceColumn,
} from "./containers/column";
import { GenderColumn, MarriageColumn, PhoneNumberColumn } from "@src/common/containers/column";
import { getActionsColumn } from "@src/common/containers/column/action";
import { getSelectColumn } from "@src/common/containers/column/select";
import { InputToClipboard } from "@/shadcn/components/InputToClipboard";
import { List } from "@/shadcn/components/crud";
import { refineCoreProps } from "./lib/constant";
import { Table } from "@/shadcn/components/table";
import { useApplication, useApplicationID } from "./hooks";
import { useTable } from "@refinedev/react-table";
import { useUserFriendlyName } from "@refinedev/core";
import type { IApplication } from "./interface";

export default function ApplicationList(): JSX.Element {
  const table = useTable<IApplication>({ columns: [], enableSorting: true, enableColumnFilters: true, refineCoreProps });
  const application = table.options.data ?? [];
  const applicationID = useApplicationID(application);
  const { data: dataWorkExperience } = useApplication({ applicationID, application });
  const friendly = useUserFriendlyName();
  return (
    <List showCreate={false}>
      <span className="mx-2 mt-10 text-sm font-bold">ສົ່ງລີ້ງໃຫ້ຜູ້ສະໝັກ:</span>
      <InputToClipboard value={`${process.env.NEXTAUTH_URL}/application/apply`} />
      <div className="-mt-[3.25rem]">
        <Table table={table} SearchBarTitle="ຄົ້ນຫາດ້ວຍ ຊື່ແທ້ ເບີໂທລະສັບ">
          {getSelectColumn(friendly)}
          {FullNameColumn("profileId.fullname")}
          {PhoneNumberColumn("profileId.phoneNumber")}
          {GenderColumn("profileId.gender")}
          {MarriageColumn("profileId.maritalStatus")}
          {ApplicationDate}
          {AppliedPosition}
          {ExpectedSalary}
          {ApplicationStatusColumn()}
          {TagIDColumn}
          {workExperienceColumn(dataWorkExperience)}
          {getActionsColumn("application")}
        </Table>
      </div>
    </List>
  );
}
