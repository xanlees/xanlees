
"use client";
import React from "react";
import { format, parseISO } from "date-fns";
import { useBranchFormSelect } from "@career";
import { ComboboxSelectToolbar } from "@src/shadcn/components/table/toolbar/combobox-toolbar";
import { DatePickerToolbar } from "@src/shadcn/components/table/toolbar/datepicker-toolbar";
import { type Table as TanstackTable } from "@tanstack/react-table";
interface FiltersCardProps {
  table: TanstackTable<any>
  currentDate: string
  branch?: number
}

export function FiltersCard({ table, branch, currentDate }: FiltersCardProps): JSX.Element {
  const branchData = useBranchFormSelect();
  return (
    <div className="flex p-4 bg-white dark:bg-black rounded-lg shadow-md w-fit gap-x-5 border  bg-transparent">
      <div>
        <DatePickerToolbar table={table} defaultValue={currentDate} format="yyyy-MM-dd" filterKey="check_in_date" />
      </div>
      <div>
        <ComboboxSelectToolbar table={table} options={branchData.options} defaultValue={branch} className="w-[280px]" label="ຂາສາ" filterKey="branch" />
      </div>
    </div>
  );
}

export function filterSetAndFormatDate(table: TanstackTable<any>) {
  const newDate = format(new Date(), "yyyy-MM-dd");
  const tableState = table.getState();
  const columnFilters = tableState.columnFilters;
  const filterDate = columnFilters.find((filter: { id: string }) => filter?.id === "check_in_date")?.value;
  const branch = columnFilters.find((filter: { id: string }) => filter?.id === "branch")?.value;
  const currentDate: string = (filterDate as string) ?? newDate;
  const checkInDate = format(parseISO(currentDate), "yyyy-MM-dd");
  const day = format(parseISO(currentDate), "eeee");
  return { currentDate, branch: branch as number | undefined, checkInDate, day };
}

