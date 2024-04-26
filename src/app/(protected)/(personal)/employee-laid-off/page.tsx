"use client";

import type { IPosition } from "@career";
import { useTableProfile } from "../profile/containers/table/useTableConfig";
import { useLatestPositionDetail, useLatestPositionId } from "../profile/hooks";
import { useProfileIds, UseUserProfile } from "../profile/hooks/table";
import { useUserFriendlyName } from "@refinedev/core";
import { List } from "@src/shadcn/components/crud";
import { Table } from "@/shadcn/components/table";
import {
  DateOfBirth,
  FullNameColumn,
  getLatestPosition,
  UserAccountColumn,
} from "../profile/containers/table-column";
import {
  GenderColumn,
  PhoneNumberColumn,
  MarriageColumn,
  getSelectColumn,
} from "@src/common/containers/column";
import { type UserProfileAccount } from "../profile/interface/model";

export default function ProfileList(): JSX.Element {
  const { table } = useTableProfile("RESIGN,DISMISS");
  const profile = table.options.data ?? [];
  const positionId = useLatestPositionId(profile);
  const positionData = useLatestPositionDetail(positionId as number[], profile) as { data: { data: IPosition[] } };
  const profileIds = useProfileIds(profile);
  const userProfileData = UseUserProfile({ profileIds })?.data;
  const friendly = useUserFriendlyName();
  return (
    <List>
      <Table table={table} SearchBarTitle="ຄົ້ນຫາດ້ວຍ ຊື່ແທ້, ເບີໂທລະສັບ">
        {getSelectColumn(friendly)}
        {FullNameColumn}
        {UserAccountColumn(userProfileData as unknown as UserProfileAccount[])}
        {PhoneNumberColumn("phoneNumber")}
        {getLatestPosition(positionId as number[], positionData.data)}
        {GenderColumn("gender")}
        {MarriageColumn("maritalStatus")}
        {DateOfBirth}
      </Table>
    </List>
  );
}
