
import React from "react";
import { Form } from "@src/shadcn/components/form";
import { type ExtendedFieldArrayProps, type CommonProps } from "../../interface/props";
import { InputFullName, InputNickName, PhonNumberInput } from "./fields";
import { Input } from "@src/shadcn/elements";
import { CircleUser } from "lucide-react";
import { useFieldArray } from "react-hook-form";
import { DynamicForms, InputField, RenderBadge } from "@src/common/components/dynamicForm";
import { useProfileEditForm } from "./useProfileEditForm";
import { GenderAndMaritalStatusSelect } from "@src/app/(protected)/(personal)/profile/containers/form/FormFieldContainer";

export const AgentProfileEditForm: React.FC<{ id: number }> = ({ id }) => {
  const { form } = useProfileEditForm({ id });
  const { fields, append, remove } = useFieldArray({ control: form?.control, name: "uniqueNumber" });
  return (
    <Form {...form}>
      <FormFieldContainer form={{ form }} isEmployee={true} />
      <InputUniqueNumber fields={fields} append={append} remove={remove} form={{ form }}/>
      <ContainerFooter form={{ form }} fields={fields} append={append} remove={remove} />
    </Form>
  );
};

export const FormFieldContainer: React.FC< CommonProps & { isEmployee: boolean } > = ({ form }) => {
  return (
    <>
      <Form.Field {...form} name="profilePicture" require={false}>
        <Form.FileInputImage className="w-64 h-64 pt-1" label="ເລືອກຮູບພາບ ຫຼື ເຊວຟີກໍໄດ້" iconImage={<CircleUser className="h-20 w-20" />} />
      </Form.Field>
      <div className="flex flex-wrap gap-2">
        <InputFullName form={form} />
        <InputNickName form={form} />
        <GenderAndMaritalStatusSelect form={form} />
        <PhonNumberInput form={form} />
      </div>
    </>
  );
};

export const UniqueNumber: React.FC<CommonProps> = ({ form }) => {
  return (
    <div className="w-full lg:w-80 ">
      <div className="relative w-full mb-3">
        <Form.Field {...form} name={"uniqueNumber"} label={"ເລກລະຫັດເອກກະສານຢືນຢັນ"}>
          <Input className="w-full" placeholder="ເລກລະຫັດເອກກະສານຢືນຢັນ" />
        </Form.Field>
      </div>
    </div>
  );
};

const ContainerFooter: React.FC<ExtendedFieldArrayProps> = ({ form, append, fields, remove }) => {
  return (
    <>
      <RenderBadge remove={remove} name="uniqueNumber" {...form} className=" grid grid-cols-3" />
      <DynamicForms {...form} fields={fields} append={append} remove={remove} name="uniqueNumber" className="hidden" />
    </>
  );
};

export const InputUniqueNumber: React.FC<ExtendedFieldArrayProps> = ({ append, fields }) => {
  return (
    <div className="w-full lg:w-80">
      <div className="relative w-full mb-3">
        <InputField
          fields={fields}
          append={append}
          name="uniqueNumber"
          label="ລະຫັດເຄຶ່ອງ"
          placeholder="000"
          maxLength={15}
          numericOnly
          require={false}
          errorMessage="ເລກຊໍ້າ" />
      </div>
    </div>
  );
};
