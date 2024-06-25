import * as React from "react";
import { Table } from "@tanstack/react-table";
import { format as formatDateFns } from "date-fns";
import { DatePicker } from "@src/shadcn/elements";

interface DatePickerToolbarProps<TData> {
  table: Table<TData>;
  onChange?: (date: string) => void;
  defaultValue?: string;
  filterKey?: string;
  format?: string;
  label?: string;
}

export function DatePickerToolbar<TData>({
  table,
  defaultValue,
  onChange,
  filterKey = "date",
  format,
  label,
}: DatePickerToolbarProps<TData>) {
  const state = table.getState();
  const { setColumnFilters } = table;
  const columnFilters = state.columnFilters;
  const initialDate = defaultValue ? new Date(defaultValue) : undefined;
  const handleSelect = (date: Date | undefined) => {
    if (!date) return;
    const formattedDate = format ? formatDateFns(date, format) : date.toISOString();
    const newColumnFilters = [...columnFilters];
    const filterIndex = newColumnFilters.findIndex((filter) => filter.id === filterKey);
    if (filterIndex === -1) {
      newColumnFilters.push({ id: filterKey, value: formattedDate });
    } else {
      newColumnFilters[filterIndex] = { id: filterKey, value: formattedDate };
    }
    setColumnFilters(newColumnFilters);
    if (onChange) {
      onChange(formattedDate);
    }
  };
  return (
    <DatePicker onChange={handleSelect} defaultValue={initialDate} label={label}/>
  );
}
