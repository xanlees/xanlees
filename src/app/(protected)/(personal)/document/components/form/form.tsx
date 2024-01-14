import { type RedirectAction } from '@refinedev/core';
import { Form } from '@src/shadcn/components/form';
import { ArrayField } from '@src/shadcn/components/form/array-field';
import { DynamicForm } from "@src/shadcn/components/form/dynamtic-form";
import { Input } from '@src/shadcn/elements';
import React from 'react';
import { useFieldArray } from 'react-hook-form';

import { useProfileContext } from '../../../context/context';
import { useFormConfig } from './config';

interface DocumentFormProps {
  redirect: RedirectAction
}
export const DocumentForm: React.FC<DocumentFormProps> = ({ redirect }) => {
  const formConfig = useFormConfig(redirect);
  const { fields, append } = useFieldArray({ control: formConfig.form.control, name: "document" });
  const { state } = useProfileContext();

  return (
    <div className="w-[32%] rounded-lg">
      <Form {...formConfig.form}>
        <DynamicForm
          form={formConfig.form}
          fields={fields}
          append={append}
          name="document"
          label="ເອກສານ"
          defaultConfig={{ profileId: state.profileId }}
        >
          <ArrayField {...formConfig.form} name="documentName" label="ຊື່ເອກກະສານ">
            <Input placeholder="ຊື່ເອກສານ" className="w-64" />
          </ArrayField>
          <ArrayField {...formConfig.form} name="documentFile" label="ເອກກະສານ">
            <Form.FileInput />
          </ArrayField>
        </DynamicForm>
      </Form>
    </div>
  );
};
