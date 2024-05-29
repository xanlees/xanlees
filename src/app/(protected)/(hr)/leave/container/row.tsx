import moment from "moment";

import { CardView } from "@/shadcn/components/table/card-view";
import { type IHoliday } from "../lib";

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
    <CardView.Row
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
