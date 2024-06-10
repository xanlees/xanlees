"use client";

import { cn } from "@/lib/utils";
import { Button } from "@src/shadcn/elements/button";
import { Popover, PopoverContent, PopoverTrigger } from "@src/shadcn/elements/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { buttonVariants } from "./button";
import { ScrollArea } from "./scroll-area";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./select";

type MonthYearSelectorProps = {
  currentYear: number;
  selected: Date | undefined;
  handleSelect: (date: Date) => void;
};

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const MonthYearSelector: React.FC<MonthYearSelectorProps> = ({ currentYear, selected, handleSelect }) => {
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
              <SelectLabel>ເລືອກປີ</SelectLabel>
              <ScrollArea className="h-48">
                {Array.from({ length: 20 }, (_, i) => currentYear - 3 + i).map(year => (
                  <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                ))}
              </ScrollArea>
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
};

type MonthYearPickerProps = {
  value?: Date;
  onChange?: (date: Date) => void;
  className?: string;
};

const MonthYearPicker: React.FC<MonthYearPickerProps> = ({ value, onChange, className }) => {
  const [selected, setSelected] = useState<Date | undefined>(value);
  const currentYear = selected ? selected.getFullYear() : new Date().getFullYear();
  const handleSelect = (date: Date) => {
    setSelected(date);
    if (onChange) {
      onChange(date);
    }
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className={cn("w-[280px] justify-start text-left font-normal", className)}>
          <CalendarIcon className="w-4 h-4 mr-2" />
          {selected ? format(selected, "yyyy-MM") : "Select Date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <MonthYearSelector currentYear={currentYear} selected={selected} handleSelect={handleSelect} />
      </PopoverContent>
    </Popover>
  );
};

export { MonthYearPicker, MonthYearSelector };

