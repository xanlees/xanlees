import { BaseOption } from "@refinedev/core";
import React, { forwardRef } from "react";
import type { Content as SwitchContentType } from "@radix-ui/react-select";
import { cn } from "@src/lib/utils";
import { FormControl } from "@src/shadcn/elements/form";
import { Label } from "@src/shadcn/elements";
import { Switch } from "@src/shadcn/elements/switch";

type SwitchButtonProps = {
  value?: boolean;
  onChange?: (value: boolean) => void;
  placeholder?: string;
  emptyMessage?: string;
  options?: BaseOption[];
  activeLabel?: string;
  inactiveLabel?: string;
  className?: string;
  require?: boolean;
};

export const SwitchButton = forwardRef<
  React.ElementRef<typeof SwitchContentType>,
  SwitchButtonProps
>((props, ref) => {
  const { value, onChange, activeLabel, inactiveLabel, className, require = true, ...rest } = props;
  return (
    <div  className={cn(className, "flex items-center space-x-2 w-60 my-2")}>
      <FormControl>
        <Switch checked={value} onCheckedChange={onChange} {...rest}/>
      </FormControl>
      <Label htmlFor="active">{value ? activeLabel || 'ເປິດໃຊ້ງານຢູ່' : inactiveLabel || 'ປິດການໃຊ້ງານ'}</Label>
    </div>
  );
});

SwitchButton.displayName = "SwitchButton";