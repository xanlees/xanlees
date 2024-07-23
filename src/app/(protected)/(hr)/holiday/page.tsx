"use client";

import { List } from "@/shadcn/components/crud";
import { Table, type TableFilterProps } from "@/shadcn/components/table";
import { type IHolidayExpand } from "./interface";
import { BranchHolidayColumn, DateRow, NoDaysOffColumn, Type } from "./container/column/row";
import { useBranchHolidayList, useTableHoliday } from "./hooks";
import { getActionsColumn, SequenceColumn } from "@src/common/containers/column";

export default function HolidayList(): JSX.Element {
  const { table } = useTableHoliday();
  const holidayIds = getHolidayIds(table.options.data);
  const BranchHolidayData = useBranchHolidayList({ holiday: holidayIds })?.data;
  return (
    <List>
      <Table table={table} SearchBarTitle="ຄົ້ນຫາດ້ວຍ ວັນພັກ, ປະເພດ">
        {SequenceColumn()}
        <Table.Column header={"ວັນພັກ"} accessorKey="name" id="name" enableSorting filter={(props: TableFilterProps<IHolidayExpand>) => (<Table.Filter.Search {...(props as unknown as TableFilterProps)} title="ວັນພັກ" />)}/>
        <Table.Column header={"ລາຍລະອຽດ"} accessorKey="decription" id="decription"/>
        {DateRow({ date: 0, header: "ມື້ເລີ່ມ" })}
        {DateRow({ date: 1, header: "ມື້ຈົບ" })}
        {Type()}
        {NoDaysOffColumn()}
        {BranchHolidayColumn({ holiday: BranchHolidayData ?? [] })}
        {getActionsColumn({ resource: "holiday", hideShow: true })}
      </Table>
    </List>
  );
}

function getHolidayIds(holiday: any[]) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  const holidayIds = holiday?.map((item: any) => item.id).join(",");
  return holidayIds;
}
