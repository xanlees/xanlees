"use client";

import { List } from "@/shadcn/components/crud";
import { Table } from "@/shadcn/components/table";
import { useUserFriendlyName } from "@refinedev/core";
import { GenderColumn, PhoneNumberColumn, getSelectColumn, getActionsColumn } from "@src/common/containers/column";
import { FullNameColumn, getLatestPosition, useTableConfig, type IPosition } from "@career";
import { useLatestPositionDetail, useLatestPositionId } from "../../(personal)/profile/hooks";

export default function ProfileList(): JSX.Element {
  const { table } = useTableConfig("AGENT");
  const profile = table.options.data ?? [];
  const positionId = useLatestPositionId(profile);
  const positionData = useLatestPositionDetail(positionId as number[], profile) as { data: { data: IPosition[] } };
  const friendly = useUserFriendlyName();
  return (
    <div className="mx-auto">
      <List>
        <div className="w-full sm:w-2/3 mx-auto">
          <Table table={table} SearchBarTitle="ຄົ້ນຫາດ້ວຍ ຊື່ແທ້, ເບີໂທລະສັບ">
            {getSelectColumn(friendly)}
            {FullNameColumn}
            {PhoneNumberColumn("phoneNumber")}
            {getLatestPosition(positionId as number[], positionData.data)}
            {GenderColumn("gender")}
            {getActionsColumn("agent")}
          </Table>
        </div>
      </List>
    </div>

  );
}
