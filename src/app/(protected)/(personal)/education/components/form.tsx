import { type BaseOption, type RedirectAction, useSelect } from "@refinedev/core";
import { Form } from "@src/shadcn/components/form";
import { ArrayField } from "@src/shadcn/components/form/array-field";
import { DatePickerField } from "@src/shadcn/components/form/datepicker";
import { DynamicForm } from "@src/shadcn/components/form/dynamtic-form";
import { Card, Input } from "@src/shadcn/elements";
import React from "react";
import { useFieldArray } from "react-hook-form";
import { type IGraduation } from "../interface";
import { FormGraduation } from "../../graduation/components/form";
import { useFormConfig } from "./config";

interface EducationFormProps {
  redirect: RedirectAction
}
export const EducationForm: React.FC<EducationFormProps> = ({ redirect }) => {
  const formConfig = useFormConfig(redirect);
  const graduation = useGraduationSelect();
  const { fields, append } = useFieldArray({ control: formConfig.form.control, name: "education" });
  console.log("fields", fields);
  console.log("formConfig", formConfig.form.watch());

  return (
    <div className="w-[50%] rounded-lg">
      <Form {...formConfig.form}>
        <DynamicForm
          form={formConfig.form}
          fields={fields}
          append={append}
          name="education"
          label="ການສຶກສາວິຊາສະເພາະທີ່ຈົບ"
        >
          <ArrayField {...formConfig.form} name="branch" label="ສາຂາ">
            <Input placeholder="ສາຂາ" className="block w-56" />
          </ArrayField>
          <ArrayField {...formConfig.form} name="graduationId" label="ຂະແໜງທີ່ຈົບ">
            <Form.Combobox {...(graduation as any)}/>
          </ArrayField>
          <ArrayField {...formConfig.form} name="year" label="ຈົບສົກປີ">
            <DatePickerField />
          </ArrayField>
        </DynamicForm>
      </Form>
      <Card className="p-2 mt-2 rounded-lg">
        <FormGraduation redirect="edit" />
      </Card>
    </div>
  );
};

const useGraduationSelect = () => {
  const graduation = useSelect<IGraduation>({
    resource: "graduation",
    optionLabel: "degree",
    optionValue: "id",
  });
  const options = graduation.queryResult.data?.data.map((item) => ({
    label: `${item.degree} - ${item.sector}`,
    value: item.id,
  }));
  graduation.options = options as BaseOption[];
  return graduation;
};
