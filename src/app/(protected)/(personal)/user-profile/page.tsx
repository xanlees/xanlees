"use client";

import { List } from "@/shadcn/components/crud";
import { Table } from "@/shadcn/components/table";
import { type IEmployee } from "@career";
import { type IHoliday, useHolidayList } from "@hr";
import { SequenceColumn } from "@src/common/containers/column";

import {
  AttendanceImage, AttendanceTimeColumn, AttendanceTypeColumn, BranchColumn, FullNameColumn,
  WorkingHourColumn,
} from "./containers/column";
import { FiltersCard, filterSetAndFormatDate } from "./containers/filterCard";
import {
  useAttendanceList, useBranchId, useEmployeeIsLatest, useProfileIDs, useTableUserProfile,
  useUserIDs, useWorkTimeSettings,
} from "./hook";
import { type IWorkTimeSettings } from "./interface";

export default function UserProfileList(): JSX.Element {
  const { table } = useTableUserProfile();
  const { currentDate, branch, checkInDate, day } = filterSetAndFormatDate(table);
  const userProfile = table.options.data ?? [];
  const userIds = useUserIDs(userProfile);
  const attendanceData = useAttendanceList({ userIds, checkInDate: currentDate })?.data?.data ?? [];
  const profileId = useProfileIDs(userProfile);
  const holidayData = useHolidayList({ holidayDate: checkInDate })?.data as unknown as IHoliday[];
  const employeeIsLatestData = useEmployeeIsLatest({ profileId })?.data as unknown as IEmployee[];
  const branchId = useBranchId(employeeIsLatestData);
  const workTimeSettingsData = useWorkTimeSettings({ branchId, day })?.data as unknown as IWorkTimeSettings[];
  return (
    <List showCreate={false}>
      <FiltersCard table={table} branch={branch} currentDate={currentDate}/>
      <Table table={table} SearchBarTitle="ຄົ້ນຫາດ້ວຍ ຊື່ແທ້">
        {SequenceColumn()}
        {FullNameColumn}
        {/* {BranchColumn({ employeeIsLatestData })} */}
        {AttendanceTimeColumn({ attendanceData, columnKey: "checkIn", header: "ເວລາປໍ້າເຂົ້າ" })}
        {AttendanceImage({ attendanceData, columnKey: "image", header: "ຮູບພາບປໍ້າເຂົ້າ" })}
        {AttendanceTimeColumn({ attendanceData, columnKey: "checkOut", header: "ເວລາປໍ້າອອກ" })}
        {AttendanceImage({ attendanceData, columnKey: "imageCheckOut", header: "ຮູບພາບປໍ້າອອກ" })}
        {WorkingHourColumn({ attendanceData })}
        {/* {AttendanceTypeColumn({ workTimeSettingsData, employeeIsLatestData, attendanceData, holidayData, date: checkInDate })} */}
      </Table>
    </List>
  );
}
