import { Form } from "@src/shadcn/components/form";
import { type IFormConfig } from "../../interface";
import { Input } from "@src/shadcn/elements";

export const UsernameInput = (formConfig: IFormConfig) => (
  <Form.Field {...formConfig.form} name="username" label="Username">
    <Input placeholder="Username" />
  </Form.Field>
);

export const PasswordInput = (formConfig: IFormConfig) => (
  <Form.Field {...formConfig.form} name="password" label="Password">
    <Input type="password" placeholder="Password" />
  </Form.Field>
);

