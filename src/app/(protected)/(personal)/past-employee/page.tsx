"use client";

import { List } from "@src/shadcn/components/crud";
import { Table } from "@/shadcn/components/table";
import { useLatestPositionDetail, useLatestPositionId } from "../profile/hooks";
import { useProfileIds, UseUserProfile } from "../profile/hooks/table";
import { useTableProfile } from "../profile/containers/table/useTableConfig";
import { useUserFriendlyName } from "@refinedev/core";
import { Badge } from "@src/shadcn/elements";
import type { IPosition } from "@career";
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
  getActionsColumn,
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
        {StatusColumn()}
        {DateOfBirth}
        {getActionsColumn({ resource: "profile" })}
      </Table>
    </List>
  );
}

function StatusColumn() {
  return (
    <Table.Column
      accessorKey="type"
      header={""}
      id="type"
      cell={(props) => {
        const value = props.getValue() as unknown as string;
        let displayText;
        switch (value) {
          case "DISMISS":
            displayText = "ບໍລິສັດໃຫ້ອອກ";
            break;
          case "RESIGN":
            displayText = "ອອກເອງ";
            break;
          default:
            displayText = value;
        }
        return (
          <Badge className="bg-red-500 ">{displayText}</Badge>
        );
      }}
    />
  );
}
