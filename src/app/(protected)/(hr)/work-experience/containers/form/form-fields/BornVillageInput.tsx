import React from "react";
import { Input } from "@src/shadcn/elements";
import { Form } from "@src/shadcn/components/form";
import { type IFormConfig } from "@src/common/interface";

interface InputBornVillageProps extends IFormConfig {
  name: string
  label: string
}

export const InputBornVillage: React.FC<InputBornVillageProps> = (props) => (
  <Form.Field {...props} name={props.name} label={props.label}>
    <Input placeholder={props.label} />
  </Form.Field>
);
