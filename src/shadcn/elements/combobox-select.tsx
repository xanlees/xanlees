import React, { useEffect, useState } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, Popover, PopoverContent, PopoverTrigger, Button } from "@src/shadcn/elements";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@src/shadcn/lib/utils";
import { type BaseKey } from "@refinedev/core";

interface IOption {
  label: string
  value: number
}

interface SelectProps {
  options: IOption[]
  onChange: (id: number) => void
  defaultValue: BaseKey
  label?: string
  className?: string
}

export const ComboboxSelect: React.FC<SelectProps> = ({ options, onChange, defaultValue, label, className }) => {
  const [open, setOpen] = useState(false);
  const [valueId, setValueId] = useState<number | undefined>(Number(defaultValue));
  useEffect(() => {
    onChange(Number(defaultValue));
    setValueId(Number(defaultValue));
  }, [defaultValue]);
  return (
    <div>
      <div className="my-1">{label ?? "ເລືອກ" }</div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className={cn(className, "justify-between")}>
            {(valueId !== undefined) ? options?.find((item) => item?.value === valueId)?.label : "ເລືອກ..."}
            <CaretSortIcon className="opacity-50 ml-2 w-4 h-4 shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className={cn(className, "p-0")}>
          <ComboboxContent
            options={options}
            valueId={valueId}
            setValueId={setValueId}
            setOpen={setOpen}
            onChange={onChange}
          />
        </PopoverContent>
      </Popover>
    </div>

  );
};

interface ComboboxContentProps {
  options: IOption[]
  valueId: number | undefined
  setValueId: React.Dispatch<React.SetStateAction<number | undefined>>
  onChange: (id: number) => void
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const ComboboxContent: React.FC<ComboboxContentProps> = ({ options, valueId, setValueId, onChange, setOpen }) => {
  return (
    <Command>
      <CommandInput placeholder="ເລືອກງວດ..." className="h-9" />
      <CommandEmpty>ບໍ່.</CommandEmpty>
      <CommandGroup>
        {options?.map((item) => (
          <CommandItem
            key={item.value}
            value={item.label}
            onSelect={() => {
              setValueId(item.value);
              onChange(item.value);
              setOpen(false);
            }}
          >
            {item.label}
            <CheckIcon
              className={cn(
                "ml-auto h-4 w-4",
                valueId === item.value ? "opacity-100" : "opacity-0",
              )}
            />
          </CommandItem>
        ))}
      </CommandGroup>
    </Command>
  );
};
