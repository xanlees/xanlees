import React from "react";
import { Form } from "@src/shadcn/components/form";
import { useFormConfig } from "./config";
import { Input, Textarea } from "@src/shadcn/elements";
import { useFieldArray } from "react-hook-form";
import { DynamicForm } from "@src/shadcn/components/form/dynamtic-form";
import { ArrayField } from "@src/shadcn/components/form/array-field";
import { useProfileContext } from "@src/app/(protected)/(personal)/context";
interface WorkExperienceFormProps {
  setCurrentStep?: (step: number) => void
}

export const WorkExperienceForm: React.FC<WorkExperienceFormProps> = ({ setCurrentStep }) => {
  const formConfig = useFormConfig({ setCurrentStep });
  const { fields, append, remove } = useFieldArray({ control: formConfig.form.control, name: "work_experience" });
  const { state } = useProfileContext();
  return (
    <div className="rounded-full w-96 sm:w-[33%] ">
      <Form {...formConfig.form}>
        <DynamicForm
          form={formConfig.form} fields={fields} append={append} remove={remove} name="work_experience" className="flex flex-wrap" label="ປະສົບການເຮັດວຽກ" classNameButton="hidden"
          defaultConfig={{ applicationId: state.applicationId }}>
          <ArrayField {...formConfig.form} name="company" label="ບໍລິສັດ">
            <Input placeholder="ບໍລິສັດ" className="block w-56" />
          </ArrayField>
          <ArrayField {...formConfig.form} name="position" label="ຕໍາແໜງ">
            <Input placeholder="ຕໍາແໜງ" className="block w-56" />
          </ArrayField>
          <ArrayField {...formConfig.form} name="time" label="ເວລາ">
            <Input placeholder="ເວລາ" className="block w-56" />
          </ArrayField>
          <ArrayField {...formConfig.form} name="salary" label="ເງິນເດືອນ">
            <Input placeholder="ເວລາ" className="block w-56" />
          </ArrayField>
          <ArrayField {...formConfig.form} name="reasonOfResignation" label="ເຫດຜົນທີ່ລາອອກ">
            <Textarea {...formConfig.form} className="w-96 h-28 sm:w-[450px]" />
          </ArrayField>
        </DynamicForm>
      </Form>
    </div>
  );
};
