import React, { useEffect } from "react";
import { Table } from "@tanstack/react-table";
import { ComboboxSelect } from "@src/shadcn/elements/combobox-select";

interface IOption {
  label: string;
  value: number;
}

interface ComboboxSelectToolbarProps<TData> {
  table: Table<TData>;
  options: IOption[];
  onSelect?: (value: any) => void;
  defaultValue?: any
  filterKey?: string;
  label?: string;
  className?: string;
}

export function ComboboxSelectToolbar<TData>({
  table,
  options,
  defaultValue,
  onSelect,
  filterKey = "filterKey",
  label,
  className,
}: ComboboxSelectToolbarProps<TData>) {
  const state = table.getState();
  const { setColumnFilters } = table;
  const columnFilters = state.columnFilters;

  useEffect(() => {
    if (defaultValue !== undefined) {
      handleSelect(defaultValue);
    }
  }, [defaultValue]);

  const handleSelect = (value: any ) => {
    const newColumnFilters = [...columnFilters];
    const filterIndex = newColumnFilters.findIndex((filter) => filter.id === filterKey);
    if (filterIndex === -1) {
      newColumnFilters.push({ id: filterKey, value });
    } else {
      newColumnFilters[filterIndex] = { id: filterKey, value };
    }
    setColumnFilters(newColumnFilters);
    if (onSelect) {
        onSelect(value);
    }
  };

  return (
    <ComboboxSelect
      options={options}
      onChange={handleSelect}
      defaultValue={defaultValue}
      label={label}
      className={className}
    />
  );
}
