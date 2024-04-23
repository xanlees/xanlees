import { Form } from "@src/shadcn/components/form";
import { useSelect } from "@refinedev/core";
import { Input } from "@src/shadcn/elements";
import { useFormConfig } from "./config";
import { type IFormConfig } from "@src/common/interface";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@src/shadcn/elements/accordion";
import { type IBranch } from "../interface";

export const FormSector: any = ({ branchType }: { branchType: string }) => {
  const { form } = useFormConfig();
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
          *ຊອກພະແນກບໍ່ເຫັນ, ກົດທີ່ນີ້
        </AccordionTrigger>
        <AccordionContent>
          <Form {...form}>
            <Form.Field {...form} name="name" label="ພະແນກ">
              <Input placeholder="" className="block w-full" />
            </Form.Field>
            <div className=" flex gap-x-5">
              <BranchSection form={form} branch={branch} />
              <Type form={form} branch={branch} />
            </div>
          </Form>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

const BranchSection = ({ form, branch }: { form: IFormConfig, branch: any }) => (
  <div className="inline-flex flex-row items-center justify-start gap-x-4">
    <Form.Field {...form} name="branchId" label="ເລືອກທີຕັ້ງຫ້ອງການ">
      <Form.Combobox {...branch} />
    </Form.Field>
  </div>
);

const Type = ({ form, branch }: { form: IFormConfig, branch: any }) => (
  <div className="inline-flex flex-row items-center justify-start gap-x-4">
    <Form.Field {...form} name="branchId" label="ເລືອກທີຕັ້ງຫ້ອງການ">
      <Form.Combobox {...branch} />
    </Form.Field>
  </div>
);
