"use client";

import { DateOfBirth, FullNameColumn, getLatestPosition } from "./containers/column";
import { List } from "@/shadcn/components/crud";
import { Table } from "@/shadcn/components/table";
import { useUserFriendlyName } from "@refinedev/core";
import { GenderColumn, PhoneNumberColumn, MarriageColumn, getSelectColumn, getActionsColumn } from "@src/common/containers/column";
import { useTableConfig } from "./containers/table/useTableConfig";
import { useLatestPositionDetail, useLatestPositionId } from "./hooks/table";

import type { IPosition } from "@career";
export default function ProfileList(): JSX.Element {
  const { table } = useTableConfig();
  const profile = table.options.data ?? [];
  const positionId = useLatestPositionId(profile);

  const positionData = useLatestPositionDetail(positionId as number[], profile) as { data: { data: IPosition[] } };
  const friendly = useUserFriendlyName();
  return (
    <List>
      <Table table={table}>
        {getSelectColumn(friendly)}
        {FullNameColumn}
        {PhoneNumberColumn("phoneNumber")}
        {getLatestPosition(positionId as number[], positionData.data)}
        {GenderColumn("gender")}
        {MarriageColumn("maritalStatus")}
        {DateOfBirth}
        {getActionsColumn("profile")}
      </Table>
    </List>
  );
}
