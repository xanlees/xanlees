import React, { useState } from "react";
import { Input } from "@src/shadcn/elements";
import { Form } from "@src/shadcn/components/form";
import RenderFile from "./RenderFile";
import { useFieldArray } from "react-hook-form";
import { useFormConfig } from "./config";
import DocumentDynamicForm from "./DynamicForm";

interface DocumentFormProps {
  setCurrentStep?: (step: number) => void
  dispatch: any
}

export const DocumentForm: React.FC<DocumentFormProps> = ({ setCurrentStep, dispatch }) => {
  const formConfig = useFormConfig({ setCurrentStep, dispatch });
  const { fields, append, remove } = useFieldArray({ control: formConfig.form.control, name: "document" });
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState<FileList | null>(null);
  return (
    <div className="w-[40%] rounded-lg">
      <Form {...formConfig.form}>
        <div className="flex flex-row gap-4">
          <Input placeholder="ຊື່ເອກສານ" className="flex w-full" onChange={handleInputChange(setFileName)} />
          <Form.FileInput onChange={handleFileInputChange(setFile)} showFileDisplay={false} />
          <div className="-mt-1">
            <DocumentDynamicForm
              formConfig={formConfig}
              fields={fields}
              append={append}
              fileName={fileName}
              file={file}
            />
          </div>
        </div>
        {fields.map((field, index) => (
          <RenderFile key={field.id} field={field} removeField={() => { remove(index); }} />
        ))}
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
