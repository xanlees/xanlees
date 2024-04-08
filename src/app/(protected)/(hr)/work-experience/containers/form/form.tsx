import React from "react";
import { ArrayField } from "@src/shadcn/components/form/array-field";
import { DynamicForm } from "@src/shadcn/components/form/dynamtic-form";
import { Form } from "@src/shadcn/components/form";
import { Input, Textarea } from "@src/shadcn/elements";
import { useApplicationContext } from "../../../application/context";
import { useFieldArray } from "react-hook-form";
import { useFormConfig } from "./config";

export const WorkExperienceForm: React.FC = () => {
  const { state } = useApplicationContext();
  const { form } = useFormConfig();
  const { fields, append, remove } = useFieldArray({ control: form.control, name: "experience" });
  const isCompleted = state.workExperienceId;
  return (
    <>
      {isCompleted
        ? (<p className="italic">ສຳເລັດແລ້ວ !</p>)
        : (
          <Form {...form}>
            <div className="rounded-full w-60 sm:w-[600px] ">
              <DynamicForm form={form} fields={fields} append={append} remove={remove} name="experience" className="flex flex-col sm:flex-row sm:flex-wrap" label="ປະສົບການເຮັດວຽກ" classNameButton="w-full mr-7" defaultConfig={{ applicationId: state?.applicationId }}>
                <ArrayField {...form} name="company" label="ບໍລິສັດ">
                  <Input placeholder="Bestech" className="block w-64" />
                </ArrayField>
                <ArrayField {...form} name="position" label="ຕໍາແໜງ">
                  <Input placeholder="ການຕະຫຼາດ" className="block  w-64" />
                </ArrayField>
                <ArrayField {...form} name="time" label="ໄລຍະເວລາ">
                  <Input placeholder="1 ປີ" className="block w-64" />
                </ArrayField>
                <ArrayField {...form} name="salary" label="ເງິນເດືອນ">
                  <Input placeholder="2,000,000" className="block w-64" type="currency"/>
                </ArrayField>
                <ArrayField {...form} name="reasonOfResignation" label="ວຽກທີເຮັດຜ່ານມາ">
                  <Textarea {...form} className="w-64 sm:w-[580px] h-32" placeholder="ອະທິບາຍໜ້າວຽກທີໄດ້ເຮັດຜ່ານມາ"/>
                </ArrayField>
              </DynamicForm>
            </div>
          </Form>)}
    </>
  );
};
