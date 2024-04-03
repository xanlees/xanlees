import { Form } from "@src/shadcn/components/form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@src/shadcn/elements/accordion";
import { Input } from "@src/shadcn/elements";
import { useFormBranchConfig } from "./config";

export const FormBranch: React.FC<{ type: string }> = (type) => {
  const formConfig = useFormBranchConfig(type.type);
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="italic text-blue-500 underline">
          *ຊອກສາຂາບໍ່ເຫັນ, ກົດທີ່ນີ້
        </AccordionTrigger>
        <AccordionContent>
          <Form {...formConfig.form}>
            <div className="w-full">
              <Form.Field {...formConfig.form} name="name" label="ສາຂາ">
                <Input placeholder="ສາຂາ" className="block w-full" />
              </Form.Field>
            </div>
          </Form>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
