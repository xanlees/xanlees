import React, { forwardRef } from "react";
import { FormControl, FormLabel } from "@src/shadcn/elements";
import { cn } from "@src/shadcn/lib/utils";
import { RadioGroup, RadioGroupItem } from "@src/shadcn/elements/radio-group";
import { BaseOption } from "@refinedev/core";

type RadioGroupFiledProps = {
  onChange?: (value: string) => void;
  className?: string;
  defaultValue?: string;
  value?: string;
  options: BaseOption[];
  isSquare?: boolean;
};

export const RadioGroupField = forwardRef<
  React.ElementRef<typeof RadioGroup>,
  RadioGroupFiledProps
>((props, ref) => {
  return (
    <div className={cn(props.className, "mx-2")}>
      <FormControl>
        <RadioGroup
          ref={ref}
          className={cn(props.className, "flex my-2")}
          onValueChange={props.onChange}
          defaultValue={props.defaultValue}
          value={props.value}
        >
          {props.options.map((option, index) => (
            <div key={index} className="flex space-x-2">
              <RadioGroupItem
                isSquare={props.isSquare}
                value={option.value}
                checked={props.value === option.value}
              >
                {option.label}
              </RadioGroupItem>
              <FormLabel>{option.label}</FormLabel>
            </div>
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
});

RadioGroupField.displayName = "RadioGroupField";
