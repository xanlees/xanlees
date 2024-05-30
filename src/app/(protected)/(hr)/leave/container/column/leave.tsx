import moment from "moment";

import { Table } from "@/shadcn/components/table";
import UpdateOnSelect from "@src/shadcn/components/updateOnSelect";
import { Badge } from "@src/shadcn/elements";

import { type ILeaveExpand } from "../../lib";

export function ReasonColumn() {
  return (
    <Table.Column<ILeaveExpand>
      header={"ເຫດ​ຜົນ"}
      accessorKey="reason"
      id="reason"
      enableSorting
      enableHiding
      cell={(props) => {
        const reason = props?.row?.original?.reason as unknown as string;
        return <pre>{reason ?? ""}</pre>;
      }}
    />
  );
}

export function LeaveStatus() {
  const options = [
    { value: "Pending", label: "ລໍຖ້າອະນຸມັດ", className: "text-blue-500 border-blue-500" },
    { value: "Approved", label: "ອະນຸມັດແລ້ວ", className: "text-green-500 border-green-500" },
    { value: "Rejected", label: "ປະຕິເສດຄໍາຂໍ", className: "text-red-500 border-red-500" },
  ];
  return (
    <Table.Column<ILeaveExpand>
      header="ສະຖານະ"
      id="status"
      accessorKey="status"
      cell={({ row: { original } }) => {
        const { status, id } = original;
        const leaveID = id ?? 0;
        return (
          <UpdateOnSelect
            defaultValue={status}
            id={leaveID}
            optionsItem={options}
            field="status"
            resource="leave"
            className="w-[120px]"
          />
        );
      }}
    />
  );
}

export function LeaveColumn({ leaveDate, header }: { leaveDate: number, header: string }) {
  return (
    <Table.Column<ILeaveExpand>
      header={header}
      id="leaveDate"
      accessorKey="leaveDate"
      cell={({ row: { original } }) => {
        const date = original.leaveDate?.[leaveDate];
        if (date) {
          return moment(date).format("DD MMM YYYY");
        }
        return "";
      }}
    />
  );
}
const millisecondsInASecond = 1000;
const secondsInAnHour = 3600;
const hoursInADay = 24;
const millisecondsInADay = millisecondsInASecond * secondsInAnHour * hoursInADay;

export function NoOfDaysColumn() {
  return (
    <Table.Column<ILeaveExpand>
      header={"ຈໍານວນມື້ພັກ"}
      id="no_of_days"
      accessorKey="leaveDate"
      cell={({ row: { original } }) => {
        const date = original?.leaveDate;
        if (date && date?.length === 2) {
          const startDate = new Date(date[0]);
          const endDate = new Date(date[1]);
          const timeDiff = endDate?.getTime() - startDate?.getTime();
          const daysDiff = timeDiff / millisecondsInADay + 1;
          return <Badge>{`${daysDiff} ມື້`}</Badge>;
        }
        return "";
      }}
    />
  );
}

