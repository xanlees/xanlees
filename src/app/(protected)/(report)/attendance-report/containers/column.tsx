import { Table } from "@/shadcn/components/table";
import { Badge } from "@src/shadcn/elements";
import { type AttendanceDataProps, calculateAttendance, findEmployee, findWorkTimeSetting, formatHours } from "./calculate";
import { type IUserProfile } from "@src/app/(protected)/(personal)/user-profile/interface";

export function TotalDays({ employeeIsLatestData, workTimeSettingsData, attendanceData }: AttendanceDataProps): JSX.Element {
  return (
    <Table.Column<IUserProfile>
      header="ຈໍານວນມື້ການ"
      id="totalDays"
      accessorKey="profile.id"
      cell={({ row }) => {
        const profileId = row.original.profile?.id;
        const userId = row.original.user;
        const employee = findEmployee(employeeIsLatestData, profileId);
        if (!employee) {
          return <div className="space-y-0.5">ບໍ່ມີຂໍ້ມູນ</div>;
        }
        const workTimeSetting = findWorkTimeSetting(workTimeSettingsData, employee.branchId ?? 0);
        if (!workTimeSetting.length) {
          return <div className="space-y-0.5">ບໍ່ມີຂໍ້ມູນ</div>;
        }
        const userAttendance = attendanceData.filter((attendance) => attendance.user === userId);
        const { totalDays, lateDays } = calculateAttendance(userAttendance, workTimeSetting);
        return (
          <div className="flex flex-col gap-y-2">
            <Badge className="w-fit">{`ຈໍານວນ: ${totalDays} ມື້`}</Badge>
            {lateDays > 0 && (
              <Badge className="bg-red-500 w-fit">{`ຈໍານວນ: ${lateDays} ມື້ມາຊ້າ`}</Badge>
            )}
          </div>
        );
      }}
    />
  );
}

export function TotalLateHours({ employeeIsLatestData, workTimeSettingsData, attendanceData }: AttendanceDataProps): JSX.Element {
  return (
    <Table.Column<IUserProfile>
      header="ຊົ່ວໂມງ OT ແລະ ມາຊ້າ"
      id="totalDays"
      accessorKey="profile.id"
      cell={({ row }) => {
        const profileId = row.original.profile?.id;
        const userId = row.original.user;
        const employee = findEmployee(employeeIsLatestData, profileId);
        if (!employee) {
          return <div className="space-y-0.5">ບໍ່ມີຂໍ້ມູນ</div>;
        }
        const workTimeSetting = findWorkTimeSetting(workTimeSettingsData, employee.branchId ?? 0);
        if (!workTimeSetting.length) {
          return <div className="space-y-0.5">ບໍ່ມີຂໍ້ມູນ</div>;
        }
        const userAttendance = attendanceData.filter((attendance) => attendance.user === userId);
        const { totalOTHours, totalLateHours } = calculateAttendance(userAttendance, workTimeSetting);
        return (
          <div className="flex flex-col w-fit gap-y-2">
            <Badge className="bg-green-500 w-fit">{`OT: ${formatHours(totalOTHours)}`}</Badge>
            {totalLateHours > 0 && (
              <Badge className="bg-red-500 w-fit">{`ມາຊ້າ: ${formatHours(totalLateHours)}`}</Badge>
            )}
          </div>
        );
      }}
    />
  );
}
export function TotalWorkHours({ employeeIsLatestData, workTimeSettingsData, attendanceData }: AttendanceDataProps): JSX.Element {
  return (
    <Table.Column<IUserProfile>
      header="ຊົ່ວໂມງເຮັດທັງໝົດ"
      id="totalDays"
      accessorKey="profile.id"
      cell={({ row }) => {
        const profileId = row.original.profile?.id;
        const userId = row.original.user;
        const employee = findEmployee(employeeIsLatestData, profileId);
        if (!employee) {
          return <div className="space-y-0.5">ບໍ່ມີຂໍ້ມູນ</div>;
        }
        const workTimeSetting = findWorkTimeSetting(workTimeSettingsData, employee.branchId ?? 0);
        if (!workTimeSetting.length) {
          return <div className="space-y-0.5">ບໍ່ມີຂໍ້ມູນ</div>;
        }
        const userAttendance = attendanceData.filter((attendance) => attendance.user === userId);
        const { totalWorkHours } = calculateAttendance(userAttendance, workTimeSetting);
        return (
          <div className="flex flex-col w-fit gap-y-2">
            <Badge className="bg-green-500 w-fit">{`${formatHours(totalWorkHours)}`}</Badge>
          </div>
        );
      }}
    />
  );
}
