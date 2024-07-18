"use client"

import React, { useState, useEffect } from "react";
import { CalendarIcon } from "lucide-react";
import { format, parseISO } from "date-fns";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button, Calendar, Popover, PopoverContent, PopoverTrigger } from "@src/shadcn/elements";

type DatePickerWithRangeProps = {
  className?: string;
  value?: [string, string];
  onChange?: (range: [string, string] | undefined) => void;
};

export const DatePickerWithRange: React.FC<DatePickerWithRangeProps> = ({
  className,
  value,
  onChange,
}) => {
  const parseDateRange = (value: [string, string] | undefined): DateRange => {
    const today = new Date();
    return {
      from: value?.[0] ? parseISO(value[0]) : undefined,
      to: value?.[1] ? parseISO(value[1]) : undefined,
    };
  };
  const formatDateRange = (range: DateRange): [string, string] | undefined => {
    if (!range?.from) return undefined;
    const from = format(range?.from, "yyyy-MM-dd");
    const to = range?.to ? format(range.to, "yyyy-MM-dd") : from;
    return [from, to];
  };

  const [date, setDate] = useState<DateRange | undefined>(value ? parseDateRange(value) : undefined);

  useEffect(() => {
    if (value) {
      setDate(parseDateRange(value));
    }
  }, [value]);

  const handleDateSelect = (selectedRange: DateRange | undefined) => {
    if (selectedRange) {
      setDate(selectedRange);
      if (onChange) {
        onChange(formatDateRange(selectedRange));
      }
    }
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "pl-3 my-2 justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date?.to ? (
                <>
                  {format(date?.from, "LLL dd, y")} - {format(date?.to, "LLL dd, y")}
                </>
              ) : (
                format(date?.from, "LLL dd, y")
              )
            ) : (
              <span>ເລືອກວັນທີ</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
