/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/naming-convention */
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type RedirectAction } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { Form } from "@ferdiunal/refinedev-shadcn-ui";
import { InputFromLayout } from "./form";
import { Input } from "@src/shadcn/elements";
import { graduationSchema } from "../validation/validation";
import { useCounter } from "./context";

interface GraduationFormProps {
  redirect: RedirectAction
}
interface GraduationFormValues {
  degree: number
  sector: number
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
  return (
    <div className="w-1/2">
      <Form {...form}>
        <InputFromLayout>
          <div className="w-full">
            <Form.Field {...form} name="degree" label="Degree">
              <Input placeholder="Degree" className="block w-full" />
            </Form.Field>
          </div>
          <div className="w-full">
            <Form.Field {...form} name="sector" label="Sector">
              <Input placeholder="Sector" className="block w-full" />
            </Form.Field>
          </div>
        </InputFromLayout>
      </Form>
    </div>
  );
};
