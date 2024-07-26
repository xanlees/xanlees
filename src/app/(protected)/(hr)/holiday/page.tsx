/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/naming-convention */
"use client";

import { List } from "@/shadcn/components/crud";
import { Table } from "@/shadcn/components/table";
import { BranchHolidayColumn, DateRow, NoDaysOffColumn, Type } from "./container/column/row";
import { useBranchHolidayList, useTableHoliday } from "./hooks";
import { getActionsColumn, SequenceColumn } from "@src/common/containers/column";

const everyYear = "every_year";
const one_year = "one_year, branch_specific";
export default function HolidayList(): JSX.Element {
  const { table } = useTableHoliday({ type: one_year });
  const { table: everyYears } = useTableHoliday({ type: everyYear });
  const holidayIds = getHolidayIds(table.options.data);
  const BranchHolidayData = useBranchHolidayList({ holiday: holidayIds })?.data;
  return (
    <List>
      <div className="flex p-4 bg-white dark:bg-black rounded-lg shadow-md w-fit gap-x-5 font-bold text-2xl">{"ວັນພັກສະເພາະປີ"}</div>
      <Table table={table} SearchBarTitle="ຄົ້ນຫາດ້ວຍ ວັນພັກ, ປະເພດ">
        {SequenceColumn()}
        <Table.Column header={"ວັນພັກ"} accessorKey="holidayName" id="holidayName"/>
        <Table.Column header={"ລາຍລະອຽດ"} accessorKey="description" id="description"/>
        {DateRow()}
        {Type()}
        {NoDaysOffColumn()}
        {BranchHolidayColumn({ holiday: BranchHolidayData ?? [] })}
        {getActionsColumn({ resource: "holiday", hideShow: true })}
      </Table>
      <div className="flex p-4 bg-white dark:bg-black rounded-lg shadow-md w-fit gap-x-5 font-bold text-2xl">{"ວັນພັກໃຊ້ທຸກປີ"}</div>
      <Table table={everyYears} SearchBarTitle="ຄົ້ນຫາດ້ວຍ ວັນພັກ, ປະເພດ" showHeader={false} searchBarShow={false} dataTableToolbarShow={false}>
        {SequenceColumn()}
        <Table.Column header={"ວັນພັກ"} accessorKey="holidayName" id="holidayName"/>
        <Table.Column header={"ລາຍລະອຽດ"} accessorKey="description" id="description"/>
        {DateRow()}
        {Type()}
        {NoDaysOffColumn()}
        {BranchHolidayColumn({ holiday: BranchHolidayData ?? [] })}
        {getActionsColumn({ resource: "holiday", hideShow: true })}
      </Table>
    </List>
  );
}

function getHolidayIds(holiday: any[]) {
  const holidayIds = holiday?.map((item: any) => item.id).join(",");
  return holidayIds;
}
