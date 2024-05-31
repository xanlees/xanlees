"use client";
import React, { useState } from "react";

import { List } from "@/shadcn/components/crud";
import { Table } from "@/shadcn/components/table";
import { type IEmployee, useBranchFormSelect } from "@career";
import { useUserFriendlyName } from "@refinedev/core";
import { getSelectColumn, PhoneNumberColumn } from "@src/common/containers/column";
import { ComboboxSelect } from "@src/shadcn/elements/combobox-select";

import { FullNameColumn } from "../../(personal)/user-profile/containers/column";
import { TotalDays, TotalLateHours, TotalWorkHours } from "./containers/column";
import {
  useBranchId, useEmployeeIsLatest, useProfileIDs, useTableUserProfile, useUserIDs,
} from "../../(personal)/user-profile/hooks";
import type { IWorkTimeSettings, IAttendance } from "./../../(personal)/user-profile/interface";
import { useAttendance, useWorkTimeSettings } from "./hook";
import { format } from "date-fns";

export default function AttendanceReportList(): JSX.Element {
  const [selected, setSelected] = useState<number>(0);
  const { table } = useTableUserProfile({ branchId: selected });
  const userProfile = table.options.data ?? [];
  const friendly = useUserFriendlyName();
  const userIds = useUserIDs(userProfile);
  const profileId = useProfileIDs(userProfile);
  const employeeIsLatestData = useEmployeeIsLatest({ profileId })?.data as unknown as IEmployee[];
  const branchId = useBranchId(employeeIsLatestData);
  const currentMonth = format(new Date(), "yyyy-MM");
  const attendanceData = useAttendance({ userIds, checkInDate: currentMonth })?.data as unknown as IAttendance[];
  const workTimeSettingsData = useWorkTimeSettings({ branchId })?.data as unknown as IWorkTimeSettings[];
  return (
    <List showCreate={false}>
      <DateAndBranchSelector setSelected={setSelected}/>
      <Table table={table} SearchBarTitle="ຄົ້ນຫາດ້ວຍ ຊື່ແທ້">
        {getSelectColumn(friendly)}
        {FullNameColumn}
        {PhoneNumberColumn("profile.phoneNumber")}
        {TotalDays({ workTimeSettingsData, employeeIsLatestData, attendanceData })}
        {TotalLateHours({ workTimeSettingsData, employeeIsLatestData, attendanceData })}
        {TotalWorkHours({ workTimeSettingsData, employeeIsLatestData, attendanceData })}
      </Table>
    </List>
  );
}

interface DateAndBranchPickerProps {
  setSelected: React.Dispatch<React.SetStateAction<number>>
}

function DateAndBranchSelector({ setSelected }: DateAndBranchPickerProps): JSX.Element {
  const handlePeriodChange = (id: number) => {
    setSelected(id);
  };
  const branch = useBranchFormSelect();
  return (
    <div className="flex p-4 bg-white rounded-lg shadow-md w-fit gap-x-5 ">
      <div>
        <div className="mb-2 text-lg font-semibold text-gray-700">ຂາສາ</div>
        <ComboboxSelect options={branch.options} onChange={handlePeriodChange} label="" className="w-[300px]" defaultValue={""}/>
      </div>
    </div>
  );
}
