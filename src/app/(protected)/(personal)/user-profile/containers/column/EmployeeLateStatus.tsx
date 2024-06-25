/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Table } from "@/shadcn/components/table";
import { Badge } from "@src/shadcn/elements";
import { type IEmployee } from "@career";
import { type IHoliday } from "@hr";
import {
  type HolidayCheckProps,
  type CheckInStatusProps, type IUserProfile, type IWorkTimeSettings,
} from "../../interface";
import { cn } from "@src/shadcn/lib/utils";

export function AttendanceTypeColumn({ employeeIsLatestData, workTimeSettingsData, attendanceData, holidayData, date }: CheckInStatusProps): JSX.Element {
  return (
    <Table.Column<IUserProfile>
      header="ສະຖານະ"
      id="lateTime"
      accessorKey="profile.id"
      cell={({ row }) => {
        const profileId = row.original.profile?.id;
        const userId = row.original.user;
        const employee = findEmployee(employeeIsLatestData, profileId);
        const branchId = employee && typeof employee?.branchId === "object"
          ? (employee.branchId as { id: number }).id
          : undefined;
        const workTimeSetting = findWorkTimeSetting(workTimeSettingsData, branchId);
        const holiday = isHoliday({ date, holidayData, branchId });
        const type = attendanceData?.find((item) => item.user === userId)?.type;
        const typeValue = getTypeValue(type ?? "");
        if (!workTimeSetting || !employee || holiday) {
          return <Badge className="bg-gray-600">{"ມື້ນີ້ພັກວຽກ"} {holiday ? holiday.holidayName : ""}</Badge>;
        }
        return (
          <div className="space-y-0.5">
            <Badge className={cn(typeValue.className)}>{typeValue.value}</Badge>
          </div>
        );
      }}
    />
  );
}

export function BranchColumn({ employeeIsLatestData }: { employeeIsLatestData: IEmployee[] }): JSX.Element {
  return (
    <Table.Column<IUserProfile>
      header="ຂາສາ"
      id="branch"
      accessorKey="branch"
      cell={({ row }) => {
        const profileId = row.original.profile?.id;
        const employee = findEmployee(employeeIsLatestData, profileId);
        const branchName = employee && typeof employee?.branchId === "object"
          ? (employee.branchId as { name: string }).name
          : "";
        return (
          <div className="space-y-0.5">
            <Badge className="bg-gray-400">{branchName}</Badge>
          </div>
        );
      }}
    />
  );
}

interface TypeMap {
  key: string
  value: string
  className: string
}

const typeMap: TypeMap[] = [
  { key: "late", value: "ເຂົ້າວຽກຊ້າ", className: "bg-red-500 text-white" },
  { key: "quit", value: "ອອກກອນເວລາ", className: "bg-yellow-500 text-black" },
  { key: "on_time", value: "ເຂົ້າວຽກທັນເວລາ", className: "bg-green-500 text-white" },
  { key: "special_time", value: "ເວລາພິເສດ", className: "bg-blue-500 text-white" },
  { key: "late_early", value: "ເຂົ້າວຽກຊ້າ ແລະ ເຂົ້າວຽກທັນເວລາ", className: "bg-purple-500 text-white" },
  { key: "absent", value: "ບໍ່ມາການ", className: "bg-gray-500 text-white" },
];

function getTypeValue(key: string): { value: string, className: string } {
  const type = typeMap?.find((item) => item.key === key);
  return type ?? { value: "ບໍ່ມາການ", className: "bg-gray-500 text-white" };
}

function findEmployee(employeeIsLatestData: IEmployee[], profileId: number | undefined): IEmployee | undefined {
  return employeeIsLatestData?.find((emp) => emp.profileId === profileId);
}

function findWorkTimeSetting(workTimeSettingsData: IWorkTimeSettings[], branchId: number | undefined): IWorkTimeSettings | undefined {
  return workTimeSettingsData?.find((wt) => wt.branch === branchId);
}

function isHoliday({ date, holidayData, branchId }: HolidayCheckProps): IHoliday | undefined {
  return holidayData?.find((holiday) =>
    holiday.holidayDate.includes(date) && (holiday.branch === null || holiday.branch === branchId),
  ) ?? undefined;
}
