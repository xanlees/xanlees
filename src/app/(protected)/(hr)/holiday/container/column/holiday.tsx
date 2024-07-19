import moment from "moment";

import { Table } from "@/shadcn/components/table";
import { type IHolidayExpand } from "../../lib";

interface HolidayRowProps {
  row: {
    original: IHolidayExpand
  }
}

export function HolidayNameRow() {
  return (
    <Table.Column
      header="ວັນພັກ"
      id="name"
      accessorKey="name"
      // isHeader={true}
      cell={({ row }: HolidayRowProps) => {
        const holidayName = row.original?.name ?? "";
        return (
          <div>{holidayName}</div>
        );
      }}
    />
  );
}

export function DateRow({ date, header }: { date: number, header: string }) {
  return (
    <Table.Column
      header={header}
      id="date"
      accessorKey="date"
      cell={({ row }: HolidayRowProps) => {
        const holidayDate = row.original?.date?.[date];
        if (holidayDate) {
          return moment(holidayDate).format("DD MMM YYYY");
        }
        return "";
      }}
    />
  );
}

export function Decription() {
  return (
    <Table.Column
      header="ລາຍລະອຽດວັນພັກ"
      id="decription"
      accessorKey="decription"
      cell={({ row }: HolidayRowProps) => {
        const decription = row.original?.decription ?? "";
        return (
          <div>{decription}</div>
        );
      }}
    />
  );
}

const options = [
  { value: "Annual", label: "ພັກທຸກສາຂາ" },
  { value: "Year-Specific", label: "ສະເພາະປີ" },
  { value: "One-Time", label: "ໃຊ້ຄັ້ງດຽວ" },
];

function getLabelByValue(value: string) {
  const option = options.find((opt) => opt.value === value);
  return option ? option.label : value;
}

export function Type() {
  return (
    <Table.Column
      header="ປະເພດ"
      id="type"
      accessorKey="type"
      cell={({ row }: HolidayRowProps) => {
        const type = row.original?.type ?? "";
        const label = getLabelByValue(type);
        return (
          <div>{label}</div>
        );
      }}
    />
  );
}
