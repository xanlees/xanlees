import { Form } from "@src/shadcn/components/form";
import { Input } from "@src/shadcn/elements";
import { useFormConfig } from "./config";
import { type IFormConfig } from "@src/common/interface";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@src/shadcn/elements/accordion";
import { useBranchSelect } from "../useSelect";

export const FormSector: any = ({ branchType, type }: { branchType: string, type: string }) => {
  const sectorType = type === "LOTTERY" ? "ໜ່ວຍ" : "ຊື່";
  const { form } = useFormConfig();
  const branch = useBranchSelect(type);
  return (
    <Accordion type="single" collapsible className="w-ful">
      <AccordionItem value="item-1" className="border-none">
        <AccordionTrigger className="italic text-blue-500 underline">
          *ຊອກຳພະແນກ/ໜ່ວຍບໍ່ເຫັນ, ກົດທີ່ນີ້
        </AccordionTrigger>
        <AccordionContent>
          <Form {...form}>
            <Form.Field {...form} name="name" label={sectorType}>
              <Input placeholder="" className="block w-full" />
            </Form.Field>
            <div className=" flex gap-x-5">
              <BranchSection form={form} branch={branch} />
              <Type form={form} />
            </div>
          </Form>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

const BranchSection = ({ form, branch }: { form: IFormConfig, branch: any }) => (
  <div className="inline-flex flex-row items-center justify-start gap-x-4">
    <Form.Field {...form} name="branchId" label="ຊື່ຫ້ອງການ">
      <Form.Combobox {...branch} />
    </Form.Field>
  </div>
);

const Type = ({ form }: { form: IFormConfig }) => (
  <div className="inline-flex flex-row items-center justify-start gap-x-4">
    <Form.Field {...form} name="type" label="ປະເພດ">
      <Form.Combobox {...(typeList as any)} />
    </Form.Field>
  </div>
);

const typeList = {
  options: [
    {
      label: "ຂະແໜງ",
      value: "Sector",
    },
    {
      label: "ຫ້ອງ",
      value: "Department",
    },
    {
      label: "ໜ່ວຍບໍລິການ",
      value: "Unit",
    },
    {
      label: "ບໍ່ລະບຸ",
      value: "Not specified",
    },
    {
      label: "ລວມ",
      value: "ALL",
    },
  ],
};
