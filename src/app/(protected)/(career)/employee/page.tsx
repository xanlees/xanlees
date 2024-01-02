/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { List } from "@/shadcn/components/crud";
import { Table } from "@/shadcn/components/table";
import { useUserFriendlyName } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import type {
  IEmployee,
} from "./interface";
import { EmployeeContainer, TableSection } from "./employeeLayout";
import { getSelectColumn } from "@src/lib/column/select";
import {
  FullNameColumn,
  PhoneNumberColumn,
  GenderColumn,
  MarriageStatus,
  DateOfBirth,
  EntryDate,
  Position,
} from "./container/column";

import { getCurrentAddress } from "./lib/column/current-address";
import { getOperatorColumn } from "@src/lib/column/operator";
import { getSector } from "./lib/column/sector";
import { usePersonalAddress } from "./service/useCurrentAddress";
import { useSectorID } from "./service/useSectorID";
import { useCurrentAddressID } from "./service/useCurrentAddressID";
import { useSector } from "./service/useSector";

const resource = "employee";
export default function EmployeeList(): JSX.Element {
  const table = useTable<IEmployee>({
    columns: [],
    enableSorting: true,
    enableColumnFilters: true,
    refineCoreProps: { resource },
  });
  const employees = table.options.data ?? [];
  const currentAddressId = useCurrentAddressID(employees);
  const { data: currentAddressData } = usePersonalAddress(currentAddressId, employees);
  const sectorId = useSectorID(employees);
  const { data: sectorData } = useSector(sectorId, employees);
  const friendly = useUserFriendlyName();
  return (
    <List>
      <EmployeeContainer>
        <TableSection>
          <Table table={table}>
            {getSelectColumn(friendly)}
            {FullNameColumn}
            {PhoneNumberColumn}
            {GenderColumn}
            {MarriageStatus}
            {DateOfBirth}
            {EntryDate}
            {getCurrentAddress(currentAddressData)}
            {Position}
            {getSector(sectorData)}
            {getOperatorColumn(resource)}
          </Table>
        </TableSection>
      </EmployeeContainer>
    </List>
  );
}

