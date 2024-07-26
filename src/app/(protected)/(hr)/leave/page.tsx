"use client";

import { List } from "@/shadcn/components/crud";
import { Table } from "@/shadcn/components/table";
import { useTableLeave } from "./hooks";
import { PhoneNumberColumn, SequenceColumn } from "@src/common/containers/column";
import { FullNameColumn, LeaveColumn, LeaveStatus, LeveTypeColumn, NoOfDaysColumn, ProfileImageColumn, ReasonColumn } from "./container/column";

const SickLeave = "Sick Leave";
const Vacation = "Vacation";
const PersonalLeave = "Personal Leave";
// eslint-disable-next-line max-lines-per-function
export default function LeaveList(): JSX.Element {
  const { table } = useTableLeave({ leaveType: PersonalLeave });
  const { table: Vacations } = useTableLeave({ leaveType: Vacation });
  const { table: SickLeaves } = useTableLeave({ leaveType: SickLeave });
  return (
    <List>
      <Table table={table} SearchBarTitle="ຄົ້ນຫາດ້ວຍ ຊື່ແທ້, ເບີໂທລະສັບ" >
        {SequenceColumn()}
        {ProfileImageColumn()}
        {FullNameColumn()}
        {PhoneNumberColumn("profile.phoneNumber")}
        {LeaveStatus()}
        {LeaveColumn({ date: "startDate", header: "ມື້ເລີ່ມ" })}
        {LeaveColumn({ date: "endDate", header: "ມື້ຈົບ" })}
        {LeveTypeColumn()}
        {NoOfDaysColumn()}
        {ReasonColumn()}
      </Table>
      <Table table={Vacations} SearchBarTitle="ຄົ້ນຫາດ້ວຍ ຊື່ແທ້, ເບີໂທລະສັບ" showHeader={false} searchBarShow={false} dataTableToolbarShow={false}>
        {SequenceColumn()}
        {ProfileImageColumn()}
        {FullNameColumn()}
        {PhoneNumberColumn("profile.phoneNumber")}
        {LeaveStatus()}
        {LeaveColumn({ date: "startDate", header: "ມື້ເລີ່ມ" })}
        {LeaveColumn({ date: "endDate", header: "ມື້ຈົບ" })}
        {LeveTypeColumn()}
        {NoOfDaysColumn()}
        {ReasonColumn()}
      </Table>
      <Table table={SickLeaves} SearchBarTitle="ຄົ້ນຫາດ້ວຍ ຊື່ແທ້, ເບີໂທລະສັບ" showHeader={false} searchBarShow={false} dataTableToolbarShow={false}>
        {SequenceColumn()}
        {ProfileImageColumn()}
        {FullNameColumn()}
        {PhoneNumberColumn("profile.phoneNumber")}
        {LeaveStatus()}
        {LeaveColumn({ date: "startDate", header: "ມື້ເລີ່ມ" })}
        {LeaveColumn({ date: "endDate", header: "ມື້ຈົບ" })}
        {LeveTypeColumn()}
        {NoOfDaysColumn()}
        {ReasonColumn()}
      </Table>
    </List>
  );
}

