
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
  PhoneNumberColumn, workExperienceColumn,
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
      <p className="mx-2 text-sm font-bold">ສົ່ງລີ້ງໃຫ້ຜູ້ສະໝັກ:</p>
      <InputToClipboard value={`${process.env.NEXTAUTH_URL}/application/create`}></InputToClipboard>
      <Table table={table}>
        {getSelectColumn(friendly)}
        {FullNameColumn}
        {PhoneNumberColumn}
        {GenderColumn}
        {MarriageStatus}
        {ApplicationDate}
        {ApplicationStatusColumn}
        {workExperienceColumn(dataWorkExperience)}
        {getActionsColumn(resource)}
      </Table>
    </List>
  );
}
