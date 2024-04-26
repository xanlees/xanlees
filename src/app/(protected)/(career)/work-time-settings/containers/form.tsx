import { Form } from "@src/shadcn/components/form";
import { useSelect } from "@refinedev/core";
import { Input } from "@src/shadcn/elements";
import { useWorkTimeSettingsForm } from "../hook/useWorkTimeSettingsForm";
import { useFieldArray } from "react-hook-form";
import { DynamicForm } from "@src/shadcn/components/form/dynamtic-form";
import { ArrayField } from "@src/shadcn/components/form/array-field";
import { type IBranch } from "../../branch/interface";
import { type IFormConfig } from "@src/common/interface";

export const WorkTimeSettingsForm: any = ({ branchType }: { branchType: string }) => {
  const { form } = useWorkTimeSettingsForm();
  const branch = useSelect<IBranch>({
    resource: "branch",
    optionLabel: "name",
    optionValue: "id",
    filters: [{ field: "pageSize", operator: "eq", value: 100 }],
  });
  return (
    <Form {...form}>
      <FormFieldContainer form={form} branch={branch} />
      <div className="flex flex-col w-full gap-2 capitalize rounded-lg sm:flex-row sm:w-1/2" />
      <DynamicDayOfWeekForm form={form} />
    </Form>
  );
};

export const FormFieldContainer: React.FC<{ form: IFormConfig, branch: any }> = ({ form, branch }) => {
  return (
    <div className="flex flex-wrap gap-2">
      <div className="w-full lg:w-80 ">
        <div className="relative w-full mb-3">
          <Form.Field {...form} name="branch" label="ເລືອກຫ້ອງການ">
            <Form.Combobox {...branch} className="w-full lg:w-80" />
          </Form.Field>
        </div>
      </div>
      <div className="w-full lg:w-80 ">
        <div className="relative w-full mb-3">
          <Form.Field {...form} name="lateTime" label="ມາຊ້າ ຫຼື ກັບກ່ອນເວລາໄດ້ຈັກນາທິ (ນາທີ)" >
            <Input placeholder="15" className="w-full" numericOnly />
          </Form.Field>
        </div>
      </div>
    </div>
  );
};
export const DynamicDayOfWeekForm: React.FC<{ form: IFormConfig }> = ({ form }) => {
  const { fields, append, remove } = useFieldArray({ control: form.control, name: "workTimeSettings" });
  return (
    <div className="relative w-full mb-3">
      <DynamicForm
        form={form} fields={fields} append={append} remove={remove}
        name="workTimeSettings" label="ເພີ່ມມື້"
        className="flex flex-col sm:flex-row sm:flex-wrap"
        classNameButton="mt-5" defaultConfig={{ branch: 0 }}
      >
        <ArrayField {...form} name="dayOfWeek" label="ເລືອກມື້">
          <Form.Combobox {...(dayOfWeek as any)} className="w-full lg:w-80 "/>
        </ArrayField>
        <ArrayField {...form} name="checkInTime" label="ເວລາເຂົ້າວຽກ">
          <Input type="time" className="block w-full sm:w-32" />
        </ArrayField>
        <ArrayField {...form} name="checkOutTime" label="ເວລາເລີກວຽກ">
          <Input type="time" className="block w-full sm:w-32" />
        </ArrayField>
      </DynamicForm>
    </div>
  );
};
export const dayOfWeek = {
  options: [
    { label: "ວັນຈັນ", value: "Monday" },
    { label: "ວັນອັງຄານ", value: "Tuesday" },
    { label: "ວັນພຸດ", value: "Wednesday" },
    { label: "ວັນພະຫັດ", value: "Thursday" },
    { label: "ວັນ​ສຸກ", value: "Friday" },
    { label: "ວັນເສົາ", value: "Saturday" },
    { label: "ວັນອາທິດ", value: "Sunday" },
  ],
};
