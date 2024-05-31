"use client";

import { format } from "date-fns";
import React, { useState } from "react";

import { List } from "@/shadcn/components/crud";
import { Table } from "@/shadcn/components/table";
import { type IEmployee, useBranchFormSelect } from "@career";
import { type IHoliday, useHolidayList } from "@hr";
import { SequenceColumn } from "@src/common/containers/column";
import { DatePicker } from "@src/shadcn/elements";
import { ComboboxSelect } from "@src/shadcn/elements/combobox-select";

import {
  CheckIn, CheckInCheckOutTime, CheckInImage, CheckOut, CheckOutImage, FullNameColumn,
} from "./containers/column";
import { CheckInStatus } from "./containers/column/EmployeeLateStatus";
import { workingHour } from "./containers/column/workingHour";
import {
  useAttendance, useBranchId, useEmployeeIsLatest, useProfileIDs, useTableUserProfile, useUserIDs,
} from "./hooks";
import { useWorkTimeSettings } from "./hooks/useWorkTimeSettings";

import type { IWorkTimeSettings, IAttendance } from "./interface";
export default function UserProfileList(): JSX.Element {
  const [selected, setSelected] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const checkInDate = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "No date selected";
  const day = selectedDate ? format(selectedDate, "eeee") : "Monday";
  const { table } = useTableUserProfile({ branchId: selected });
  const userProfile = table.options.data ?? [];
  const userIds = useUserIDs(userProfile);
  const profileId = useProfileIDs(userProfile);
  const holidayData = useHolidayList({ holidayDate: checkInDate })?.data as unknown as IHoliday[];
  const employeeIsLatestData = useEmployeeIsLatest({ profileId })?.data as unknown as IEmployee[];
  const branchId = useBranchId(employeeIsLatestData);
  const attendanceData = useAttendance({ userIds, checkInDate })?.data as unknown as IAttendance[];
  const workTimeSettingsData = useWorkTimeSettings({ branchId, day })?.data as unknown as IWorkTimeSettings[];
  return (
    <List showCreate={false}>
      <DateAndBranchSelector setSelectedDate={setSelectedDate} setSelected={setSelected}/>
      <Table table={table} SearchBarTitle="ຄົ້ນຫາດ້ວຍ ຊື່ແທ້">
        {SequenceColumn()}
        {FullNameColumn}
        {CheckIn({ attendanceData })}
        {CheckInImage({ attendanceData })}
        {CheckOut({ attendanceData })}
        {CheckOutImage({ attendanceData })}
        {workingHour({ attendanceData })}
        {CheckInCheckOutTime({ workTimeSettingsData, employeeIsLatestData })}
        {CheckInStatus({ workTimeSettingsData, employeeIsLatestData, attendanceData, holidayData, date: checkInDate })}
      </Table>
    </List>
  );
}

interface DateAndBranchPickerProps {
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>
  setSelected: React.Dispatch<React.SetStateAction<number>>
}

function DateAndBranchSelector({ setSelectedDate, setSelected }: DateAndBranchPickerProps): JSX.Element {
  const handlePeriodChange = (id: number) => {
    setSelected(id);
  };
  const branch = useBranchFormSelect();
  return (
    <div className="flex p-4 bg-white rounded-lg shadow-md w-fit gap-x-5 ">
      <div>
        <div className="mb-2 text-lg font-semibold text-gray-700">ວັນທີ</div>
        <DatePicker
          onDateChange={(date) => { handleDateChange(date, setSelectedDate); }}
        />
      </div>
      <div>
        <div className="mb-2 text-lg font-semibold text-gray-700">ຂາສາ</div>
        <ComboboxSelect options={branch.options} onChange={handlePeriodChange} label="" className="w-[300px]" defaultValue={""}/>
      </div>
    </div>
  );
}
function handleDateChange(date: Date | undefined, setDate: React.Dispatch<React.SetStateAction<Date | undefined>>) {
  if (date) {
    setDate(date);
  } else {
    setDate(undefined);
  }
}
