"use client";
import {
  CheckIn,
  CheckInImage,
  CheckOut,
  CheckOutImage,
  FullNameColumn,
} from "./containers/table-column";
import { DatePicker } from "@src/shadcn/elements";
import { format } from "date-fns";
import { getSelectColumn } from "@src/common/containers/column";
import { List } from "@/shadcn/components/crud";
import { Table } from "@/shadcn/components/table";
import {
  useAttendance,
  useBranchId,
  useEmployeeIsLatest,
  useProfileIDs,
  useTableUserProfile,
  useUserIDs,
} from "./hooks";
import { useState } from "react";
import { useUserFriendlyName } from "@refinedev/core";
import { lateTime, workingHour } from "./containers/table-column/workingHour";
import type { IWorkTimeSettings, IAttendance } from "./interface";
import { type IEmployee } from "../index";
import { useWorkTimeSettings } from "./hooks/useWorkTimeSettings";
import moment from "moment";

moment.locale("en");
export default function UserProfileList(): JSX.Element {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const checkInDate = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "No date selected";
  const day = selectedDate ? format(selectedDate, "eeee") : "Monday";
  const { table } = useTableUserProfile();
  const userProfile = table.options.data ?? [];
  const friendly = useUserFriendlyName();
  const userIds = useUserIDs(userProfile);
  const profileId = useProfileIDs(userProfile);
  const employeeIsLatestData = useEmployeeIsLatest({ profileId })?.data as unknown as IEmployee[];
  const branchId = useBranchId(employeeIsLatestData);
  const attendanceData = useAttendance({ userIds, checkInDate })?.data as unknown as IAttendance[];
  const workTimeSettingsData = useWorkTimeSettings({ branchId, day })?.data as unknown as IWorkTimeSettings[];
  return (
    <List showCreate={false}>
      <div className="bg-white shadow-md rounded-lg p-4 w-fit">
        <div className="text-lg font-semibold text-gray-700 mb-2">ເລືອກວັນທີ</div>
        <DatePicker
          onDateChange={(date) => { handleDateChange(date, setSelectedDate); }}
        />
      </div>
      <Table table={table} SearchBarTitle="ຄົ້ນຫາດ້ວຍ ຊື່ແທ້">
        {getSelectColumn(friendly)}
        {FullNameColumn}
        {CheckIn({ attendanceData })}
        {CheckInImage({ attendanceData })}
        {CheckOut({ attendanceData })}
        {CheckOutImage({ attendanceData })}
        {workingHour({ attendanceData })}
        {lateTime({ workTimeSettingsData, employeeIsLatestData, attendanceData })}
      </Table>
    </List>
  );
}

function handleDateChange(date: Date | undefined, setDate: React.Dispatch<React.SetStateAction<Date | undefined>>) {
  if (date) {
    setDate(date);
  } else {
    setDate(undefined);
  }
}
