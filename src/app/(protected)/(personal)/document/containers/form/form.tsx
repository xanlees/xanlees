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
  const { fields, append, remove } = useFieldArray({ control: form.control, name: "document" });
  const fileName: string = form.watch("documentName") as string;
  const fileInput = form.watch("documentFile") as FileList;
  const isComplete = state.isUploaded;
  useEffect(() => {
    form.setValue("documentName", "");
    form.setValue("documentFile", null);
  }, [fields]);
  const shouldShowDynamicForm = form.watch("documentName") !== "" && form.watch("documentFile") !== null;
  return (
    <div className="rounded-full w-72 sm:w-[710px] ">
      {isComplete
        ? (
          <p className="italic">ສຳເລັດແລ້ວ !</p>)
        : (
          <Form {...form} cardClassName="w-full flex flex-col">
            <FormFieldContainer form={form}/>
            <div className="h-4 border-b"> </div>
            <Form.Field {...form} name="documentList" label={ label ?? "ລາຍການເອກະສານ (ກະລຸນາກົດເພີ່ມເອກະສານກ່ອນບັນທືກ)" } ><></></Form.Field>
            {fields.length > 0
              ? fields.map((field, index) => (
                <RenderFile key={field.id} field={field} removeField={() => { remove(index); }} />
              ))
              : <p className="mx-2 text-xs italic">ບໍ່ມີເອກະສານເທື່ອ</p>}
            {shouldShowDynamicForm && (
              <div className="bottom-7">
                <DocumentDynamicForm form={form} fields={fields} append={append} fileName={fileName} file={fileInput} />
              </div>
            )}
          </Form>)}
    </div>

  );
};

export const FormFieldContainer: React.FC<{ form: IFormConfig }> = ({ form }) => {
  return (
    <div className="flex flex-wrap gap-2">
      <div className="w-full lg:w-80 ">
        <div className="relative w-full mb-3">
          <Form.Field {...form} name="documentName" label="ຊື່ເອກສານ" >
            <Input placeholder="ຊື່ເອກສານ" />
          </Form.Field>
        </div>
      </div>
      <div className="w-full lg:w-80 ">
        <div className="relative w-full mb-3">
          <Form.Field {...form} name="documentFile" label="ເລືອກເອກະສານທີ່ຈະເພີ່ມ" >
            <Form.FileInput showFileDisplay={false} />
          </Form.Field>
        </div>
      </div>
    </div>
  );
};
