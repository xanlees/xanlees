/* eslint-disable max-lines */
import moment from "moment";
import { Table } from "@/shadcn/components/table";
import { type IHolidayExpand } from "../../interface";
import { cn } from "@src/lib/utils";
import { Badge } from "@src/shadcn/elements";
interface HolidayRowProps {
  row: {
    original: IHolidayExpand
  }
}
export function DateRow() {
  return (
    <Table.Column
      header={"ວັນພັກ"}
      id="holidayDate"
      accessorKey="holidayDate"
      cell={({ row }: any) => {
        const startDate = row.original?.holidayDate?.[0] ?? "";
        const endDate = row.original?.holidayDate?.[1] ?? "";
        const isEveryYear = row.original?.type === "every_year";
        const formatDate = (date: string) => isEveryYear ? moment(date).format("DD/MMM") : moment(date).format("DD/MMM/yyy");
        if (startDate) {
          return (
            <div className={cn(isEveryYear ? "font-bold" : "font-normal")}>
              {`(${formatDate(startDate)})`}
              {endDate && ` ຫາ (${formatDate(endDate)})`}
            </div>
          );
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
export function NoDaysOffColumn() {
  return (
    <Table.Column
      header={"ຈໍານວນມື້ພັກ"}
      id="days_off"
      accessorKey="date"
      enableHiding
      cell={({ row }: HolidayRowProps) => {
        const holidayDate = row.original?.holidayDate;
        if (holidayDate && holidayDate?.length === 2) {
          const startDate = new Date(holidayDate[0]);
          const endDate = new Date(holidayDate[1]);
          const timeDiff = endDate?.getTime() - startDate?.getTime();
          const daysDiff = timeDiff / millisecondsInADay + 1;
          return <div className={cn("font-bold")}>{`${daysDiff} ມື້`}</div>;
        }
      }}
    />
  );
}

const options = [
  { value: "every_year", label: "ວັນພັກນີ້ໃຊ້ທຸກປີ", className: "bg-green-500" },
  { value: "one_year", label: "ວັນພັກນີ້ສະເພາະປີ້ນີ້", className: "bg-blue-500" },
  { value: "branch_specific", label: "ວັນພັກນີ້ສະເພາະສາຂາ", className: "bg-yellow-500" },
];

function getLabelByValue(value: string) {
  const option = options.find((opt) => opt.value === value);
  return option;
}

export function Type() {
  return (
    <Table.Column
      header="ປະເພດ"
      id="type"
      accessorKey="type"
      cell={({ row }: any) => {
        const type = row.original?.type ?? "";
        const holidayType = getLabelByValue(type);
        return (
          <Badge variant="destructive" className={cn("rounded-sm h-9", holidayType?.className)}>{holidayType?.label}</Badge>
        );
      }}
    />
  );
}
export function BranchHolidayColumn({ holiday }: any) {
  return (
    <Table.Column
      header="ສາຂາ"
      id="branch"
      accessorKey="id"
      enableHiding
      cell={(props) => {
        const holidayId = props.getValue() as unknown as number;
        const branches = holiday?.filter((item: { holiday: number }) => item.holiday === holidayId);
        return (
          <div className="space-y-1">
            {branches.map((item: any, index: number) => (
              <div key={index} className="bg-gray-100 p-2 rounded-md text-gray-800 text-center">
                {item?.branch.name}
              </div>
            ))}
          </div>
        );
      }}
    />
  );
}
