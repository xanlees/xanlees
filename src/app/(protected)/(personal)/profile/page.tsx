"use client";

import { DateOfBirth, FullNameColumn, getLatestPosition } from "./containers/column";
import { List } from "@/shadcn/components/crud";
import { Table } from "@/shadcn/components/table";
import { useUserFriendlyName } from "@refinedev/core";
import { GenderColumn, PhoneNumberColumn, MarriageColumn, getSelectColumn, getActionsColumn } from "@src/common/containers/column";
import { useTableConfig } from "./components/table/useTableConfig";
import { useCurrentAddressID, useLatestPositionDetail, useLatestPositionId, usePersonalAddressDetail } from "./hooks/table";
import { getCurrentAddress, type PersonalAddressData } from "./containers/column/current-address";
import { type IPosition } from "./interface/interface";

export default function ProfileList(): JSX.Element {
  const { table } = useTableConfig();
  const profile = table.options.data ?? [];
  const currentAddressId = useCurrentAddressID(profile);
  const personalAddressData: PersonalAddressData = usePersonalAddressDetail(currentAddressId, profile);
  const positionId = useLatestPositionId(profile);
  const positionData = useLatestPositionDetail(positionId, profile) as { data: { data: IPosition[] } };
  const friendly = useUserFriendlyName();
  return (
    <List>
      <Table table={table}>
        {getSelectColumn(friendly)}
        {FullNameColumn}
        {PhoneNumberColumn("phoneNumber")}
        {getLatestPosition(positionId, positionData.data)}
        {GenderColumn("gender")}
        {MarriageColumn("maritalStatus")}
        {DateOfBirth}
        {getCurrentAddress(personalAddressData.data as PersonalAddressData)}
        {getActionsColumn("profile")}
      </Table>
    </List>
  );
}
