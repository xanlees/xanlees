"use client";

import { List } from "@/shadcn/components/crud";
import { Table } from "@/shadcn/components/table";
import { useUserFriendlyName } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import type {
  IPosition,
  IProfile,
} from "./interface";
import { EmployeeContainer, TableSection } from "./employeeLayout";
import { getSelectColumn } from "@src/common/containers/column/select";
import {
  DateOfBirth,
  FullNameColumn,
} from "./containers/column";
import { GenderColumn, PhoneNumberColumn, MarriageColumn } from "@src/common/containers/column";
import { type PersonalAddressData, getCurrentAddress } from "./containers/column/current-address";
import { getActionsColumn } from "@src/common/containers/column/action";
import { usePersonalAddressDetail } from "./hooks/useCurrentAddressDetail";
import { useCurrentAddressID } from "./hooks/useCurrentAddressID";
import { useLatestPositionId } from "./hooks/useLatestPositionId";
import { useLatestPositionDetail } from "./hooks/useLatestPositionDetails";
import { getLatestPosition } from "./containers/column/latestPosition";

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
  const personalAddressData: PersonalAddressData = usePersonalAddressDetail(currentAddressId, profile);
  const positionId = useLatestPositionId(profile);
  const positionData = useLatestPositionDetail(positionId, profile) as { data: { data: IPosition[] } };

  const friendly = useUserFriendlyName();
  return (
    <List>
      <EmployeeContainer>
        <TableSection>
          <Table table={table}>
            {getSelectColumn(friendly)}
            {FullNameColumn}
            {PhoneNumberColumn("phoneNumber")}
            {getLatestPosition(positionId, positionData.data)}
            {GenderColumn("gender")}
            {MarriageColumn("maritalStatus")}
            {DateOfBirth}
            {getCurrentAddress(personalAddressData.data as PersonalAddressData)}
            {getActionsColumn(resource)}
          </Table>
        </TableSection>
      </EmployeeContainer>
    </List>
  );
}

