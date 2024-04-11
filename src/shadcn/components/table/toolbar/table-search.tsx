"use client";

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

import { Input } from '@src/shadcn/elements';
import { ColumnFiltersState, Table } from '@tanstack/react-table';

interface DataTableSearchBarProps<TData> {
  table: Table<TData>;
  SearchBarTitle?: string
}

export function DataTableSearchBar<TData>({
  table, SearchBarTitle
}: DataTableSearchBarProps<TData>) {
  const searchParams = useSearchParams();
  const state = table.getState();
  const { setColumnFilters } = table;
  const columnFilters = state.columnFilters as ColumnFiltersState;
  const [searchValue, setSearchValue] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    // Convert URLSearchParams to an array of [key, value] pairs
    if (searchParams === undefined) return
    const paramsArray = Array.from(searchParams?.entries());

    // Find the index of the parameter with the value equal to "search"
    const searchIndex = paramsArray?.findIndex(([key, value]) => value === 'search');

    if (searchIndex !== -1) {
      // Assuming you want the values of the next two parameters after the one with value "search"
      const nextValues = paramsArray?.slice(searchIndex + 1, searchIndex + 3).map(([key, value]) => value);

      // Do something with nextValues, like setting state or logging
      setSearchValue(nextValues[1]);
      if(inputRef.current) {
        (inputRef.current as any).focus();
      }
    }
  }, [searchParams]);

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
    <div className="flex items-center justify-between w-64">
      <Input
        ref={inputRef}
        type="text"
        placeholder= {SearchBarTitle?  SearchBarTitle : "ຄົ້ນຫາ"}
        className="px-2 py-1 border rounded-md"
        value={searchValue}
        onChange={handleSearchChange}
      />
    </div>
  );
}
