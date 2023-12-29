/* eslint-disable @typescript-eslint/naming-convention */
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type RedirectAction } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { Form } from "@ferdiunal/refinedev-shadcn-ui";
import { Input } from "@/shadcn/ui";
import { useCounter } from "./counterContext";
import { sectorSchema } from "../validation/validation";

interface SectorProps {
  redirect: RedirectAction
}
interface SectorValues {
  name: number
  branchId: number
  id?: number
}

export const SectorForm: React.FC<SectorProps> = ({ redirect }) => {
  const { state, dispatch } = useCounter();
  const { ...form } = useForm<SectorValues>({
    resolver: zodResolver(sectorSchema),
    defaultValues: {
      branchId: state.branchId,
    },
    refineCoreProps: {
      resource: "sector",
      autoSave: {
        enabled: true,
      },
      redirect,
      onMutationSuccess: (data) => {
        dispatch({ type: "SET_SECTOR", payload: data?.data?.id ?? 0 });
      },
    },
    warnWhenUnsavedChanges: true,
  });
  return (
    <div className="w-full">
      <Form {...form}>
        <div className="w-full">
          <Form.Field {...form} name="name" label="Branch Name">
            <Input placeholder="Branch Name" className="block w-full" />
          </Form.Field>
        </div>
      </Form>
    </div>
  );
};
