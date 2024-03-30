import React, { forwardRef } from "react";
import {
  FormControl,
  FormItem,
  FormLabel,
} from "@src/shadcn/elements";
import { cn } from "@src/shadcn/lib/utils";
import { RadioGroup, RadioGroupItem } from "@src/shadcn/elements/radio-group";

type RadioGroupFiledProps = {
  value?: any;
  onChange?: (value: string) => void;
  className?: string;
  label?: string;
  name?: string;
  id?: string;
  children?: React.ReactNode;
};

export const RadioGroupFiled = forwardRef<
  React.ElementRef<typeof RadioGroup>,
  RadioGroupFiledProps
>((props, ref) => {
  const { value, onChange, name, className, children, id, ...rest } = props;

  const handleChange = (childValue: string) => {
    if (onChange) {
      onChange(childValue);
    }
  };

  return (
    <div className={cn(className, "flex items-center space-x-2  my-2")}>
      <FormControl>
        <RadioGroup value={value} className={cn(className, "flex")}>
          {React.Children.map(children, (child, index) => {
            if (React.isValidElement(child) && child.type === RadioGroupItem) {
              const itemId = id ? `${id}-${index}` : undefined;
              return (
                <FormItem key={index}>
                  <FormControl>
                    <input
                      type="radio"
                      name={name}
                      id={itemId}
                      className=" mx-1"
                      value={child.props.value}
                      checked={child.props.value === value}
                      onChange={() => handleChange(child.props.value)}
                      {...rest}
                    />
                  </FormControl>
                  <FormLabel htmlFor={itemId} className="font-normal">
                    {child.props.children}
                  </FormLabel>
                </FormItem>
              );
            }
            return null;
          })}
        </RadioGroup>
      </FormControl>
    </div>
  );
});

RadioGroupFiled.displayName = "RadioGroupFiled";