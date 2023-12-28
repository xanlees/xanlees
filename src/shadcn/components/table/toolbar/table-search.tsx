"use client";

import React, { useState } from 'react';
import { ColumnFiltersState, Table } from "@tanstack/react-table";
import { Input } from '@/shadcn/ui';

interface DataTableSearchBarProps<TData> {
  table: Table<TData>;
}

export function DataTableSearchBar<TData>({
  table,
}: DataTableSearchBarProps<TData>) {
  const state = table.getState();
  const { setColumnFilters } = table;
  const columnFilters = state.columnFilters as ColumnFiltersState;
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);

    const searchFilterIndex = columnFilters.findIndex(
      (filter) => filter.id === 'search'
    );
    const newColumnFilters = [...columnFilters];

    if (searchFilterIndex !== -1) {
      // Update existing 'search' filter
      newColumnFilters[searchFilterIndex] = {
        id: 'search',
        value: value,
      };
    } else {
      // Add new 'search' filter
      newColumnFilters.push({
        id: 'search',
        value: value,
      });
    }

    // Update the columnFilters in the table state using setColumnFilters
    setColumnFilters(newColumnFilters);
  };

  return (
    <div className="flex items-center justify-between w-52">
      <Input
        type="text"
        placeholder="Search..."
        className="px-2 py-1 border rounded-md"
        value={searchValue}
        onChange={handleSearchChange}
      />
    </div>
  );
}
