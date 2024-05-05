import { useProvinceSelect } from "@personal";
import { type IFormConfig } from "@src/common/interface";
import { Form } from "@src/shadcn/components/form";
import { Input } from "@src/shadcn/elements";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@src/shadcn/elements/accordion";

import { PositionForm } from "../../../position/form";
import { SectorForm } from "../../../sector/component";
import { useFormBranch } from "../../hook/useProvince";
import { getTypeOptions } from "../../lib";

export const BranchCreateForm: React.FC<{ type: string }> = ({ type }) => {
  return (
    <div className="p-10 my-3 rounded-full ">
      {type !== "LOTTERY" && <PositionForm type={type}/>}
      <SectorForm type={type} />
      <BranchForm type={type} />
    </div>
  );
};

const BranchForm: React.FC<{ type: string }> = ({ type }) => {
  return (
    <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
      <AccordionItem value="item-1">
        <AccordionTrigger className="italic text-blue-500 underline" >
          *ຊອກຫ້ອງການບໍ່ເຫັນ, ກົດທີ່ນີ້
        </AccordionTrigger>
        <AccordionContent>
          <FormContainer type={type} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

const FormContainer: React.FC<{ type: string }> = ({ type }) => {
  const branchName = type === "LOTTERY" ? "ເມືອງ" : "ຊື່";
  const title = type === "LOTTERY" ? "ຟອມສ້າງສາຂາຫວຍ" : "ຟອມສ້າງຫ້ອງການ";
  const { form } = useFormBranch(type);
  const province = useProvinceSelect();
  const filteredTypeList = getTypeOptions(type);
  return (
    <Form {...form}>
      <div className="text-2xl font-bold tracking-wide text-center text-gray-800 dark:text-white">
        {title}
      </div>
      <div className="flex flex-wrap gap-2">
        <div className="w-full lg:w-64 ">
          <div className="relative w-full mb-3">
            <Form.Field {...form} name="name" label={branchName}>
              <Input placeholder="" className="w-full" />
            </Form.Field>
          </div>
        </div>
        <div className="w-full lg:w-64 ">
          <div className="relative w-full mb-3">
            <Form.Field {...form} name="type" label="ປະເພດຫ້ອງການ">
              <Form.Combobox {...(filteredTypeList as any)} />
            </Form.Field>
          </div>
        </div>
      </div>
      <Province form={form} province={province}/>
    </Form>
  );
};
export const Province: React.FC<{ form: IFormConfig, province: any }> = ({ form, province }) => {
  return (
    <div className="flex flex-wrap gap-2">
      <div className="w-full lg:w-64  ">
        <div className="relative w-full mb-3">
          <Form.Field {...form} name={"province"} label={"ແຂວງ"} require={false} >
            <Form.Combobox {...(province)} className="w-full lg:w-64 " />
          </Form.Field>
        </div>
      </div>
    </div>
  );
};

