import React from "react";
import { useFieldArray } from "react-hook-form";

import { Form } from "@src/shadcn/components/form";
import { ArrayField } from "@src/shadcn/components/form/array-field";
import { DynamicForm } from "@src/shadcn/components/form/dynamtic-form";
import { Input } from "@src/shadcn/elements";

import { useProfileContext } from "../../../context";
import { FormGraduation } from "../../../graduation/containers/form/form";
import { useGraduationSelect } from "../../hook/form/useGraduationSelect";
import { useFormConfig } from "./config";
import { FileInputField } from "@src/shadcn/components/form/file-input";

export const EducationForm: React.FC = () => {
  const { state } = useProfileContext();
  const formConfig = useFormConfig();
  const graduation = useGraduationSelect();
  const { fields, append, remove } = useFieldArray({ control: formConfig.form.control, name: "education" });
  const isCompleted = state.educationId ?? 0;
  console.log(formConfig.form.watch());
  return (<div className="w-full rounded-lg">
    {isCompleted
      ? (<p className="italic">ສຳເລັດແລ້ວ !</p>)
      : (<div><Form {...formConfig.form} cardClassName="">
        <DynamicForm form={formConfig.form} fields={fields} append={append} remove={remove} name="education" label="ເພີ່ມການສຶກສາອີກ" className="flex flex-col sm:flex-row sm:flex-wrap" classNameButton="mt-5" defaultConfig={{ profileId: state.profileId }}>
          <ArrayField {...formConfig.form} name="branch" label="ສະຖາບັນ/ໂຮງຮຽນ">
            <Input placeholder="ຍວນໄຂ" type="text" className="block w-full sm:w-28" />
          </ArrayField>
          <ArrayField {...formConfig.form} name="graduationId" label="ສາຂາ/ສາຍສາມັນ">
            <Form.Combobox {...(graduation as any)} />
          </ArrayField>
          <ArrayField {...formConfig.form} name="year" label="ສົກປີຈົບ">
            <Input placeholder="2018" type="number" className="block w-full sm:w-28" />
          </ArrayField>
        </DynamicForm>
      </Form>
      <FormGraduation /></div>)}
  </div>);
};
