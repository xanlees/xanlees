import { Form } from "@src/shadcn/components/form";
import { useSelect } from "@refinedev/core";
import { Input } from "@src/shadcn/elements";
import { useFormConfig } from "./config";
import { type IBranch } from "../interface";
import { type IFormConfig } from "@src/common/interface";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@src/shadcn/elements/accordion";

export const FormSector: any = ({ branchType }: { branchType: string }) => {
  const formConfig = useFormConfig();
  const branch = useSelect<IBranch>({
    resource: "branch",
    optionLabel: "name",
    optionValue: "id",
    filters: [{ field: "type", operator: "eq", value: branchType }, { field: "pageSize", operator: "eq", value: 50 }],
  });
  return (
    <Accordion type="single" collapsible className="w-ful">
      <AccordionItem value="item-1" className="border-none">
        <AccordionTrigger className="italic text-blue-500 underline">
          *ຊອກຂະແໜງບໍ່ເຫັນ, ກົດທີ່ນີ້
        </AccordionTrigger>
        <AccordionContent>
          <Form {...formConfig.form}>
            <Form.Field {...formConfig.form} name="name" label="ຂະແໜງ">
              <Input placeholder="ຂະແໜງ" className="block w-full" />
            </Form.Field>
            <BranchSection formConfig={formConfig} branch={branch} />
          </Form>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

const BranchSection = ({
  formConfig,
  branch,
}: {
  formConfig: IFormConfig
  branch: any
}) => (
  <div className="inline-flex flex-row items-center justify-start gap-x-4">
    <Form.Field {...formConfig.form} name="branchId" label="ເລືອກສາຂາ">
      <Form.Combobox {...branch} />
    </Form.Field>
  </div>
);
