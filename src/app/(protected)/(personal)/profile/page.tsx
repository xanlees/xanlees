"use client";

import { List } from "@/shadcn/components/crud";
import { Table } from "@/shadcn/components/table";
import { useUserFriendlyName } from "@refinedev/core";
import {
  GenderColumn, getActionsColumn, getSelectColumn, MarriageColumn, PhoneNumberColumn,
} from "@src/common/containers/column";

import {
  DateOfBirth, FullNameColumn, getLatestPosition, getSector, getWorkingAge, UserAccountColumn, Salary,
} from "./containers/table-column";
import { useTableProfile } from "./containers/table/useTableConfig";
import {
  useLatestPositionDetail, useLatestPositionId, useProfileIds, UseUserProfile,
} from "./hooks/table";
import { type UserProfileAccount } from "./interface/model";

import type { IPosition } from "@career";
export default function ProfileList(): JSX.Element {
  const { table } = useTableProfile("EMPLOYEE");
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
        {getSector(positionId as number[], positionData.data)}
        {getWorkingAge()}
        {Salary(positionId as number[], positionData.data)}
        {GenderColumn("gender")}
        {MarriageColumn("maritalStatus")}
        {DateOfBirth}
        {getActionsColumn({ resource: "profile" })}
      </Table>
    </List>
  );
}
