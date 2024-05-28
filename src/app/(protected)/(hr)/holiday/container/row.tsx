"use client";
import { CardView } from "@/shadcn/components/table/card-view";
import { type IHoliday } from "../interface";
import moment from "moment";

interface HolidayRowProps {
  row: {
    original: IHoliday
  }
}

export function HolidayNameRow() {
  return (
    <CardView.Row
      header="ຊື່"
      id="holidayName"
      accessorKey="holidayName"
      isHeader={true}
      cell={({ row }: HolidayRowProps) => {
        const holidayName = row.original?.holidayName ?? "";
        return (
          <div>{holidayName}</div>
        );
      }}
    />
  );
}

export function StartDateRow() {
  return (
    <CardView.Row
      header="ມື້ເລີ່ມ"
      id="startDate"
      accessorKey="startDate"
      cell={({ row }: HolidayRowProps) => {
        const startDate = row.original?.startDate ?? "";
        if (startDate) {
          return moment(startDate).format("DD MMM YYYY");
        }
        return "";
      }}
    />
  );
}

export function EndDateRow() {
  return (
    <CardView.Row
      header="ມື້ຈົບ"
      id="endDate"
      accessorKey="endDate"
      cell={({ row }: HolidayRowProps) => {
        const startDate = row.original?.startDate ?? "";
        if (startDate) {
          return moment(startDate).format("DD MMM YYYY");
        }
        return "";
      }}
    />
  );
}
