import React from "react";
import { DynamicForm } from "@src/shadcn/components/form/dynamtic-form";
import { type IFormConfig } from "@src/common/interface";
import { useProfileContext } from "../../../../context";
import { type UseFieldArrayAppend } from "react-hook-form";

interface DocumentDynamicFormProps {
  form: IFormConfig
  fields: any[]
  append: UseFieldArrayAppend<any, "document">
  fileName: string
  file: FileList | null
}

const DocumentDynamicForm: React.FC<DocumentDynamicFormProps> = ({
  form,
  fields,
  append,
  fileName,
  file,
}) => {
  const { state } = useProfileContext();

  return (
    <DynamicForm
      form={form}
      fields={fields}
      append={append}
      name="document"
      className="grid"
      label="ເອກກະສານ"
      classNameButton="hidden"
      defaultConfig={{
        profileId: state.profileId,
        documentName: fileName,
        documentFile: file,
      }}
    >
    </DynamicForm>
  );
};

export default DocumentDynamicForm;
