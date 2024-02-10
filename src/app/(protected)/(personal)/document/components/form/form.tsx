import React, { useState } from "react";
import { Input } from "@src/shadcn/elements";
import { Form } from "@src/shadcn/components/form";
import RenderFile from "./RenderFile";
import { useFieldArray } from "react-hook-form";
import { useFormConfig } from "./config";
import DocumentDynamicForm from "./DynamicForm";

interface DocumentFormProps {
  setCurrentStep?: (step: number) => void
}

export const DocumentForm: React.FC<DocumentFormProps> = ({ setCurrentStep }) => {
  const formConfig = useFormConfig({ setCurrentStep });
  const { fields, append, remove } = useFieldArray({ control: formConfig.form.control, name: "document" });
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState<FileList | null>(null);
  console.log(formConfig.form.watch());
  return (
    <div className="w-[40%] rounded-lg relative">
      <Form {...formConfig.form}>
        <div className="flex flex-row h-10 gap-4">
          <Form.Field {...formConfig.form} name="documentName" label="ຊື່ເອກສານ" >
            <Input placeholder="ຊື່ເອກສານ" className="flex w-full" onChange={handleInputChange(setFileName)} />
          </Form.Field>
          <Form.Field {...formConfig.form} name="documentFile" label="ອັບໂຫຼດເອກສານ" >
            <Form.FileInput onChange={handleFileInputChange(setFile)} showFileDisplay={false} />
          </Form.Field>
        </div>
        <div className="h-4 border-b"> </div>
        <Form.Field {...formConfig.form} name="documentList" label="ລາຍການເອກະສານ" ><></></Form.Field>
        {fields.map((field, index) => (
          <RenderFile key={field.id} field={field} removeField={() => { remove(index); }} />
        ))}
        <div className="absolute bottom-7 ">
          <DocumentDynamicForm
            formConfig={formConfig}
            fields={fields}
            append={append}
            fileName={fileName}
            file={file}
          />
        </div>
      </Form>
    </div>
  );
};

export const handleInputChange = (
  setMethod: React.Dispatch<React.SetStateAction<string>>,
) => (e: React.ChangeEvent<HTMLInputElement>) => {
  setMethod(e.target.value);
};

export const handleFileInputChange = (
  setFile: React.Dispatch<React.SetStateAction<FileList | null>>,
) => (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files != null) {
    const selectedFile = e.target.files;
    setFile(selectedFile);
  }
};
