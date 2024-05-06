import { Table } from "@/shadcn/components/table";
import { type IAttendance } from "../../interface";
import moment from "moment";
export function workingHour({ attendanceData }: { attendanceData: IAttendance[] }) {
  return (
    <Table.Column
      header="ຊົ່ວ​ໂມງ​ເຮັດ​ວຽກ" id="workingHours" accessorKey="workingHours"
      cell={({ row }) => {
        const userId = row?.original?.user as number;
        const attendanceRecord = attendanceData.find((item) => item.user === userId);
        if (!attendanceRecord?.checkIn || !attendanceRecord.checkOut) {
          return <div>ບໍ່ມີຂໍ້ມູນ</div>;
        }
        const checkInTime = moment(attendanceRecord.checkIn);
        const checkOutTime = moment(attendanceRecord.checkOut);
        if (!checkInTime.isValid() || !checkOutTime.isValid()) {
          return <div>ບໍ່ມີຂໍ້ມູນ</div>;
        }
        const duration = moment.duration(checkOutTime.diff(checkInTime));
        const hours = Math.floor(duration.asHours());
        const minutes = duration.minutes();
        const seconds = duration.seconds();
        const formattedDuration = `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
        return <div>{formattedDuration}</div>;
      }}
    />
  );
}
