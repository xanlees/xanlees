/* eslint-disable max-lines-per-function */
import { useProvinceSelect } from "@personal";
import { Form } from "@src/shadcn/components/form";
import { Input } from "@src/shadcn/elements";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@src/shadcn/elements/accordion";

import { PositionForm } from "../../../position/form";
import { SectorForm } from "../../../sector/component";
import { useBranchForm } from "../../hook/useBranchForm";
import { getTypeOptions } from "../../lib";
import { LeaveQuota, MapInput, ProvinceField } from "./formField";

export const BranchCreateForm: React.FC<{ type: string, hideButton: boolean }> = ({ type, hideButton }) => {
  return (
    <div className="p-10 my-3 rounded-full ">
      {type !== "LOTTERY" && <PositionForm type={type} />}
      {type !== "LOTTERY" && <BranchForm type={type} hideButton={hideButton} />}
      <SectorForm type={type} />
    </div>
  );
};

const BranchForm: React.FC<{ type: string, hideButton: boolean }> = ({ type, hideButton }) => {
  const title = type === "LOTTERY" ? "ຊອກສາຂາບໍ່ເຫັນ" : "ຊອກຫ້ອງການບໍ່ເຫັນ";
  return (
    <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
      <AccordionItem value="item-1">
        <AccordionTrigger className="italic text-blue-500 underline" >
          *{title}, ສາມາດກົດທີ່ນີ້ເພື່ອສ້າງເພີ່ມ
        </AccordionTrigger>
        <AccordionContent>
          <FormBranchContainer type={type} hideButton={hideButton} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export const FormBranchContainer: React.FC<{ type: string, id?: number, hideButton: boolean }> = ({ type, id, hideButton }) => {
  const branchName = type === "LOTTERY" ? "ເມືອງ" : "ຊື່";
  const title = type === "LOTTERY" ? "ຟອມສາຂາ" : "ຟອມຫ້ອງການ";
  const { form } = useBranchForm({ type, id });
  const province = useProvinceSelect();
  const filteredTypeList = getTypeOptions(type);
  return (
    <Form {...form} >
      <div className="text-2xl font-bold tracking-wide text-center text-gray-800 dark:text-white">
        {title}
      </div>
      <div className="relative w-full mb-3">
        <Form.Field {...form} name="name" label={branchName}>
          <Input placeholder="" className="w-full" />
        </Form.Field>
      </div>
      <div className="flex flex-wrap gap-2">
        <div className="w-full lg:w-64 ">
          <ProvinceField form={{ form }} province={province}/>
        </div>
        <div className="w-full lg:w-64 ">
          <div className="relative w-full mb-3">
            <Form.Field {...form} name="type" label="ປະເພດຫ້ອງການ">
              <Form.Combobox {...(filteredTypeList as any)} />
            </Form.Field>
          </div>
        </div>
      </div>
      <LeaveQuota/>
      <MapInput />
    </Form>
  );
};
