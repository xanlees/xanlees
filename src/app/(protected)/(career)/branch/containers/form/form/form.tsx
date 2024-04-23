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
  const { form } = useFormBranchConfig(type.type);
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="italic text-blue-500 underline" >
          *ຊອກຫ້ອງການບໍ່ເຫັນ, ກົດທີ່ນີ້
        </AccordionTrigger>
        <AccordionContent>
          <Form {...form}>
            <div className="flex flex-wrap gap-2">
              <div className="w-full lg:w-64 ">
                <div className="relative w-full mb-3">
                  <Form.Field {...form} name="name" label="ທີຕັ້ງຫ້ອງການຢູ່ແຂວງ">
                    <Input placeholder="ນະຄວນຫຼວງ" className="w-full" />
                  </Form.Field>
                </div>
              </div>
              <div className="w-full lg:w-64 ">
                <div className="relative w-full mb-3">
                  <Form.Field {...form} name="type" label="ປະເພດຫ້ອງການ">
                    <Form.Combobox {...(typeList as any)} />
                  </Form.Field>
                </div>
              </div>
            </div>
          </Form>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

const typeList = {
  options: [
    {
      label: "ສາຂາ",
      value: "BRANCH",
    },
    {
      label: "ສໍານັກງານໃຫຍ່",
      value: "HEADQUARTERS",
    },
    {
      label: "ຫ້ອງການ",
      value: "OFFICE",
    },
    {
      label: "ສາຂາຫວຍ",
      value: "LOTTERY",
    },
  ],
};
