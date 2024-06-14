"use client"

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import React, { useState, useEffect } from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@src/shadcn/elements/button';
import { Calendar } from '@src/shadcn/elements/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@src/shadcn/elements/popover';

interface DatePickerProps {
  defaultValue?: Date | string;
  label?: string
  onChange?: (date: Date | undefined) => void;
}

export function DatePicker({ onChange, defaultValue, label = "ວັນທີ" }: DatePickerProps) {
  const initialDate = typeof defaultValue === 'string' ? new Date(defaultValue) : defaultValue;
  const [date, setDate] = useState<Date | undefined>(initialDate);
  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
    if (onChange && typeof onChange === 'function') {
      onChange(newDate);
    }
  };
  useEffect(() => {
    handleDateChange(date);
  }, [date]);
  return (
    <div>
      <div className="my-1">{label}</div>
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
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown-buttons"
            onSelect={handleDateChange}
            initialFocus
            fromYear={1960}
            toYear={2040}
          />
        </PopoverContent>
      </Popover>
    </div>

  );
}
