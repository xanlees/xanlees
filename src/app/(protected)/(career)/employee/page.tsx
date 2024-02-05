"use client";

import { List } from "@/shadcn/components/crud";
import { Table } from "@/shadcn/components/table";
import { useUserFriendlyName } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import type {
  IPersonalAddress,
  IProfile,
} from "./interface";
import { EmployeeContainer, TableSection } from "./employeeLayout";
import { getSelectColumn } from "@src/common/containers/column/select";
import {
  DateOfBirth,
  FullNameColumn,
} from "./containers/column";
import { GenderColumn, PhoneNumberColumn, MarriageColumn } from "@src/common/containers/column";
import { getCurrentAddress } from "./containers/column/current-address";
import { getActionsColumn } from "@src/common/containers/column/action";
import { usePersonalAddress } from "./hooks/useCurrentAddress";
import { useCurrentAddressID } from "./hooks/useCurrentAddressID";

const resource = "profile";
export default function EmployeeList(): JSX.Element {
  const table = useTable<IProfile>({
    columns: [],
    enableSorting: true,
    enableColumnFilters: true,
    refineCoreProps: { resource },
  });
  const profile = table.options.data ?? [];
  const currentAddressId = useCurrentAddressID(profile);
  const { data } = usePersonalAddress(currentAddressId, profile) as { data: IPersonalAddress[] };

  const friendly = useUserFriendlyName();
  return (
    <List>
      <EmployeeContainer>
        <TableSection>
          <Table table={table}>
            {getSelectColumn(friendly)}
            {FullNameColumn}
            {PhoneNumberColumn("phoneNumber")}
            {GenderColumn("gender")}
            {MarriageColumn("maritalStatus")}
            {DateOfBirth}
            {getCurrentAddress(data)}
            {getActionsColumn(resource)}
          </Table>
        </TableSection>
      </EmployeeContainer>
    </List>
  );
}

