/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable max-lines-per-function */
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import { Card, Input } from "@src/shadcn/elements";
import { graduationSchema } from "../../(career)/employee/validation/validation";
import { type RedirectAction } from "@refinedev/core";
import { useFieldArray } from "react-hook-form";
import { Form } from "@src/shadcn/components/form";
import { DynamicForm } from "@src/shadcn/components/form/dynamtic-form";
import { ArrayField } from "@src/shadcn/components/form/array-field";
import { useProfileContext } from "../context/context";

interface GraduationFormProps {
  redirect: RedirectAction
}

interface GraduationFormValues {
  graduation: Array<{
    degrees: string
    sectors: string
  }>
  id?: number
}

export const GraduationForm: React.FC<GraduationFormProps> = ({ redirect }) => {
  const { dispatch } = useProfileContext();

  const { ...form } = useForm<GraduationFormValues>({
    resolver: zodResolver(graduationSchema),
    refineCoreProps: {
      resource: "graduation",
      autoSave: {
        enabled: true,
      },
      redirect,
      onMutationSuccess: (data) => {
        dispatch({ type: "SET_GRADUATION_ID", payload: data?.data?.id ?? 0 });
      },
    },
    warnWhenUnsavedChanges: true,
  });

  const { fields, append } = useFieldArray({
    control: form.control,
    name: "graduation",
  });
  return (
    <div className="w-1/2 rounded-lg">
      <Form {...form}>
        <DynamicForm
          form={form}
          fields={fields}
          append={append}
          name="graduation"
          label="Graduation"
        >
          <ArrayField {...form} name="degree" label="Degree">
            <Input placeholder="Degree" className="block w-full" />
          </ArrayField>
          <ArrayField {...form} name="sector" label="Sector">
            <Input placeholder="Degree" className="block w-full" />
          </ArrayField>
        </DynamicForm>
      </Form>
      <Card className="p-2 mt-2 rounded-lg">
        {/* <AccordionDemo /> */}
      </Card>
    </div>
  );
};
