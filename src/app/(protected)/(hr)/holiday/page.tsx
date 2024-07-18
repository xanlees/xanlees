"use client";

import { List } from "@/shadcn/components/crud";

import { DescriptionRow, EndDateRow, HolidayNameRow, StartDateRow, Type } from "./container/row";
import { useTableHoliday } from "./hooks";
import { Table } from "@src/shadcn/components/table";
import { getActionsColumn } from "@src/common/containers/column";

export default function HolidayList(): JSX.Element {
  const { table } = useTableHoliday();
  return (
    <List>
      <Table table={table} >
        {HolidayNameRow()}
        {DescriptionRow()}
        {StartDateRow()}
        {EndDateRow()}
        {Type()}
        {getActionsColumn({ resource: "holiday" })}
      </Table>
    </List>
  );
}
