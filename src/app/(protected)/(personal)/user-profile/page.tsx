"use client";

import moment from "moment";
import React, { useState } from "react";
import { ComboboxSelect } from "@src/shadcn/elements/combobox-select";
import { DatePicker } from "@src/shadcn/elements";
import { EmployeeLateStatus } from "./containers/table-column/EmployeeLateStatus";
import { format } from "date-fns";
import { getSelectColumn } from "@src/common/containers/column";
import { List } from "@/shadcn/components/crud";
import { Table } from "@/shadcn/components/table";
import { useUserFriendlyName } from "@refinedev/core";
import { useWorkTimeSettings } from "./hooks/useWorkTimeSettings";
import {
  CheckIn,
  CheckInCheckOutTime,
  CheckInImage,
  CheckOut,
  CheckOutImage,
  FullNameColumn,
} from "./containers/table-column";
import {
  useAttendance,
  useBranchId,
  useEmployeeIsLatest,
  useProfileIDs,
  useTableUserProfile,
  useUserIDs,
} from "./hooks";
import type { IWorkTimeSettings, IAttendance } from "./interface";
import { useBranchFormSelect } from "../../(career)/work-time-settings/hook/useWorkTimeSettings";
import { workingHour } from "./containers/table-column/workingHour";
import { type IEmployee } from "../../(career)/employee/interface";

moment.locale("en");
export default function UserProfileList(): JSX.Element {
  const [selected, setSelected] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const checkInDate = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "No date selected";
  const day = selectedDate ? format(selectedDate, "eeee") : "Monday";
  const { table } = useTableUserProfile({ branchId: selected });
  const userProfile = table.options.data ?? [];
  const pageSize = userProfile.length;
  const friendly = useUserFriendlyName();
  const userIds = useUserIDs(userProfile);
  const profileId = useProfileIDs(userProfile);
  const employeeIsLatestData = useEmployeeIsLatest({ profileId })?.data as unknown as IEmployee[];
  const branchId = useBranchId(employeeIsLatestData);
  const attendanceData = useAttendance({ userIds, checkInDate, pageSize })?.data as unknown as IAttendance[];
  const workTimeSettingsData = useWorkTimeSettings({ branchId, day, pageSize })?.data as unknown as IWorkTimeSettings[];
  return (
    <List showCreate={false}>
      <DateAndBranchSelector setSelectedDate={setSelectedDate} setSelected={setSelected}/>
      <Table table={table} SearchBarTitle="ຄົ້ນຫາດ້ວຍ ຊື່ແທ້">
        {getSelectColumn(friendly)}
        {FullNameColumn}
        {CheckIn({ attendanceData })}
        {CheckInImage({ attendanceData })}
        {CheckOut({ attendanceData })}
        {CheckOutImage({ attendanceData })}
        {workingHour({ attendanceData })}
        {CheckInCheckOutTime({ workTimeSettingsData, employeeIsLatestData, attendanceData })}
        {EmployeeLateStatus({ workTimeSettingsData, employeeIsLatestData, attendanceData })}
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
