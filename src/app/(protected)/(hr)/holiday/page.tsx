"use client";

import { List } from "@/shadcn/components/crud";
import { CardView } from "@/shadcn/components/table/card-view";
import { getActionsButton } from "@src/common/containers/column/actionCard";

import { EndDateRow, HolidayNameRow, StartDateRow, BranchRow } from "./container/row";
import { useTableHoliday } from "./hooks";

export default function HolidayList(): JSX.Element {
  const { table } = useTableHoliday();
  return (
    <List>
      <CardView table={table} className="w-[300px] h-[180px] text-lg">
        {HolidayNameRow()}
        {StartDateRow()}
        {EndDateRow()}
        {BranchRow()}
        {getActionsButton("holiday")}
      </CardView>
    </List>
  );
}
