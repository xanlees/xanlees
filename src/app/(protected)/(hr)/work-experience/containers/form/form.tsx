/* eslint-disable max-lines-per-function */
import React, { useEffect, useState } from "react";
import { Form } from "@src/shadcn/components/form";
import { useFormConfig } from "./config";
import { Input, Textarea } from "@src/shadcn/elements";
import { useFieldArray } from "react-hook-form";
import { DynamicForm } from "@src/shadcn/components/form/dynamtic-form";
import { ArrayField } from "@src/shadcn/components/form/array-field";
import { useApplicationContext } from "../../../application/context";
interface WorkExperienceFormProps {
  setCurrentStep?: (step: number) => void
}

export const WorkExperienceForm: React.FC<WorkExperienceFormProps> = ({ setCurrentStep }) => {
  const { state } = useApplicationContext();
  const formConfig = useFormConfig({ setCurrentStep });
  const { fields, append, remove } = useFieldArray({ control: formConfig.form.control, name: "work_experience" });
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    if (!isMounted) {
      append({ applicationId: state.applicationId });
      setIsMounted(true);
      remove(1);
    }
  }, [isMounted]);
  return (
    <div className="rounded-full">
      <Form {...formConfig.form}>
        <DynamicForm
          form={formConfig.form} fields={fields} append={append} remove={remove} name="work_experience" className="flex flex-wrap" label="ປະສົບການເຮັດວຽກ"
          classNameButton="w-full mr-7"
          defaultConfig={{ applicationId: state?.applicationId }}>
          <ArrayField {...formConfig.form} name="company" label="ບໍລິສັດ">
            <Input placeholder="Bestech" className="block w-56" />
          </ArrayField>
          <ArrayField {...formConfig.form} name="position" label="ຕໍາແໜງ">
            <Input placeholder="ການຕະຫຼາດ" className="block w-56" />
          </ArrayField>
          <ArrayField {...formConfig.form} name="time" label="ໄລຍະເວລາ">
            <Input placeholder="1 ປີ" className="block w-56" />
          </ArrayField>
          <ArrayField {...formConfig.form} name="salary" label="ເງິນເດືອນ">
            <Input placeholder="2,000,000" className="block w-56" type="currency"/>
          </ArrayField>
          <ArrayField {...formConfig.form} name="reasonOfResignation" label="ເຫດຜົນທີ່ລາອອກ">
            <Textarea {...formConfig.form} className="w-96 h-28 sm:w-[450px]" placeholder="ຢາກຊອກປະສົບການໃໝ່ໆ"/>
          </ArrayField>
        </DynamicForm>
      </Form>
    </div>
  );
};
