"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "./button"

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./select"

export type CalendarProps = {
  selected?: Date
  defaultValue?: Date
  onSelect?: (date: Date) => void
}


const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function MonthAndYear({ defaultValue, onSelect }: CalendarProps) {
  const [selected, setSelected] = React.useState<Date | undefined>(defaultValue || new Date());
  const currentYear = selected ? selected.getFullYear() : new Date().getFullYear();

  const handleSelect = (date: Date) => {
    setSelected(date);
    if (onSelect) {
      onSelect(date);
    }
  };

  const months = monthNames.map((month, index) => ({
    label: month,
    date: new Date(currentYear, index),
  }));

  return (
    <div className="p-4">
      <div className="flex justify-center mb-4">
        <Select
          onValueChange={(value) => handleSelect(new Date(Number(value), selected?.getMonth() ?? 0))}
          defaultValue={currentYear.toString()}
        >
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder={currentYear.toString()} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select Year</SelectLabel>
              {Array.from({ length: 10 }, (_, i) => currentYear - 5 + i).map(year => (
                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className={cn("grid grid-cols-3 gap-4")}>
        {months.map((month) => (
          <button
            key={month.label}
            onClick={() => handleSelect(month.date)}
            className={cn(
              "p-2 border rounded text-center",
              buttonVariants({ variant: selected?.getMonth() === month.date.getMonth() ? "default" : "outline" })
            )}
          >
            {month.label}
          </button>
        ))}
      </div>
    </div>
  );
}

MonthAndYear.displayName = "MonthAndYear"

export { MonthAndYear }
