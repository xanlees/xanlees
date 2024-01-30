import React from "react";
import { Form } from "@src/shadcn/components/form";
import { IFormConfig } from "../../interface";
import { Input } from "@src/shadcn/elements";
import { cn } from "@src/lib/utils";

interface InputBaseProps extends IFormConfig {
  name: string;
  label?: string;
  className?: string;
  placeholder?: string;
  type?: string;
  defaultValue?: string;
}

export const InputBase: React.FC<InputBaseProps> = (props) => {
  console.log("props", props.defaultValue); 
  return (
    <Form.Field {...props} name={props.name} label={props.label}>
      <Input
        className={cn(props.className)}
        placeholder={props.placeholder}
        type={props.type}
        defaultValue={props.defaultValue}
      />
    </Form.Field>
  );
};
