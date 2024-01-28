import { type BaseOption, useSelect } from "@refinedev/core";
import { Form } from "@src/shadcn/components/form";
import { ArrayField } from "@src/shadcn/components/form/array-field";
import { DatePickerField } from "@src/shadcn/components/form/datepicker";
import { DynamicForm } from "@src/shadcn/components/form/dynamtic-form";
import { Card, Input } from "@src/shadcn/elements";
import React, { useEffect, useState } from "react";
import { useFieldArray } from "react-hook-form";
import { type IGraduation } from "../interface";
import { FormGraduation } from "../../graduation/components/form";
import { useFormConfig } from "./config";
import { useProfileContext } from "../../context";

interface EducationFormProps {
  setCurrentStep?: (step: number) => void
}
export const EducationForm: React.FC<EducationFormProps> = ({ setCurrentStep }) => {
  const { state } = useProfileContext();
  const formConfig = useFormConfig({ setCurrentStep });
  const graduation = useGraduationSelect();
  const { fields, append, remove } = useFieldArray({ control: formConfig.form.control, name: "education" });
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
      if (!isMounted) {
          append({ profileId: state.profileId });
          setIsMounted(true);
          remove(1);
      }
  },[isMounted]);
  return (
    <div className="w-full sm:w-[53%] rounded-lg">
      <Form {...formConfig.form}>
        <DynamicForm
          form={formConfig.form}
          fields={fields}
          append={append}
          remove={remove}
          name="education"
          label="ການສຶກສາວິຊາສະເພາະທີ່ຈົບ" className="flex gap-2" classNameButton="mt-5" defaultConfig={{ profileId: state.profileId } }
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
