/* eslint-disable max-lines-per-function */
import { type RedirectAction } from "@refinedev/core";
import { Form } from "@src/shadcn/components/form";
import { ArrayField } from "@src/shadcn/components/form/array-field";
import { DynamicForm } from "@src/shadcn/components/form/dynamtic-form";
import { Input } from "@src/shadcn/elements";
import React from "react";
import { useFieldArray } from "react-hook-form";
import { useFormConfig } from "./config";
import { useProfileContext } from "../../context/context";

interface DocumentFormProps {
  redirect: RedirectAction;
}
export const DocumentForm: React.FC<DocumentFormProps> = ({ redirect }) => {
  const formConfig = useFormConfig(redirect);
  const { fields, append } = useFieldArray({
    control: formConfig.form.control,
    name: "document",
  });

  return (
    <div className="w-[50%] rounded-lg">
      <Form {...formConfig.form}>
        <DynamicForm
          form={formConfig.form}
          fields={fields}
          append={append}
          name="education"
          label="ເອກສານ"
          defaultConfig={{ profileId: 1 }}
        >
          <ArrayField
            {...formConfig.form}
            name="document_name"
            label="ຊື່ເອກສະສານ"
          >
          </ArrayField>
          <ArrayField
            {...formConfig.form}
            name="document_file"
            label="ຊື່ເອກສະສານ"
          >
            <Form.Field
              {...formConfig.form}
              name="document_file"
              label="ຊື່ເອກສະສານ"
            >
              <Form.FileInput />
            </Form.Field>
          </ArrayField>
        </DynamicForm>
      </Form>
    </div>
  );
};
