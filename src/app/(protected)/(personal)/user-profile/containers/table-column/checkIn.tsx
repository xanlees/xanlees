import { Table } from "@/shadcn/components/table";
import { type IAttendance } from "../../interface";
import moment from "moment";
import { ProfileImageDialog } from "./checkOut";

export function CheckIn({ attendanceData }: { attendanceData: IAttendance[] }) {
  return (
    <Table.Column
      header="ເວລາປໍ້າເຂົ້າ"
      id="user"
      accessorKey="user"
      cell={({ row }) => {
        const userId = row?.original?.user as number;
        const checkInTime = attendanceData.find((item) => item.user === userId)?.checkIn;
        if (checkInTime === null) {
          return <>ຍັງບໍ່ທັນປໍ້າອອກ</>;
        } else if (typeof checkInTime === "string") {
          const formattedTime = moment(checkInTime).format("LTS");
          return <div className="flex">{formattedTime}</div>;
        }
        return <>ບໍ່ມີຂໍ້ມູນ</>;
      }}
    />
  );
}

export function CheckInImage({ attendanceData }: { attendanceData: IAttendance[] }) {
  return (
    <Table.Column
      header="ຮູບພາບປໍ້າເຂົ້າ"
      id="user"
      accessorKey="user"
      cell={({ row }) => {
        const userId = row?.original?.user as number;
        const image = attendanceData.find((item) => item.user === userId)?.image ?? "";
        return <div className="">
          <ProfileImageDialog imageUrl={image}/>
        </div>;
      }}
    />
  );
}
