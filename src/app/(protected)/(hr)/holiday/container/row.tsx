import moment from "moment";

import { type IHolidayExpand } from "../lib";

import { Table } from "@src/shadcn/components/table";

interface HolidayRowProps {
  row: {
    original: IHolidayExpand
  }
}

export function HolidayNameRow() {
  return (
    <Table.Column
      header="ຊື່"
      id="holidayName"
      accessorKey="holidayName"
      cell={({ row }: HolidayRowProps) => {
        const holidayName = row.original?.holidayName ?? "";
        return (
          <div>{holidayName}</div>
        );
      }}
    />
  );
}

export function DescriptionRow() {
  return (
    <Table.Column
      header="ລາຍລະອຽດ"
      id="description"
      accessorKey="description"
      cell={({ row }: HolidayRowProps) => {
        const description = row.original?.description ?? "";
        return (
          <div>{description}</div>
        );
      }}
    />
  );
}

export function StartDateRow() {
  return (
    <Table.Column
      header="ມື້ເລີ່ມ"
      id="holidayDate"
      accessorKey="holidayDate"
      cell={({ row }: HolidayRowProps) => {
        const holidayDate = row.original?.holidayDate?.[0] ?? "";
        if (holidayDate?.[0]) {
          return moment(holidayDate?.[0]).format("DD MMM YYYY");
        }
        return "";
      }}
    />
  );
}

export function EndDateRow() {
  return (
    <Table.Column
      header="ມື້ຈົບ"
      id="endDate"
      accessorKey="endDate"
      cell={({ row }: HolidayRowProps) => {
        const endDate = row.original?.holidayDate?.[1] ?? "";
        if (endDate) {
          return moment(endDate).format("DD MMM YYYY");
        }
        return "";
      }}
    />
  );
}

const options = [
  { value: "annual", label: "ພັກທຸກສາຂາ" },
  { value: "year_specefic", label: "ສະເພາະປີ" },
  { value: "one_time", label: "ໃຊ້ຄັ້ງດຽວ" },
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
        console.log("🚀 ~ Type ~ type:", type);
        return (
          <div>{label}</div>
        );
      }}
    />
  );
}
