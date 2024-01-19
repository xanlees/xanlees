import { Form } from "@src/shadcn/components/form";
import { ArrayField } from "@src/shadcn/components/form/array-field";
import { DynamicForm } from "@src/shadcn/components/form/dynamtic-form";
import { Input } from "@src/shadcn/elements";
import React from "react";
import { useFieldArray } from "react-hook-form";

import { useProfileContext } from "../../../context/context";
import { useFormConfig } from "./config";

interface DocumentFormProps {
  setCurrentStep?: (step: number) => void
}
export const DocumentForm: React.FC<DocumentFormProps> = ({ setCurrentStep }) => {
  const formConfig = useFormConfig({ setCurrentStep });
  const { fields, append, remove } = useFieldArray({ control: formConfig.form.control, name: "document" });
  const { state } = useProfileContext();
  return (
    <div className="w-[32%] rounded-lg">
      <Form {...formConfig.form}>
        <DynamicForm
          form={formConfig.form}
          fields={fields}
          append={append}
          remove={remove}
          name="document"
          label="ເອກສານ"
          className="grid"
          classNameButton="mt-1"
          defaultConfig={{ profileId: state.profileId }}
        >
          <ArrayField {...formConfig.form} name="documentName" label="ຊື່ເອກກະສານ">
            <Input placeholder="ຊື່ເອກສານ" className="flex w-full" />
          </ArrayField>
          <ArrayField {...formConfig.form} name="documentFile" label="ເອກກະສານ">
            <Form.FileInput />
          </ArrayField>
        </DynamicForm>
      </Form>
    </div>
  );
};
