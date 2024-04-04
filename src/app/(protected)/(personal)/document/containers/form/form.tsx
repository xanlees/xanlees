/* eslint-disable max-lines-per-function */
import React from "react";
import { Input } from "@src/shadcn/elements";
import { Form } from "@src/shadcn/components/form";
import RenderFile from "./RenderFile";
import { useFieldArray } from "react-hook-form";
import { useFormConfig } from "./config";
import DocumentDynamicForm from "./fields/DynamicForm";

export const DocumentForm: React.FC = () => {
  const { form, state } = useFormConfig();
  const { fields, append, remove } = useFieldArray({ control: form.control, name: "document" });
  const fileName: string = form.watch("documentName") as string;
  const fileInput = form.watch("documentFile") as FileList;
  const isComplete = state.isUploaded;
  console.log("form", form.watch());
  return <div className="relative w-[108%] mx-20 rounded-lg">
    {!isComplete
      ? (<Form {...form} cardClassName="w-full flex flex-col">
        <div className="flex flex-row h-10 gap-4">
          <Form.Field {...form} name="documentName" label="ຊື່ເອກສານ" >
            <Input placeholder="ຊື່ເອກສານ" className="flex w-full" />
          </Form.Field>
          <Form.Field {...form} name="documentFile" label="ເລືອກເອກະສານທີ່ຈະເພີ່ມ" >
            <Form.FileInput showFileDisplay={false} />
          </Form.Field>
        </div>
        <div className="h-4 border-b"> </div>
        <Form.Field {...form} name="documentList" label="ລາຍການເອກະສານ (ກະລຸນາກົດເພີ່ມເອກະສານກ່ອນບັນທືກ)" ><></></Form.Field>
        {fields.length > 0
          ? fields.map((field, index) => (
            <RenderFile key={field.id} field={field} removeField={() => { remove(index); }} />
          ))
          : <p className="mx-2 text-xs italic">ບໍ່ມີເອກະສານເທື່ອ</p>}
        <div className="absolute bottom-7 ">
          <DocumentDynamicForm
            form={form} fields={fields}
            append={append} fileName={fileName}
            file={fileInput}
          />
        </div>
      </Form>)
      : (<p className="italic">ສຳເລັດແລ້ວ !</p>)}
  </div>;
};
