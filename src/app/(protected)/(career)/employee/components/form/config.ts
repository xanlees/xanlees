import { zodResolver } from "@hookform/resolvers/zod";
import { type RedirectAction } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import type * as z from "zod";
import { employeeSchema } from "./validation";

export const useFormConfig = (redirect: RedirectAction) => {
  const { ...form } = useForm<z.infer<typeof employeeSchema>>({
    resolver: zodResolver(employeeSchema),
    refineCoreProps: {
      autoSave: {
        enabled: true,
      },
      resource: "employee",
      redirect,
    },
    warnWhenUnsavedChanges: true,
  });
  return { form };
};
