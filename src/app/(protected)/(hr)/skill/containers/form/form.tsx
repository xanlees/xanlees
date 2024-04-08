import React from "react";
import { Form } from "@src/shadcn/components/form";
import { useFormConfig } from "./config";
import { useFieldArray } from "react-hook-form";
import { DynamicForm } from "@src/shadcn/components/form/dynamtic-form";
import { ArrayField } from "@src/shadcn/components/form/array-field";
import { useApplicationContext } from "../../../application/context";
import { Input } from "@src/shadcn/elements";

export const Skill: React.FC = () => {
  const { state } = useApplicationContext();
  const formConfig = useFormConfig();
  const { fields, append, remove } = useFieldArray({ control: formConfig.form.control, name: "skill" });
  const isCompleted = state.skillId;
  return (
    <div className=" rounded-full">  {isCompleted
      ? (<p className="italic">ສຳເລັດແລ້ວ !</p>)
      : (
        <Form {...formConfig.form}>
          <div className="rounded-full w-72 sm:w-[600px] ">
            <div className="text-md font-bold tracking-wide text-gray-800 dark:text-white my-2">
            ຄວາມສາມາດພິເສດເຊັ່ນການນໍາໃຊ້ຄອມພິວເຕີ, ພາສາ ແລະ ອື່ນໆ
            </div>
            <DynamicForm
              form={formConfig.form} fields={fields} append={append} remove={remove} name="skill" className="flex flex-col sm:flex-row sm:flex-wrap" label=""
              classNameButton="w-full mt-5"
              defaultConfig={{ application: state.applicationId }}>
              <ArrayField {...formConfig.form} name="name" label="ຄວາມສາມາດ">
                <Input placeholder="" className="block w-72" />
              </ArrayField>
              <ArrayField {...formConfig.form} name="proficiency" label="ທັກສາ">
                <Form.Select options={Options} className=" w-32"/>
              </ArrayField>
            </DynamicForm>
          </div>
        </Form>)}
    </div>
  );
};

export const Options = [
  {
    label: "ດີ",
    value: "Good",
  },
  {
    label: "ປານກາງ",
    value: "Fair",
  },
  {
    label: "ພໍໃຊ້ໄດ້",
    value: "Poor",
  },
];
