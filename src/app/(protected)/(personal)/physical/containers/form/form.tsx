import React from "react";
import { Form } from "@src/shadcn/components/form";
import { usePhysicalForm } from "./usePhysicalForm";
import { type IFormConfig } from "@src/common/interface";
import { Input } from "@src/shadcn/elements";

export const PhysicalProfile: React.FC = () => {
  const { form, state } = usePhysicalForm();
  const isCompleted = state.physicalProfileId;
  return (
    <div className="rounded-full w-72 sm:w-[710px] ">
      {isCompleted
        ? (<p className="italic">ສຳເລັດແລ້ວ !</p>)
        : (<Form {...form}>
          <FormFieldContainer form={form}/>
        </Form>) }
    </div>
  );
};

export const FormFieldContainer: React.FC<{ form: IFormConfig } > = ({ form }) => {
  return (
    <div className="flex flex-wrap gap-2 gap-x-5">
      <HeightInput form={form} />
      <WeightInput form={form} />
      <NationalityInput form={form} />
    </div>
  );
};

const HeightInput: React.FC<{ form: IFormConfig }> = ({ form }) => {
  return (
    <div className="w-full lg:w-80 ">
      <div className="relative w-full mb-3">
        <div className="flex gap-2">
          <div className="w-full">
            <Form.Field {...form} name={"height"} label={"ລວງສູງ"} require={false}>
              <Input className="w-full" placeholder="160" numericOnly/>
            </Form.Field>
          </div>
          <div className="w-2 pt-7 ">cm</div>
        </div>
      </div>
    </div>
  );
};

const NationalityInput: React.FC<{ form: IFormConfig }> = ({ form }) => {
  return (
    <div className="w-full lg:w-80 ">
      <div className="relative w-full mb-3">
        <div className="flex gap-2">
          <div className="w-full">
            <Form.Field {...form} name={"nationality"} label={"ສັນຊາດ"}>
              <Input className="w-full" placeholder="ລາວ" />
            </Form.Field>
          </div>
          <div className="w-2 pt-7 " />
        </div>
      </div>
    </div>
  );
};

const WeightInput: React.FC<{ form: IFormConfig }> = ({ form }) => {
  return (
    <div className="w-full lg:w-80 ">
      <div className="relative w-full mb-3">
        <div className="flex gap-2">
          <div className="w-full">
            <Form.Field {...form} name={"weight"} label={"ນໍ້າຫນັກ"} require={false}>
              <Input className="w-full" placeholder="" numericOnly />
            </Form.Field>
          </div>
          <div className="w-2 pt-7 ">kg</div>
        </div>
      </div>
    </div>
  );
};
