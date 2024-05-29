"use client";

import { List } from "@/shadcn/components/crud";
import { Table } from "@/shadcn/components/table";
import { useTableLeave } from "./hooks";
import { getActionsColumn, PhoneNumberColumn } from "@src/common/containers/column";
import { FullNameColumn, LeaveStatus, ProfileImageColumn, TitleColumn } from "./container/column";

export default function LeaveList(): JSX.Element {
  const { table } = useTableLeave();
  return (
    <List>
      <Table table={table} SearchBarTitle="ຄົ້ນຫາດ້ວຍ ຊື່ແທ້, ເບີໂທລະສັບ">
        {ProfileImageColumn()}
        {FullNameColumn()}
        {PhoneNumberColumn("profile.phoneNumber")}
        {LeaveStatus()}
        {TitleColumn()}
        {getActionsColumn({ resource: "leave" })}
      </Table>
    </List>
  );
}

