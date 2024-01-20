import React, { useState } from "react";
import { Input } from "@src/shadcn/elements";
import { Form } from "@src/shadcn/components/form";
import RenderFile from "./RenderFile";
import { useFieldArray } from "react-hook-form";
import { useFormConfig } from "./config";
import DocumentDynamicForm from "./DocumentDynamicForm";

interface DocumentFormProps {
  setCurrentStep?: (step: number) => void
}

export const DocumentForm: React.FC<DocumentFormProps> = ({ setCurrentStep }) => {
  const formConfig = useFormConfig({ setCurrentStep });
  const { fields, append, remove } = useFieldArray({ control: formConfig.form.control, name: "document" });
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState<FileList | null>(null);
  const handleInput = handleInputChange(setFileName);
  const handleFileInput = handleFileInputChange(setFile);
  return (
    <div className="w-[32%] rounded-lg">
      <Form {...formConfig.form}>
        <Input placeholder="ຊື່ເອກສານ" className="flex w-full" onChange={handleInput}/>
        <Form.FileInput onChange={handleFileInput} />
        {fields.map((field, index) => (
          <RenderFile key={field.id} field={field} removeField={() => { remove(index); }} />
        ))}
        <DocumentDynamicForm
          formConfig={formConfig}
          fields={fields}
          append={append}
          fileName={fileName}
          file={file}
        />
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
