import React from "react";
import { Form } from "@src/shadcn/components/form";
import { useSkillForm } from "./useSkillForm";
import { useFieldArray } from "react-hook-form";
import { DynamicForm } from "@src/shadcn/components/form/dynamtic-form";
import { ArrayField } from "@src/shadcn/components/form/array-field";
import { useApplicationContext } from "../../../application/context";

export const Skill: React.FC = () => {
  const { state } = useApplicationContext();
  const { form } = useSkillForm();
  const { fields, append, remove } = useFieldArray({ control: form.control, name: "skill" });
  const isCompleted = state.skillId;
  return (
    <div className="rounded-full w-72 sm:w-[710px] ">  {isCompleted
      ? (<p className="italic">ສຳເລັດແລ້ວ !</p>)
      : (
        <Form {...form}>
          <div className="rounded-full w-60 sm:w-[600px] ">
            <DynamicForm
              form={form} fields={fields} append={append} remove={remove} name="skill" className="flex flex-col sm:flex-row sm:flex-wrap" label=""
              classNameButton="w-32 mt-5"
              defaultConfig={{ application: state.applicationId }}>
              <ArrayField {...form} name="name" label="ຄວາມສາມາດ">
                <Form.Select options={SkillOptions} className=" w-56"/>
              </ArrayField>
              <ArrayField {...form} name="proficiency" label="ລະດັບຄວາມສາມາດ">
                <Form.Select options={Options} className=" w-56"/>
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
    label: "ພໍໃຊ້ໄດ້",
    value: "Fair",
  },
  {
    label: "ໜ້ອຍ",
    value: "Poor",
  },
];

export const SkillOptions = [
  {
    label: "ພາສາໄທ",
    value: "ພາສາໄທ",
  },
  {
    label: "ພາສາອັງກິດ",
    value: "ພາສາອັງກິດ",
  },
  {
    label: "ພາສາຈີນ",
    value: "ພາສາຈີນ",
  },
  {
    label: "Word",
    value: "Word",
  },
  {
    label: "Excel",
    value: "Excel",
  },
  {
    label: "Power Point",
    value: "Power Point",
  },
];
