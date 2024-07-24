"use client";

import { List } from "@/shadcn/components/crud";
import { Table } from "@/shadcn/components/table";
import { GenderColumn, PhoneNumberColumn, SequenceColumn } from "@src/common/containers/column";
import { getLatestPosition, type IPosition } from "@career";
import { useLatestPositionDetail, useLatestPositionId } from "../../(personal)/profile/hooks";
import { getActionsColumn } from "./containers/column/getActionsColumnAgent";
import { useTableConfig } from "@personal";
import { FullNameColumn, ProfileStatus } from "../../(personal)/profile/containers/table-column";

export default function ProfileList(): JSX.Element {
  const { table } = useTableConfig("AGENT,BLOCK");
  const profile = table.options.data ?? [];
  const positionId = useLatestPositionId(profile) as number[];
  const positionData = useLatestPositionDetail(positionId, profile) as { data: { data: IPosition[] } };
  return (
    <List>
      <Table table={table} SearchBarTitle="ຄົ້ນຫາດ້ວຍ ຊື່ແທ້, ເບີໂທລະສັບ">
        {SequenceColumn()}
        {FullNameColumn}
        {PhoneNumberColumn("phoneNumber")}
        {getLatestPosition({ positionId, positionData: positionData.data, title: " ໜ້າວຽກ" })}
        {GenderColumn("gender")}
        {ProfileStatus()}
        {getActionsColumn({ resource: "agent", hideEdit: true })}
      </Table>
    </List>
  );
}
