"use client";

import { FullNameColumn, getLatestPosition } from "./containers/column";
import { List } from "@/shadcn/components/crud";
import { Table } from "@/shadcn/components/table";
import { useUserFriendlyName } from "@refinedev/core";
import { GenderColumn, PhoneNumberColumn, MarriageColumn, getSelectColumn, getActionsColumn } from "@src/common/containers/column";
import { useLatestPositionDetail, useLatestPositionId } from "./hooks/table";

import type { IPosition } from "@career";
import { useTableAgent } from "./hooks/useTableAgent";
export default function ProfileList(): JSX.Element {
  const { table } = useTableAgent();
  const profile = table.options.data ?? [];
  const positionId = useLatestPositionId(profile);
  const positionData = useLatestPositionDetail(positionId as number[], profile) as { data: { data: IPosition[] } };
  const friendly = useUserFriendlyName();
  return (
    <div className="mx-auto">
      <List>
        <Table table={table}>
          {getSelectColumn(friendly)}
          {FullNameColumn()}
          {PhoneNumberColumn("phoneNumber")}
          {getLatestPosition(positionId as number[], positionData.data)}
          {GenderColumn("gender")}
          {MarriageColumn("maritalStatus")}
          {getActionsColumn("agent")}
        </Table>
      </List>
    </div>
  );
}
