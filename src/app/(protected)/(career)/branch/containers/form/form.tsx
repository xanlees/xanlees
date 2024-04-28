import { Form } from "@src/shadcn/components/form";
import { FormSector } from "../../../sector/form/form";
import { Input } from "@src/shadcn/elements";
import { PositionForm } from "../../../position/form";
import { useFormBranch } from "../../hook/useProvince";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@src/shadcn/elements/accordion";
import { useProvinceSelect } from "@src/app/(protected)/(personal)/address/hook/useDistrictSelect";
import { type IFormConfig } from "@src/common/interface";

export const BranchCreateForm: React.FC<{ type: string }> = ({ type }) => {
  return (
    <div className="p-10 my-3 rounded-full ">
      <PositionForm type={type}/>
      <FormSector branchType={type} />
      <BranchForm type={type} />
    </div>
  );
};

const BranchForm: React.FC<{ type: string }> = ({ type }) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="italic text-blue-500 underline" >
          *ຊອກຫ້ອງການບໍ່ເຫັນ, ກົດທີ່ນີ້
        </AccordionTrigger>
        <AccordionContent>
          <FormContainer type={type}/>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

const FormContainer: React.FC<{ type: string }> = ({ type }) => {
  const { form } = useFormBranch(type);
  const province = useProvinceSelect();
  return (
    <Form {...form}>
      <div className="flex flex-wrap gap-2">
        <div className="w-full lg:w-64 ">
          <div className="relative w-full mb-3">
            <Form.Field {...form} name="name" label="ຊື້ຫ້ອງການ">
              <Input placeholder="" className="w-full" />
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

const typeList = {
  options: [
    { label: "ສາຂາ", value: "BRANCH" },
    { label: "ສໍານັກງານໃຫຍ່", value: "HEADQUARTERS" },
    { label: "ຫ້ອງການ", value: "OFFICE" },
    { label: "ສາຂາຫວຍ", value: "LOTTERY" },
  ],
};
