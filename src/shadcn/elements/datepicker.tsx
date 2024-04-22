"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@src/shadcn/elements/button"
import { Calendar } from "@src/shadcn/elements/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@src/shadcn/elements/popover"


interface DatePickerProps {
  onDateChange?: (date: Date | undefined) => void;
}

export function DatePicker({ onDateChange }: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
    if (onDateChange && typeof onDateChange === 'function') {
      onDateChange(newDate);
    }
  };

  const isInitialMount = React.useRef(true);
  React.useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      handleDateChange(date);
    }
  }, [date]);

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
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
