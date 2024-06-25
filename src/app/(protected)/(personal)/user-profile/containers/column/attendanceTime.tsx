/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { type IAttendance } from "../../interface";
import { Table, type TableFilterProps } from "@/shadcn/components/table";
import { format, parseISO, differenceInMinutes } from "date-fns";

export function AttendanceTimeColumn({ attendanceData, columnKey, header }: { attendanceData: IAttendance[], columnKey: keyof IAttendance, header: string }) {
  return (
    <Table.Column
      header={header}
      id={columnKey}
      accessorKey={columnKey}
      cell={({ row }) => {
        const userId = row?.original?.user as number;
        const checkInTime = attendanceData.find((item) => item.user === userId)?.[columnKey];
        if (checkInTime === null) {
          return <>ຍັງບໍ່ທັນປໍ້າອອກ</>;
        } else if (typeof checkInTime === "string") {
          const parsedTime = parseISO(checkInTime);
          const formattedTime = format(parsedTime, "p");
          return <div className="flex">{formattedTime}</div>;
        }
        return <>ບໍ່ມີຂໍ້ມູນ</>;
      }}
    />
  );
}

export function AttendanceImage({ attendanceData, columnKey, header }: { attendanceData: IAttendance[], columnKey: string, header: string }) {
  return (
    <Table.Column
      accessorKey={columnKey}
      id={columnKey}
      header={header}
      cell={({ row }) => {
        const userId = row.original.user as number;
        const profileRow = attendanceData.find((item) => item.user === userId);
        return (
          <Table.Image row={profileRow} accessorKey={columnKey} />
        );
      }}
    />
  );
}

export function WorkingHourColumn({ attendanceData }: { attendanceData: IAttendance[] }) {
  return (
    <Table.Column
      header="ຊົ່ວ​ໂມງ​ເຮັດ​ວຽກ" id="workingHours" accessorKey="workingHours"
      cell={({ row }) => {
        const userId = row?.original?.user as number;
        const attendanceRecord = attendanceData.find((item) => item.user === userId);
        if (!attendanceRecord?.checkOut && attendanceRecord?.checkIn) {
          return <div>ຍັງບໍ່ທັນປໍ້າອອກ</div>;
        }
        if (!attendanceRecord?.checkIn || !attendanceRecord.checkOut) {
          return <div>ບໍ່ມີຂໍ້ມູນ</div>;
        }
        const checkInTime = parseISO(attendanceRecord.checkIn);
        const checkOutTime = parseISO(attendanceRecord.checkOut);
        if (isNaN(checkInTime.getTime()) || isNaN(checkOutTime.getTime())) {
          return <div>ບໍ່ມີຂໍ້ມູນ</div>;
        }
        const minutesInHour = 60;
        const durationInMinutes = differenceInMinutes(checkOutTime, checkInTime);
        const hours = Math.floor(durationInMinutes / minutesInHour);
        const minutes = durationInMinutes % minutesInHour;
        return `${hours > 0 ? `${hours} ຊົ່ວໂມງ ` : ""}${minutes} ນາທີ`;
      }}
    />
  );
}

interface IProfile {
  fullname: string
  nickname: string
}

export const FullNameColumn = (
  <Table.Column
    header={"ຊື່ ແລະ ນາມສະກຸນ (ຊຶ່ຫຼີ້ນ)"}
    accessorKey="fullname"
    id="fullname"
    enableSorting
    enableHiding
    filter={(props: TableFilterProps) => (
      <Table.Filter.Search {...props} title="Search fullname" />
    )}
    cell={(props) => {
      const { fullname, nickname } = (props.row.original.profile as IProfile) ?? {};
      return <p className="font-bold">{`${fullname ?? ""} (${nickname ?? ""})`}</p>;
    }}
  />
);
