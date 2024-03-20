"use client";

import { DateOfBirth, FullNameColumn, getLatestPosition } from './containers/column';
import { getActionsColumn } from '@src/common/containers/column/action';
import { getSelectColumn } from '@src/common/containers/column/select';
import { List } from '@/shadcn/components/crud';
import { Table } from '@/shadcn/components/table';
import { useUserFriendlyName } from '@refinedev/core';
import type { IPosition } from "../../(career)/employee/interface";
import { GenderColumn, PhoneNumberColumn, MarriageColumn, } from "@src/common/containers/column";
import {
  type PersonalAddressData,
  getCurrentAddress,
} from "./containers/column/current-address";
import {
  usePersonalAddressDetail,
  useCurrentAddressID,
  useLatestPositionId,
  useLatestPositionDetail,
  useTableConfig,
} from "./hooks";

export default function ProfileList(): JSX.Element {
  const { table } = useTableConfig();
  const profile = table.options.data ?? [];
  const currentAddressId = useCurrentAddressID(profile);
  const personalAddressData: PersonalAddressData = usePersonalAddressDetail( currentAddressId, profile );
  const positionId = useLatestPositionId(profile);
  const positionData = useLatestPositionDetail(positionId, profile) as { data: { data: IPosition[] }; };
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
