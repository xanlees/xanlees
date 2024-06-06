"use client";

import { List } from "@/shadcn/components/crud";
import { Table } from "@/shadcn/components/table";
import { SequenceColumn } from "@src/common/containers/column";

import { type AttendanceDataItem, useAttendanceAggregationList, useAttendanceAggregationTable, useEmployee, useUserProfile } from "./hook";
import { TotalEarningColumn, FullnameColumn, PhoneNumberColumn, SalaryColumn } from "./column";

export default function EmployeeSalaryList(): JSX.Element {
  const { table } = useAttendanceAggregationTable();
  const attendanceData = table.options.data ?? [];
  const userIds = getUserIds(attendanceData);
  const userProfileData = useUserProfile({ userIds })?.data?.data ?? [];
  const attendanceDataTotalEarning = useAttendanceAggregationList({ type: "on_time,ot", aggregation: "sum", aggregationField: "earn", checkInMonth: "2024-06" })?.data?.data ?? [];
  const employeeData = useEmployee({ userIds })?.data?.data ?? [];
  return (
    <List showCreate={false}>
      <Table table={table} SearchBarTitle="ຄົ້ນຫາດ້ວຍ ຊື່ແທ້">
        {SequenceColumn()}
        {FullnameColumn({ userProfileData })}
        {PhoneNumberColumn({ userProfileData })}
        {SalaryColumn({ employeeData, userProfileData })}
        {TotalEarningColumn({ data: attendanceDataTotalEarning })}
      </Table>
    </List>
  );
}

function getUserIds(data: AttendanceDataItem[]): string {
  return data.length > 0 ? data.map((item) => item.user).join(",") : "0";
}

