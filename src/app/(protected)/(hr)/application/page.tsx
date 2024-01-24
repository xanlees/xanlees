
"use client";
import { List } from "@/shadcn/components/crud";
import { Table } from "@/shadcn/components/table";
import { useUserFriendlyName } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { getSelectColumn } from "@src/common/containers/column/select";
import { getActionsColumn } from "@src/common/containers/column/action";
import type { IApplication } from "./interface";
import { FullNameColumn, PhoneNumberColumn, GenderColumn, ApplicationDate, MarriageStatus, workExperienceColumn, ApplicationStatusColumn } from "./containers/column";
import { useApplicationID, useApplication } from "./hooks";

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
