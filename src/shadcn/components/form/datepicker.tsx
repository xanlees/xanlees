import { FormControl } from "@src/shadcn/elements/form";
import { cn } from "@/lib/utils";
import { Button } from "@src/shadcn/elements/button";
import { Calendar } from "@src/shadcn/elements/calendar";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@src/shadcn/elements";
import React, { useEffect, useState } from "react";
import { format, parseISO, isValid, setHours, setMinutes } from "date-fns";

export const DatePickerField = ({ value, onChange, disabled, ...props }: { value?: string; onChange?: (date: Date) => void; className?: string, showTime?: boolean, disabled?: boolean }) => {
  const showTime = props.showTime 
  const dateValue = value ? new Date(value) : null;
  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate && onChange) {
      onChange(selectedDate);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            disabled={disabled}
            variant={"outline"}
            className={cn(
              "pl-3 my-2 text-left font-normal",
              props.className ? props.className : "",
              !dateValue && "text-muted-foreground"
            )}
          >
            {dateValue && isValid(dateValue) ? (
              <>
                <span>{format(dateValue, "MM/dd/yyyy")}</span>
                {showTime ?  <span className="ml-2">/ {format(dateValue, "hh:mm a")}</span> : null}
               
              </>
            ) : (
              <span>ເລືອກວັນທີ</span>
            )}
            <CalendarIcon className="opacity-50 ml-auto w-4 h-4" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-auto" align="start">
        <Calendar
          mode="single"
          captionLayout="dropdown-buttons"
          selected={dateValue as any}
          onSelect={handleDateSelect}
          fromYear={1960}
          toYear={2040}
        />
        {showTime ? <TimePickerField value={dateValue ? dateValue?.toISOString() : undefined} onChange={onChange} /> : null}
      </PopoverContent>
    </Popover>
  );
};

export const TimePickerField = ({ value, onChange }: { value?: string; onChange?: (date: Date) => void }) => {
  const [timeValue, setTimeValue] = useState(value ? format(parseISO(value), "HH:mm") : "00:00");
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTimeValue = e.target.value;
    setTimeValue(newTimeValue);
    if (onChange) {
      const selectedDate = parseISO(value || '');
      const [hours, minutes] = newTimeValue.split(":").map(Number);
      const updatedDate = setMinutes(setHours(selectedDate, hours), minutes);
      onChange(updatedDate);
    }
  };
  useEffect(() => {
    setTimeValue(value ? format(parseISO(value), "HH:mm") : "00:00");
  }, [value]);
  return (
    <p className="flex items-center my-2 mt-4 pl-3">
      <label htmlFor="time" className="mr-1 font-medium">
        ເລືອກໂມງ:
      </label>
      <input
        id="time"
        type="time"
        value={timeValue}
        onChange={handleTimeChange}
        className="border-input file:border-0 bg-transparent file:bg-transparent shadow-sm px-3 py-1 border rounded-md w-40 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
      />
    </p>
  );
};