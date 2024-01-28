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
}

export const InputBase: React.FC<InputBaseProps> = (props) => (
  <Form.Field {...props} name={props.name} label={props.label}>
    <Input className={cn(props.className)} placeholder={props.placeholder} type={props.type} />
  </Form.Field>
);
