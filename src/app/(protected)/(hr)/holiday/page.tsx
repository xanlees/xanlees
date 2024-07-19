"use client";

import { List } from "@/shadcn/components/crud";
import { Table } from "@/shadcn/components/table";

import { DateRow, HolidayNameRow, Decription, Type } from "./container/column/holiday";
import { useTableHoliday } from "./hooks";
import { getActionsColumn, SequenceColumn } from "@src/common/containers/column";

export default function HolidayList(): JSX.Element {
  const { table } = useTableHoliday();
  return (
    <List>
      <Table table={table} SearchBarTitle="ຄົ້ນຫາດ້ວຍ ວັນພັກ, ປະເພດ">
        {SequenceColumn()}
        {HolidayNameRow()}
        {DateRow({ date: 0, header: "ມື້ເລີ່ມ" })}
        {DateRow({ date: 1, header: "ມື້ຈົບ" })}
        {Decription()}
        {Type()}
        {getActionsColumn({ resource: "holiday" })}
      </Table>
    </List>
  );
}
