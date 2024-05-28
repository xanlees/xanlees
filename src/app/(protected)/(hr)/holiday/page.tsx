"use client";

import { List } from "@/shadcn/components/crud";
import { CardView } from "@/shadcn/components/table/card-view";
import { useTableHoliday } from "./hooks/useTableHoliday";
import { EndDateRow, HolidayNameRow, StartDateRow } from "./container/row";
import { getActionsButton } from "@src/common/containers/column/actionCard";

export default function HolidayList(): JSX.Element {
  const { table } = useTableHoliday();
  return (
    <List>
      <CardView table={table} className="w-[300px] h-[150px] text-lg">
        {HolidayNameRow()}
        {StartDateRow()}
        {EndDateRow()}
        {getActionsButton("holiday")}
      </CardView>
    </List>
  );
}
