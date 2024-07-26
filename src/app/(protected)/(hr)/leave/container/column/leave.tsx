/* eslint-disable max-lines */
import { Table } from "@/shadcn/components/table";
import UpdateOnSelect from "@src/shadcn/components/updateOnSelect";
import { Badge } from "@src/shadcn/elements";

import { type ILeaveExpand } from "../../lib";
import { cn } from "@src/lib/utils";
import moment from "moment";

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

const options = [
  { value: "Sick Leave", label: "ລາ​ປ່ວຍ", className: "bg-green-500" },
  { value: "Vacation", label: "ພັກ", className: "bg-blue-500" },
  { value: "Personal Leave", label: "ລາ​ສ່ວນ​ຕົວ", className: "bg-yellow-500" },
  { value: "Marriage Leave", label: "ລາ​ແຕ່ງງານ", className: "bg-pink-500" },
];

function getLabelByValue(value: string) {
  const option = options.find((opt) => opt.value === value);
  return option;
}

export function LeveTypeColumn() {
  return (
    <Table.Column<ILeaveExpand>
      header={"ປະເພດລາພັກ"}
      accessorKey="leaveType"
      id="leaveType"
      enableSorting
      enableHiding
      cell={({ row }: any) => {
        const leaveType = row?.original?.leaveType ?? "";
        const leaveTypes = getLabelByValue(leaveType);
        return (
          <Badge variant="destructive" className={cn("rounded-sm h-9", leaveTypes?.className)}>{leaveTypes?.label}</Badge>
        );
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

export function LeaveColumn({ date, header }: { date: string, header: string }) {
  return (
    <Table.Column<ILeaveExpand>
      header={header}
      id={date}
      accessorKey={date}
      cell={(props) => {
        const date = props.getValue() as unknown as string;
        if (date) {
          return moment(date).format("DD/MMM/yyyy");
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
        const startDate = original?.startDate;
        const endDate = original?.endDate;
        if (startDate && endDate) {
          const start = new Date(startDate);
          const end = new Date(endDate);
          const timeDiff = end.getTime() - start.getTime();
          const daysDiff = timeDiff / millisecondsInADay + 1;
          return <Badge>{`${daysDiff} ມື້`}</Badge>;
        }
        return "";
      }}
    />
  );
}

