
"use client";
import { List } from "@/shadcn/components/crud";
import { InputToClipboard } from "@/shadcn/components/InputToClipboard";
import { Table } from "@/shadcn/components/table";
import { useUserFriendlyName } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { getActionsColumn } from "@src/common/containers/column/action";
import { getSelectColumn } from "@src/common/containers/column/select";

import {
  ApplicationDate, ApplicationStatusColumn, FullNameColumn, GenderColumn, MarriageStatus,
  PhoneNumberColumn, workExperienceColumn, PositionAppliedFor, ExpectedSalary
} from "./containers/column";
import { useApplication, useApplicationID } from "./hooks";
import type { IApplication } from "./interface";

const resource = "application";

export default function ApplicationList(): JSX.Element {
  const table = useTable<IApplication>({
    columns: [],
    enableSorting: true,
    enableColumnFilters: true,
    refineCoreProps: { resource },
  });
  const application = table.options.data ?? [];
  const applicationID = useApplicationID(application);
  const { data: dataWorkExperience } = useApplication({ applicationID, application });
  const friendly = useUserFriendlyName();
  return (
    <List showCreate={false}>
      <span className="mx-2 mt-10 text-sm font-bold">ສົ່ງລີ້ງໃຫ້ຜູ້ສະໝັກ:</span>
      <InputToClipboard value={`${process.env.NEXTAUTH_URL}/application/create`}></InputToClipboard>
      <div className="-mt-[3.25rem]">
        <Table table={table}>
          {getSelectColumn(friendly)}
          {FullNameColumn}
          {PhoneNumberColumn}
          {GenderColumn}
          {MarriageStatus}
          {ApplicationDate}
          {PositionAppliedFor}
          {ExpectedSalary}
          {ApplicationStatusColumn}
          {workExperienceColumn(dataWorkExperience)}
          {getActionsColumn(resource)}
        </Table>
      </div>
    </List>
  );
}
