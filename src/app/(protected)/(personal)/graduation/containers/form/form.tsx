import { Form } from "@src/shadcn/components/form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@src/shadcn/elements/accordion";
import { useFormConfig } from "./config";
import { Input } from "@src/shadcn/elements";

interface IFormConfig {
  form: {
    setValue: any
  }
}
export const FormGraduation = () => {
  const formConfig = useFormConfig();
  return (
    <Accordion type="single" collapsible className="w-ful">
      <AccordionItem value="item-1" className="border-none">
        <AccordionTrigger className="italic text-blue-500 underline">*ຊອກພາກວິຊາຮຽນທີ່ຕົນຮຽນບໍ່ເຫັນ, ກົດທີ່ນີ້</AccordionTrigger>
        <AccordionContent>
          <Form {...formConfig.form}>
            <div className="w-full sm:flex gap-x-2">
              <InputBase {...formConfig} name="degree" label="ລະດັບການສຶກສາ" />
              <InputBase {...formConfig} name="sector" label="ພາກວິຊາ" />
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
