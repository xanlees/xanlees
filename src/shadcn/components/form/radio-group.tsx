import React, { forwardRef } from "react";
import {
  FormControl,
} from "@src/shadcn/elements";
import { cn } from "@src/shadcn/lib/utils";
import { RadioGroup, RadioGroupItem } from "@src/shadcn/elements/radio-group";
import { BaseOption } from "@refinedev/core";

type RadioGroupFiledProps = {

  onChange?: (value: string) => void;
  className?: string;
  defaultValue?: string;
  defaultChecked?: boolean;
  options: BaseOption[];
};

export const RadioGroupField = forwardRef<
  React.ElementRef<typeof RadioGroup>,
  RadioGroupFiledProps
>((props, ref) => {

  return (
    <div className={cn(props.className, "flex items-center space-x-2  my-2")}>
      <FormControl>
        <RadioGroup className={cn(props.className, "flex")} onValueChange={props.onChange} defaultValue={props.defaultValue} defaultChecked={props.defaultChecked}>
          {props.options.map((option, index) => (<RadioGroupItem value={option.value} key={index} className="">{option.label}</RadioGroupItem>))}
        </RadioGroup>
      </FormControl>
    </div>
  );
});

RadioGroupField.displayName = "RadioGroupField";