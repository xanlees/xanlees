/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/naming-convention */
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type RedirectAction } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { Form } from "@ferdiunal/refinedev-shadcn-ui";
import { Input } from "@/shadcn/ui";
import { usePositionContext } from "./context";
import { branchSchema } from "../validation/validation";

interface BranchProps {
  redirect: RedirectAction
}
interface BranchValues {
  name: number
  id?: number
}

export const BranchForm: React.FC<BranchProps> = ({ redirect }) => {
  const { dispatch } = usePositionContext();
  const { ...form } = useForm<BranchValues>({
    resolver: zodResolver(branchSchema),
    refineCoreProps: {
      resource: "branch",
      autoSave: {
        enabled: true,
      },
      redirect,
      onMutationSuccess: (data) => {
        dispatch({ type: "SET_BRANCH", payload: data?.data?.id ?? 0 });
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
