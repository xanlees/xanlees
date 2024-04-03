import { DynamicForm } from "@src/shadcn/components/form/dynamtic-form";
import { ArrayField } from "@src/shadcn/components/form/array-field";
import { useFieldArray } from "react-hook-form";
import { Input } from "@src/shadcn/elements";
import { type IFormConfig } from "@src/common/interface";

export const ComputerSkillSection: React.FC<{ formConfig: IFormConfig }> = ({
  formConfig,
}) => {
  const { fields, append, remove } = useFieldArray({
    control: formConfig.form.control,
    name: "computerSkill",
  });
  return (
    <div className="py-6 border-t border-gray-200 first:pt-0 last:pb-0 first:border-transparent dark:border-gray-700 dark:first:border-transparent">
      <label className="inline-block my-2 text-lg font-medium dark:text-white">
        ຄວາມສາມາດໃນການໃຊ້ຄວາມພິວເຕີ
      </label>
      <div className="flex flex-col w-full gap-2 capitalize rounded-lg sm:w-1/2 sm:flex-row">
        <DynamicForm
          form={formConfig.form}
          fields={fields}
          append={append}
          remove={remove}
          name="computerSkill"
          label="ຄວາມສາມາດໃນການໃຊ້ຄວາມພິວເຕີ"
          className="flex flex-row gap-2"
          classNameButton=""
        >
          <ArrayField {...formConfig.form} name="computerSkill" label="">
            <Input className="w-64" />
          </ArrayField>
        </DynamicForm>
      </div>
    </div>
  );
};
