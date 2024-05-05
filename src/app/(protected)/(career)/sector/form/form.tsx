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
  const sectorName = type === "LOTTERY" ? "ເມືອງ" : "ຫ້ອງການ";
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
              <BranchSection form={form} branch={branch} sectorName={sectorName}/>
              <Type form={form} type={type}/>
            </div>
          </Form>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

const BranchSection = ({ form, branch, sectorName }: { form: IFormConfig, branch: any, sectorName: string }) => (
  <div className="inline-flex flex-row items-center justify-start gap-x-4">
    <Form.Field {...form} name="branchId" label={sectorName}>
      <Form.Combobox {...branch} />
    </Form.Field>
  </div>
);

const Type = ({ form, type }: { form: IFormConfig, type: string }) => {
  const filteredTypeList = getTypeOptions(type);
  return (
    <div className="inline-flex flex-row items-center justify-start gap-x-4">
      <Form.Field {...form} name="type" label="ປະເພດ">
        <Form.Combobox {...(filteredTypeList as any)} />
      </Form.Field>
    </div>
  );
};

const getTypeOptions = (type: string) => {
  switch (type) {
    case "LOTTERY":
      return { options: [{ label: "ໜ່ວຍບໍລິການ", value: "Unit" }] };
    case "OFFICE":
      return { options: typeList.options.filter((option) => option.value !== "LOTTERY") };
    default:
      return typeList;
  }
};

const typeList = {
  options: [
    { label: "ຂະແໜງ", value: "Sector" },
    { label: "ຫ້ອງ", value: "Department" },
    { label: "ໜ່ວຍບໍລິການ", value: "Unit" },
    { label: "ບໍ່ລະບຸ", value: "Not specified" },
    { label: "ລວມ", value: "ALL" },
  ],
};

