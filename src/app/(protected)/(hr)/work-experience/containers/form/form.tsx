import React from "react";
import { ArrayField } from "@src/shadcn/components/form/array-field";
import { DynamicForm } from "@src/shadcn/components/form/dynamtic-form";
import { Form } from "@src/shadcn/components/form";
import { Input, Textarea } from "@src/shadcn/elements";
import { useApplicationContext } from "../../../application/context";
import { useFieldArray } from "react-hook-form";
import { useFormConfig } from "./config";
/* eslint-disable max-lines-per-function */

export const WorkExperienceForm: React.FC = () => {
  const { state } = useApplicationContext();
  const formConfig = useFormConfig();
  const { fields, append, remove } = useFieldArray({ control: formConfig.form.control, name: "experience" });
  const isCompleted = formConfig.state.workExperienceId;
  return (
    <>
      <div className="mx-20 rounded-full">
        {!isCompleted
          ? (
            <Form {...formConfig.form}>
              <div className="w-[600px]">
                <DynamicForm
                  form={formConfig.form} fields={fields} append={append} remove={remove} name="experience" className="flex flex-wrap" label="ປະສົບການເຮັດວຽກ"
                  classNameButton="w-full mr-7"
                  defaultConfig={{ applicationId: state?.applicationId }}>
                  <ArrayField {...formConfig.form} name="company" label="ບໍລິສັດ">
                    <Input placeholder="Bestech" className="block w-72" />
                  </ArrayField>
                  <ArrayField {...formConfig.form} name="position" label="ຕໍາແໜງ">
                    <Input placeholder="ການຕະຫຼາດ" className="block  w-72" />
                  </ArrayField>
                  <ArrayField {...formConfig.form} name="time" label="ໄລຍະເວລາ">
                    <Input placeholder="1 ປີ" className="block w-72" />
                  </ArrayField>
                  <ArrayField {...formConfig.form} name="salary" label="ເງິນເດືອນ">
                    <Input placeholder="2,000,000" className="block w-72" type="currency"/>
                  </ArrayField>
                  <ArrayField {...formConfig.form} name="reasonOfResignation" label="ເຫດຜົນທີ່ລາອອກ">
                    <Textarea {...formConfig.form} className="w-[580px] h-32" placeholder="ຢາກຊອກປະສົບການໃໝ່ໆ"/>
                  </ArrayField>
                </DynamicForm>
              </div>
            </Form>)
          : (
            <p className="italic">ສຳເລັດແລ້ວ !</p>)}
      </div>
    </>
  );
};
