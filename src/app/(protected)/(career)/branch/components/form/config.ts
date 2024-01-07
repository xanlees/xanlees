import { zodResolver } from "@hookform/resolvers/zod";
import { type RedirectAction } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import type * as z from "zod";
import { branchSchema, positionSchema } from "./validation";

const useFormConfig = <T extends z.ZodType<any, any, any>>({
  schema,
  resource,
  redirect,
  defaultValues,
}: {
  schema: T
  resource?: string
  redirect?: RedirectAction
  defaultValues?: Record<string, any>
}) => {
  const { ...form } = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues,
    refineCoreProps: {
      autoSave: {
        enabled: true,
      },
      resource,
      redirect,
    },
    warnWhenUnsavedChanges: true,
  });
  return { form };
};

export const useFormBranchConfig = (redirect: RedirectAction) => {
  return useFormConfig({
    schema: branchSchema,
    resource: "branch",
    redirect: false,
  });
};

export const useFormPositionConfig = (redirect: RedirectAction) => {
  return useFormConfig({
    schema: positionSchema,
    resource: "position",
    redirect: false,
    defaultValues: {
      name: "",
    },
  });
};
