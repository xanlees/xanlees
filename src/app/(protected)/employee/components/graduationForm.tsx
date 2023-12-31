/* eslint-disable max-lines-per-function */
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import { Form } from "@ferdiunal/refinedev-shadcn-ui";
import { InputFromLayout } from "./form";
import { Input } from "@src/shadcn/elements";
import { graduationSchema } from "../validation/validation";
import { useCounter } from "./context";
import { useFieldArray } from "react-hook-form";
import { type RedirectAction } from "@refinedev/core";

interface GraduationFormProps {
  redirect: RedirectAction
}

interface GraduationFormValues {
  degrees: string[]
  sectors: string[]
  id?: number
}

export const GraduationForm: React.FC<GraduationFormProps> = ({ redirect }) => {
  const { dispatch } = useCounter();

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

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "degrees",
  });
  console.log("fields", fields);
  return (
    <div className="w-1/2">
      <Form {...form}>
        <InputFromLayout>
          <div className="w-full">
            {fields.map((field, index) => (
              <Form.Field
                key={field.id}
                {...form}
                name={`degrees[${index}]`}
                label={`Degree ${index + 1}`}
              >
                <Input
                  placeholder={`Degree ${index + 1}`}
                  className="block w-full"
                />
              </Form.Field>
            ))}
            <button type="button" onClick={() => append("")}>
              Add Degree
            </button>
          </div>
          <div className="w-full">
            {fields.map((field, index) => (
              <Form.Field
                key={field.id}
                {...form}
                name={`sectors[${index}]`}
                label={`Sector ${index + 1}`}
              >
                <Input
                  placeholder={`Sector ${index + 1}`}
                  className="block w-full"
                />
              </Form.Field>
            ))}
            <button type="button" onClick={() => append("")}>
              Add Sector
            </button>
          </div>
        </InputFromLayout>
      </Form>
    </div>
  );
};
