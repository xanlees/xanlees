"use client";

import { List } from "@/shadcn/components/crud";
import { Table } from "@/shadcn/components/table";
import { useUserFriendlyName } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import type {
  IProfile,
} from "./interface";
import { EmployeeContainer, TableSection } from "./employeeLayout";
import { getSelectColumn } from "@src/common/containers/column/select";
import {
  DateOfBirth,
  FullNameColumn,
} from "./containers/column";
import { GenderColumn, PhoneNumberColumn, MarriageColumn, } from "@src/common/containers/column";
import { getCurrentAddress } from "./containers/column/current-address";
import { getActionsColumn } from "@src/common/containers/column/action";
import { getSector } from "./containers/column/sector";
import { usePersonalAddress } from "./hooks/useCurrentAddress";
import { usePositionId } from "./hooks/useSectorID";
import { useCurrentAddressID } from "./hooks/useCurrentAddressID";
import { usePosition } from "./hooks/useSector";

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
  const { data: currentAddressData } = usePersonalAddress(currentAddressId, profile);
  const sectorId = usePositionId(profile);
  const { data: sectorData } = usePosition({ sectorId });
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
            {getCurrentAddress(currentAddressData)}
            {getActionsColumn(resource)}
          </Table>
        </TableSection>
      </EmployeeContainer>
    </List>
  );
}





