"use client";

import { List } from "@/shadcn/components/crud";
import { Table } from "@/shadcn/components/table";
import { useTableLeave } from "./hooks";
import { PhoneNumberColumn, SequenceColumn } from "@src/common/containers/column";
import { FullNameColumn, LeaveColumn, LeaveStatus, ReasonColumn } from "./container/column";

export default function LeaveList(): JSX.Element {
  const { table } = useTableLeave();
  return (
    <List>
      <Table table={table} SearchBarTitle="ຄົ້ນຫາດ້ວຍ ຊື່ແທ້, ເບີໂທລະສັບ">
        {SequenceColumn()}
        {FullNameColumn()}
        {PhoneNumberColumn("profile.phoneNumber")}
        {LeaveStatus()}
        {LeaveColumn({ date: "startDate", header: "ມື້ເລີ່ມ" })}
        {LeaveColumn({ date: "endDate", header: "ມື້ຈົບ" })}
        {ReasonColumn()}
      </Table>
    </List>
  );
}

