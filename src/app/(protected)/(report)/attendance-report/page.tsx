"use client";

import { format } from "date-fns";
import React, { useState } from "react";

import { List } from "@/shadcn/components/crud";
import { Table } from "@/shadcn/components/table";
import { useBranchFormSelect } from "@career";
import { SequenceColumn } from "@src/common/containers/column";
import { ComboboxSelectToolbar } from "@src/shadcn/components/table/toolbar/combobox-toolbar";
import { MonthAndYearPickerToolbar } from "@src/shadcn/components/table/toolbar/month-year-picker";
import { type Table as TanstackTable } from "@tanstack/react-table";

import { AttendanceColumn, FullnameColumn, PhoneNumberColumn } from "./column";
import {
  type AttendanceDataItem, fetchAttendanceData, useAttendanceAggregationTable, useUserProfile,
} from "./hook";

export default function AttendanceReportList(): JSX.Element {
  const { table } = useAttendanceAggregationTable();
  const [state, setState] = useState({ selectedMonth: format(new Date(), "yyyy-MM"), branch: 0 });
  const attendanceData = table.options.data ?? [];
  const userIds = getUserIds(attendanceData);
  const userProfileData = useUserProfile({ userIds })?.data?.data ?? [];
  const { attendanceDataTypeOnTime, attendanceDataTypeLate, attendanceDataTypeOt } = fetchAttendanceData(state);
  return (
    <List showCreate={false}>
      <FiltersCard setState={setState} table={table} state={state} />
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
  console.log("columnFilters", columnFilters);
  const filterDate = columnFilters.find((filter) => filter?.id === "monthAndYear")?.value;
  const currentDate: string = (filterDate as string) ?? state.selectedMonth;
  const branch = useBranchFormSelect();
  return (
    <div className="flex p-4 bg-white rounded-lg shadow-md w-fit gap-x-5 ">
      <div>
        <div className="mb-2 text-lg text-gray-700">ວັນທີ</div>
        <MonthAndYearPickerToolbar table={table} onSelect={handleMonthSelect} defaultValue={currentDate} />
      </div>
      <div>
        <ComboboxSelectToolbar table={table} options={branch.options} defaultValue={""} className="w-[280px]" label="ຂາສາ" filterKey="branch"/>
      </div>
    </div>
  );
}
