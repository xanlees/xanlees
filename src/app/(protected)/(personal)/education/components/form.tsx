/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import { zodResolver } from "@hookform/resolvers/zod";
import { type BaseOption, type RedirectAction, useSelect } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { Form } from "@src/shadcn/components/form";
import { ArrayField } from "@src/shadcn/components/form/array-field";
import { DatePickerField } from "@src/shadcn/components/form/datepicker";
import { DynamicForm } from "@src/shadcn/components/form/dynamtic-form";
import { Card, Input } from "@src/shadcn/elements";
import React from "react";
import { useFieldArray } from "react-hook-form";

import { graduationSchema } from "../../../(career)/employee/validation/validation";
import { useProfileContext } from "../../context/context";
import { type IGraduation } from "../interface";
import { FormGraduation } from "../../graduation/components/form";

interface EducationFormProps {
  redirect: RedirectAction
}
interface EducationFormValues {
  education: Array<{
    branch: string
    profileId: string
    graduationId: string
    year: string
  }>
  id?: number
}

export const EducationForm: React.FC<EducationFormProps> = ({ redirect }) => {
  const { state } = useProfileContext();

  const { ...form } = useForm<EducationFormValues>({
    resolver: zodResolver(graduationSchema),
    defaultValues: {
      education: [
        {
          branch: "",
          profileId: state.profileId,
          graduationId: "",
          year: "",
        },
      ],
    },
    refineCoreProps: {
      resource: "education",
      autoSave: {
        enabled: true,
      },
      redirect,
    },
    warnWhenUnsavedChanges: true,
  });

  const { fields, append } = useFieldArray({
    control: form.control,
    name: "education",
  });

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

  console.log("form", form.watch());
  console.log("fields", fields);

  return (
    <div className="w-2/3 rounded-lg">
      <Form {...form}>
        <DynamicForm
          form={form}
          fields={fields}
          append={append}
          name="education"
          label="Education"
        >
          <ArrayField {...form} name="branch" label="Branch">
            <Input placeholder="branch" className="block w-full" />
          </ArrayField>
          <ArrayField {...form} name="graduationId" label="Graduation">
            <Form.Combobox
              {...(graduation as any)}
              onChange={(value) => {
                form.setValue("graduationId", value);
              }}
            />
          </ArrayField>
          <ArrayField {...form} name="year" label="year">
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
