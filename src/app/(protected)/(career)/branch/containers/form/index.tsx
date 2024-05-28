import { useProvinceSelect } from "@personal";
import { type IFormConfig } from "@src/common/interface";
import { Form } from "@src/shadcn/components/form";
import { Input } from "@src/shadcn/elements";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@src/shadcn/elements/accordion";

import { PositionForm } from "../../../position/form";
import { SectorForm } from "../../../sector/component";
import { useBranchForm } from "../../hook/useBranchForm";
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
  const title = type === "LOTTERY" ? "ຊອກສາຂາບໍ່ເຫັນ" : "ຊອກຫ້ອງການບໍ່ເຫັນ";
  return (
    <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
      <AccordionItem value="item-1">
        <AccordionTrigger className="italic text-blue-500 underline" >
          *{title}, ກົດທີ່ນີ້
        </AccordionTrigger>
        <AccordionContent>
          <FormBranchContainer type={type} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export const FormBranchContainer: React.FC<{ type: string, id?: number }> = ({ type, id }) => {
  const branchName = type === "LOTTERY" ? "ເມືອງ" : "ຊື່";
  const title = type === "LOTTERY" ? "ຟອມສາຂາ" : "ຟອມຫ້ອງການ";
  const { form } = useBranchForm({ type, id });
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
      <ProvinceField form={form} province={province}/>
    </Form>
  );
};
const ProvinceField: React.FC<{ form: IFormConfig, province: any }> = ({ form, province }) => {
  return (
    <div className="flex flex-wrap gap-2">
      <div className="w-full lg:w-64 ">
        <div className="relative w-full mb-3">
          <Form.Field {...form} name={"province"} label={"ແຂວງ"} require={false} >
            <Form.Combobox {...(province)} className="w-full lg:w-64 " />
          </Form.Field>
        </div>
      </div>
    </div>
  );
};

