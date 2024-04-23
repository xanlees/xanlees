import React, { useEffect } from "react";
import { Input } from "@src/shadcn/elements";
import { Form } from "@src/shadcn/components/form";
import RenderFile from "./RenderFile";
import { useFieldArray } from "react-hook-form";
import { useFormConfig } from "./config";
import DocumentDynamicForm from "./fields/DynamicForm";
import { type IFormConfig } from "@src/common/interface";

export const DocumentForm: React.FC<{ label?: string }> = ({ label }) => {
  const { form, state } = useFormConfig();
  return (
    <div className="rounded-full w-72 sm:w-[710px] ">
      <Form {...form} cardClassName="w-full flex flex-col">
        <FormFieldContainer form={form} />
        <div className="h-4 border-b"> </div>
        <Form.Field
          {...form}
          name="documentList"
          label={label ?? "ລາຍການເອກະສານ (ກະລຸນາກົດເພີ່ມເອກະສານກ່ອນບັນທືກ)"}
        >
          <></>
        </Form.Field>
        {fields.length > 0 ? (
          fields.map((field, index) => (
            <RenderFile
              key={field.id}
              field={field}
              removeField={() => {
                remove(index);
              }}
            />
          ))
        ) : (
          <p className="mx-2 text-xs italic">ບໍ່ມີເອກະສານເທື່ອ</p>
        )}
        {shouldShowDynamicForm && (
          <div className="bottom-7">
            <DocumentDynamicForm
              form={form}
              fields={fields}
              append={append}
              fileName={fileName}
              file={fileInput}
            />
          </div>
        )}
      </Form>
      )
    </div>
  );
};
