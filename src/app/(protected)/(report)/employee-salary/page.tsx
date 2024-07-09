"use client";

import { List } from "@/shadcn/components/crud";
import { Table } from "@/shadcn/components/table";
import { format } from "date-fns";
import { useState } from "react";
import { SequenceColumn } from "@src/common/containers/column";
import { MonthAndYearPickerToolbar } from "@src/shadcn/components/table/toolbar/month-year-picker";
import { type Table as TanstackTable } from "@tanstack/react-table";
import { FullnameColumn, PhoneNumberColumn, SalaryColumn, TotalEarningColumn } from "./column";
import { useAttendanceAggregationList, useAttendanceAggregationTable, useEmployee, useUserProfile, type AttendanceDataItem } from "./hook";

const currentMonth = format(new Date(), "yyyy-MM");

export default function EmployeeSalaryList(): JSX.Element {
  const { table } = useAttendanceAggregationTable();
  const [state, setState] = useState({ selectedMonth: currentMonth, branch: 0 });
  const attendanceData = table.options.data ?? [];
  const userIds = getUserIds(attendanceData);
  const userProfileData = useUserProfile({ userIds })?.data?.data ?? [];
  const attendanceDataTotalEarning = useAttendanceAggregationList({ type: "ot,on_time", aggregation: "sum", aggregationField: "earn", checkInMonth: state.selectedMonth })?.data?.data ?? [];
  const employeeData = useEmployee({ userIds })?.data?.data ?? [];
  return (
    <List showCreate={false}>
      <FiltersCard setState={setState} table={table} state={state} />
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

interface FiltersCardProps {
  state: { selectedMonth: string, branch: number }
  setState: React.Dispatch<React.SetStateAction<{ selectedMonth: string, branch: number }>>
  table: TanstackTable<AttendanceDataItem>
}
function FiltersCard({ setState, table, state }: FiltersCardProps): JSX.Element {
  const handleMonthSelect = (selectedMonth: string) => {
    setState((prevState) => ({ ...prevState, selectedMonth }));
  };
  const tableState = table.getState();
  const columnFilters = tableState.columnFilters;
  const filterDate = columnFilters.find((filter) => filter?.id === "check_in_month")?.value;
  const currentDate: string = (filterDate as string) ?? state.selectedMonth;
  return (
    <div className="flex p-4 bg-white rounded-lg shadow-md w-fit gap-x-5 ">
      <div>
        <div className="mb-2 text-lg text-gray-700">ວັນທີ</div>
        <MonthAndYearPickerToolbar table={table} onSelect={handleMonthSelect} defaultValue={currentDate} filterKey="check_in_month" />
      </div>
    </div>
  );
}
