import { Form } from "@src/shadcn/components/form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@src/shadcn/elements/accordion";
import { useFormConfig } from "./config";
import { type RedirectAction } from "@refinedev/core";
import { Input } from "@src/shadcn/elements";

interface IGraduationFormProps {
  redirect: RedirectAction
}

interface IFormConfig {
  form: {
    setValue: any
  }
}
export const FormGraduation: React.FC<IGraduationFormProps> = ({
  redirect,
}) => {
  const formConfig = useFormConfig(redirect);
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="italic text-blue-500 underline">*ຊອກສາຂາຮຽນທີ່ຕົນຮຽນບໍ່ເຫັນ, ກົດທີ່ນີ້</AccordionTrigger>
        <AccordionContent>
          <Form {...formConfig.form}>
            <div className="w-full sm:flex gap-x-2">
              <InputBase {...formConfig} name="degree" label="Degree" />
              <InputBase {...formConfig} name="sector" label="Sector" />
            </div>
          </Form>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

interface InputProps extends IFormConfig {
  name: string
  label: string
}

const InputBase: React.FC<InputProps> = (props) => (
  <div className="w-full">
    <Form.Field {...props} name={props.name} label={props.label}>
      <Input placeholder={props.label} className="w-full" />
    </Form.Field>
  </div>
);
