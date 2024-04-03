import React from "react";
import { Form } from "@src/shadcn/components/form";
import { type IFormConfig } from "../../interface";
import { Input } from "@src/shadcn/elements";
import { cn } from "@src/lib/utils";

interface InputBaseProps extends IFormConfig {
  name: string
  label?: string
  className?: string
  placeholder?: string
  type?: string
  defaultValue?: string
  require?: boolean
}

export const InputBase: React.FC<InputBaseProps> = (props) => {
  return (
    <Form.Field {...props} name={props.name} label={props.label} require={props.require}>
      <Input
        className={cn(props.className)}
        placeholder={props.placeholder}
        type={props.type}
        defaultValue={props.defaultValue}
      />
    </Form.Field>
  );
};
