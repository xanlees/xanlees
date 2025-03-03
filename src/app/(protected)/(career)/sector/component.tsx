import React, { type ReactNode } from "react";

import { type IFormConfig } from "@src/common/interface";
import { Form } from "@src/shadcn/components/form";
import { Input } from "@src/shadcn/elements";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@src/shadcn/elements/accordion";

import { useSectorForm } from "./hook";
import { useBranchSelect } from "./useSelect";

export const SectorForm: React.FC<{ type: string }> = ({ type }) => {
  return (
    <>
      {type === "LOTTERY" && <FormContainer type={type}/>}
      {type !== "LOTTERY" && (
        <AccordionSectorForm>
          <FormContainer type={type}/>
        </AccordionSectorForm>
      )}
    </>
  );
};

export const FormContainer: React.FC<{ type: string, id?: number }> = ({ type = "OFFICE", id }) => {
  const sectorType = type === "LOTTERY" ? "ໜ່ວຍ" : "ຊື່";
  const sectorName = type === "LOTTERY" ? "ເມືອງ" : "ສັງກັດຫ້ອງການ";
  const title = type === "LOTTERY" ? "ຟອມໜ່ວຍ" : "ຟອມພະແນກ/ຂະແໜງ";
  const { form } = useSectorForm({ type, id });
  const branch = useBranchSelect({ type });
  return (
    <Form {...form}>
      <div className="text-2xl font-bold tracking-wide text-center text-gray-800 dark:text-white">
        {title}
      </div>
      <Form.Field {...form} name="name" label={sectorType}>
        <Input placeholder="" className="block w-full" />
      </Form.Field>
      <div className=" flex gap-x-5">
        <BranchSelect form={{ form }} branch={branch} sectorName={sectorName}/>
        <Type form={{ form }} type={type}/>
      </div>
    </Form>
  );
};

export const AccordionSectorForm: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Accordion type="single" collapsible className="w-ful">
      <AccordionItem value="item-1" className="border-none">
        <AccordionTrigger className="italic text-blue-500 underline">
          *ຊອກຳພະແນກ/ໜ່ວຍບໍ່ເຫັນ, ກົດທີ່ນີ້
        </AccordionTrigger>
        <AccordionContent>
          {children}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

const BranchSelect = ({ form, branch, sectorName }: { form: IFormConfig, branch: any, sectorName: string }) => (
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
      return { options: [{ label: "ໜ່ວຍ", value: "Unit" }] };
    case "OFFICE":
      return { options: typeList.options.filter((option) => option.value !== "LOTTERY") };
    default:
      return typeList;
  }
};
const typeList = {
  options: [
    { label: "ຂະແໜງ", value: "Sector" },
    { label: "ພະແນກ", value: "Department" },
    { label: "ໜ່ວຍ", value: "Unit" },
  ],
};
