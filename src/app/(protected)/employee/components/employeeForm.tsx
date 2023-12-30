/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/naming-convention */
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelect, type RedirectAction } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { Form } from "@ferdiunal/refinedev-shadcn-ui";
import { Input } from "@src/shadcn/elements";
import { employeeSchema } from "../validation/validation";
import { useCounter } from "./context";
import { type IPosition } from "../../position/interface";

interface EmployeeFormProps {
  redirect: RedirectAction
}
interface EmployeeFormValues {
  positionId: number
  joiningDate: number
  profileId: number
  isLatest: string
  id?: number
}

export const EmployeeForm: React.FC<EmployeeFormProps> = ({ redirect }) => {
  const { state } = useCounter();
  const { ...form } = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      profileId: state.profileId,
      joiningDate: "2023-12-28T18:46:30.879Z",
    },
    refineCoreProps: {
      resource: "employee",
      autoSave: {
        enabled: true,
      },
      redirect,
    },
    warnWhenUnsavedChanges: true,
  });
  const position = useSelect<IPosition>({
    resource: "position",
    optionLabel: "name",
    optionValue: "id",
  });
  return (
    <div className="w-1/2">
      <Form {...form}>
        <div className="w-full">
          <Form.Field {...form} name="isLatest" label="Latest Position">
            <Input placeholder="Latest Position" className="block w-full" />
          </Form.Field>
        </div>
        <Form.Field {...form} name="positionId" label="Position">
          <Form.Combobox
            {...(position as any)}
            onChange={(value) => {
              form.setValue("positionId", value);
            }}
          />
        </Form.Field>
      </Form>
    </div>
  );
};
