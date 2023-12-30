/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/naming-convention */
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type RedirectAction } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { Form } from "@ferdiunal/refinedev-shadcn-ui";
import { InputFromLayout } from "./form";
import { Input } from "@src/shadcn/elements";
import { educationSchema } from "../validation/validation";
import { useCounter } from "./context";

interface EducationFormProps {
  redirect: RedirectAction
}
interface EducationFormValues {
  profileId: number
  graduationId: number
  branch: string
  sector: string
  year: string
  id?: number
}

export const EducationForm: React.FC<EducationFormProps> = ({ redirect }) => {
  const { state } = useCounter();
  const { ...form } = useForm<EducationFormValues>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      profileId: state.profileId,
      graduationId: state.graduationId,
      year: "2023-12-28T18:46:30.879Z",
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
  return (
    <div className="w-1/2">
      <Form {...form}>
        <InputFromLayout>
          <div className="w-full">
            <Form.Field {...form} name="branch" label="Branch">
              <Input placeholder="Branch" className="block w-full" />
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
