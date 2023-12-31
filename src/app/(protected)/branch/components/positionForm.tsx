/* eslint-disable @typescript-eslint/naming-convention */
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type RedirectAction } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { Input } from "@src/shadcn/elements";
import { positionSchema } from "../validation/validation";
import { usePositionContext } from "./context";
import { Form } from "@src/shadcn/components/form";

interface PositionFormProps {
  redirect: RedirectAction
}
interface PositionFormValues {
  name: string
  sectorId: string
}

export const PositionForm: React.FC<PositionFormProps> = ({ redirect }) => {
  const { state } = usePositionContext();
  const { ...form } = useForm<PositionFormValues>({
    resolver: zodResolver(positionSchema),
    defaultValues: {
      sectorId: state.sectorId,
    },
    refineCoreProps: {
      resource: "position",
      autoSave: {
        enabled: true,
      },
      redirect,
    },
    warnWhenUnsavedChanges: true,
  });
  return (
    <div className="w-full">
      <div className="w-full">
        <Form {...form}>
          <div className="w-full">
            <Form.Field {...form} name="name" label="Position Name">
              <Input placeholder="Position Name" className="block w-full" />
            </Form.Field>
          </div>
        </Form>
      </div>
    </div>
  );
};
