"use client";

import { List } from "@/shadcn/components/crud";
import { Table } from "@/shadcn/components/table";
import { SequenceColumn } from "@src/common/containers/column";

import { type AttendanceDataItem, useAttendanceAggregationList, useAttendanceAggregationTable, useUserProfile } from "./hook";
import { AttendanceColumn, FullnameColumn, PhoneNumberColumn } from "./column";

export default function AttendanceReportList(): JSX.Element {
  const { table } = useAttendanceAggregationTable();
  const attendanceData = table.options.data ?? [];
  const userIds = getUserIds(attendanceData);
  const userProfileData = useUserProfile({ userIds })?.data?.data ?? [];
  const attendanceDataTypeOnTime = useAttendanceAggregationList({ type: "on_time,ot", aggregation: "count", aggregationField: "user", checkInMonth: "2024-06" })?.data?.data ?? [];
  const attendanceDataTypeLate = useAttendanceAggregationList({ type: "late,late_early", aggregation: "count", aggregationField: "user", checkInMonth: "2024-06" })?.data?.data ?? [];
  const attendanceDataTypeOt = useAttendanceAggregationList({ type: "ot", aggregation: "sum", aggregationField: "ot", checkInMonth: "2024-06" })?.data?.data ?? [];
  return (
    <List showCreate={false}>
      <Table table={table} SearchBarTitle="ຄົ້ນຫາດ້ວຍ ຊື່ແທ້">
        {SequenceColumn()}
        {FullnameColumn({ userProfileData })}
        {PhoneNumberColumn({ userProfileData })}
        {AttendanceColumn({ data: attendanceDataTypeOnTime, header: "ເຂົ້າວຽກທັນເວລາ (ມື້)", className: "bg-green-500" })}
        {AttendanceColumn({ data: attendanceDataTypeLate, header: "ເຂົ້າວຽກຊ້າ (ມື້)", className: "bg-red-500" })}
        {AttendanceColumn({ data: attendanceDataTypeOt, header: "ຊົ່ວໂມງ OT", className: "bg-red-500" })}
      </Table>
    </List>
  );
}

function getUserIds(data: AttendanceDataItem[]): string {
  return data.length > 0 ? data.map((item) => item.user).join(",") : "0";
}
