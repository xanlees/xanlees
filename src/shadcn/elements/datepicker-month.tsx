"use client"

import * as React from "react"
import { Calendar as CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@src/shadcn/elements/button"
import { Popover, PopoverContent, PopoverTrigger } from "@src/shadcn/elements/popover"
import { MonthAndYear } from "./calendar-month"

interface DatePickerProps {
  onDateChange?: (date: Date | undefined) => void
  defaultValue?: Date
}

export function MonthAndYearPicker({ onDateChange, defaultValue }: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(defaultValue || new Date());
  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
    if (onDateChange && typeof onDateChange === 'function') {
      onDateChange(newDate);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="w-4 h-4 mr-2" />
          {date ? format(date, "MMM yyyy") : <span>Pick a month</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <MonthAndYear
          defaultValue={defaultValue}
          onSelect={handleDateChange}
        />
      </PopoverContent>
    </Popover>
  );
}
