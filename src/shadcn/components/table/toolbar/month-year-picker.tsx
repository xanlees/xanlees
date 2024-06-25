"use client";

import * as React from "react";
import { Table } from "@tanstack/react-table";
import { MonthYearPicker } from "@src/shadcn/elements/calendar-month";
import { format } from "date-fns";

interface MonthAndYearPickerProps<TData> extends Omit<any, 'onSelect'> {
  table: Table<TData>;
  onSelect?: (date: string) => void;
  defaultValue?: string;
  filterKey?: string;
}

export function MonthAndYearPickerToolbar<TData>({
  table,
  defaultValue,
  onSelect,
  filterKey = "monthAndYear"
}: MonthAndYearPickerProps<TData>) {
  const state = table.getState();
  const { setColumnFilters } = table;
  const columnFilters = state.columnFilters;
  const initialDate = defaultValue ? new Date(defaultValue) : undefined;
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(initialDate);
  const handleSelect = (date: Date) => {
    const formattedDate = format(date, "yyyy-MM");
    setSelectedDate(date);
    const newColumnFilters = [...columnFilters];
    const filterIndex = newColumnFilters.findIndex((filter) => filter.id === filterKey);
    if (filterIndex === -1) {
      newColumnFilters.push({ id: filterKey, value: formattedDate });
    } else {
      newColumnFilters[filterIndex] = { id: filterKey, value: formattedDate };
    }
    setColumnFilters(newColumnFilters);
    if (onSelect) {
      onSelect(formattedDate);
    }
  };
  return (
    <MonthYearPicker
      value={selectedDate}
      onChange={handleSelect}
    />
  );
}
