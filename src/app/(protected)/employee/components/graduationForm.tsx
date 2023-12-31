/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable max-lines-per-function */
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import { InputFromLayout } from "./form";
import { Input } from "@src/shadcn/elements";
import { graduationSchema } from "../validation/validation";
import { useCounter } from "./context";
import { type RedirectAction } from "@refinedev/core";
import { useFieldArray } from "react-hook-form";
import { Form } from "@src/shadcn/components/form";

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
    name: "graduation",
  });
  return (
    <div className="w-1/2">
      <Form {...form}>
        <InputFromLayout>
          {fields.map((field, index) => (
            <div key={field.id}>
              <div className="w-full">
                <Form.Field
                  {...form}
                  name={`graduation[${index}].degrees`}
                  label={`Degrees ${index + 1}`}
                >
                  <Input
                    placeholder={`Degrees ${index + 1}`}
                    className="block w-full"
                  />
                </Form.Field>
              </div>
              <div className="w-full">
                <Form.Field
                  {...form}
                  name={`graduation[${index}].sectors`}
                  label={`Sectors ${index + 1}`}
                >
                  <Input
                    placeholder={`Sectors ${index + 1}`}
                    className="block w-full"
                  />
                </Form.Field>
              </div>
              <button type="button" onClick={() => { remove(index); }}>
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => { append({ degrees: "", sectors: "" }); }}
          >
            Add Graduation
          </button>
        </InputFromLayout>
      </Form>
    </div>
  );
};
