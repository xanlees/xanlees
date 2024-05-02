"use client";

import { List } from "@/shadcn/components/crud";
import { Table } from "@/shadcn/components/table";
import { useUserFriendlyName } from "@refinedev/core";
import { GenderColumn, PhoneNumberColumn, getSelectColumn } from "@src/common/containers/column";
import { getLatestPosition, type IPosition } from "@career";
import { useLatestPositionDetail, useLatestPositionId } from "../../(personal)/profile/hooks";
import { getActionsColumnAgent } from "./containers/column/getActionsColumnAgent";
import { useTableConfig } from "@personal";
import { FullNameColumn } from "../../(personal)/profile/containers/table-column";

export default function ProfileList(): JSX.Element {
  const { table } = useTableConfig("AGENT");
  const profile = table.options.data ?? [];
  const positionId = useLatestPositionId(profile);
  const positionData = useLatestPositionDetail(positionId as number[], profile) as { data: { data: IPosition[] } };
  const friendly = useUserFriendlyName();
  return (
    <List>
      <Table table={table} SearchBarTitle="ຄົ້ນຫາດ້ວຍ ຊື່ແທ້, ເບີໂທລະສັບ">
        {getSelectColumn(friendly)}
        {FullNameColumn}
        {PhoneNumberColumn("phoneNumber")}
        {getLatestPosition(positionId as number[], positionData.data)}
        {GenderColumn("gender")}
        {getActionsColumnAgent()}
      </Table>
    </List>
  );
}
