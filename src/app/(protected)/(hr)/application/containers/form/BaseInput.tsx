import React from "react";
import { Input } from "@src/shadcn/elements";
import { Form } from "@src/shadcn/components/form";
import { type IFormConfig } from "@src/common/interface";

interface BaseInputProps extends IFormConfig {
  name: string
  label: string
}

export const BaseInput: React.FC<BaseInputProps> = (props) => (
  <div className="w-full">
    <Form.Field {...props} name={props.name} label={props.label}>
      <Input placeholder={props.label} className="w-64" />
    </Form.Field>
  </div>
);
