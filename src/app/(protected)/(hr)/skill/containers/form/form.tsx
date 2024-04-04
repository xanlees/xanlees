/* eslint-disable max-lines-per-function */
import React, { useEffect, useState } from "react";
import { Form } from "@src/shadcn/components/form";
import { useFormConfig } from "./config";
import { useFieldArray } from "react-hook-form";
import { DynamicForm } from "@src/shadcn/components/form/dynamtic-form";
import { ArrayField } from "@src/shadcn/components/form/array-field";
import { useApplicationContext } from "../../../application/context";

export const Skill: React.FC = () => {
  const { state } = useApplicationContext();
  const formConfig = useFormConfig();
  const { fields, append, remove } = useFieldArray({ control: formConfig.form.control, name: "skill" });

  const isCompleted = state.applicationId;
  console.log("state", formConfig.form.watch());
  console.log("state.applicationId", state.applicationId);
  return (
    <>  {isCompleted
      ? (<p className="italic">ສຳເລັດແລ້ວ !</p>)
      : (
        <div className="mx-20 rounded-full">
          <Form {...formConfig.form}>
            <div className="w-[620px] 4000">
              <DynamicForm
                form={formConfig.form} fields={fields} append={append} remove={remove} name="skill" className="flex " label=""
                classNameButton="w-full mt-5"
                defaultConfig={{ applicationId: state.applicationId }}>
                <ArrayField {...formConfig.form} name="name" label="ຊື່">
                  <Form.Select options={Options}/>
                </ArrayField>
                <ArrayField {...formConfig.form} name="proficiency" label="ທັກສາ">
                  <Form.Select options={Options}/>
                </ArrayField>
              </DynamicForm>
            </div>
          </Form>
        </div>)}
    </>
  );
};

export const Options = [
  {
    label: "Good",
    value: "Good",
  },
  {
    label: "Fair",
    value: "Fair",
  },
  {
    label: "Poor",
    value: "Poor",
  },
];
