import { Form } from "@src/shadcn/components/form";
import { ArrayField } from "@src/shadcn/components/form/array-field";
import { DatePickerField } from "@src/shadcn/components/form/datepicker";
import { DynamicForm } from "@src/shadcn/components/form/dynamtic-form";
import { Input } from "@src/shadcn/elements";
import React, { useEffect, useState } from "react";
import { useFieldArray } from "react-hook-form";
import { FormGraduation } from "../../../graduation/containers/form/form";
import { useFormConfig } from "./config";
import { useProfileContext } from "../../../context";
import { useGraduationSelect } from "../../hook/form/useGraduationSelect";

interface EducationFormProps {
  setCurrentStep?: (step: number) => void
}
export const EducationForm: React.FC<EducationFormProps> = ({ setCurrentStep }) => {
  const { state } = useProfileContext();
  const formConfig = useFormConfig({ setCurrentStep });
  console.log(formConfig.form.watch())
  const graduation = useGraduationSelect();
  const { fields, append, remove } = useFieldArray({ control: formConfig.form.control, name: "education" });
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    if (!isMounted) {
      append({ profileId: state.profileId });
      setIsMounted(true);
      remove(1);
    }
  }, [isMounted]);
  return (
    <div className="w-full rounded-lg">
      <Form {...formConfig.form} cardClassName="w-full flex flex-col">
        <DynamicForm form={formConfig.form} fields={fields} append={append} remove={remove} name="education" label="ການສຶກສາອີກ" className="flex gap-2" classNameButton="mt-5" defaultConfig={{ profileId: state.profileId } }>
          <ArrayField {...formConfig.form} name="branch" label="ສາຂາ">
            <Input placeholder="ສາຂາ" className="block w-56" />
          </ArrayField>
          <ArrayField {...formConfig.form} name="graduationId" label="ຂະແໜງທີ່ຈົບ">
            <Form.Combobox {...(graduation as any)}/>
          </ArrayField>
          <ArrayField {...formConfig.form} name="year" label="ຈົບສົກປີ">
            <Input placeholder="2018" type="number" className="block w-56"/>
          </ArrayField>
        </DynamicForm>
      </Form>
      <FormGraduation />
    </div>
  );
};
