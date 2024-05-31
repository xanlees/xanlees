"use client";

import { List } from "@/shadcn/components/crud";
import { Table } from "@/shadcn/components/table";
import { useTableLeave } from "./hooks";
import { PhoneNumberColumn, SequenceColumn } from "@src/common/containers/column";
import { FullNameColumn, LeaveColumn, LeaveStatus, NoOfDaysColumn, ProfileImageColumn, ReasonColumn } from "./container/column";

export default function LeaveList(): JSX.Element {
  const { table } = useTableLeave();
  return (
    <List>
      <Table table={table} SearchBarTitle="ຄົ້ນຫາດ້ວຍ ຊື່ແທ້, ເບີໂທລະສັບ">
        {SequenceColumn()}
        {ProfileImageColumn()}
        {FullNameColumn()}
        {PhoneNumberColumn("profile.phoneNumber")}
        {LeaveStatus()}
        {LeaveColumn({ leaveDate: 0, header: "ມື້ເລີ່ມ" })}
        {LeaveColumn({ leaveDate: 1, header: "ມື້ຈົບ" })}
        {NoOfDaysColumn()}
        {ReasonColumn()}
      </Table>
    </List>
  );
}

