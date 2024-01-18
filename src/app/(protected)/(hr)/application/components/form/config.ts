import { zodResolver } from "@hookform/resolvers/zod";
import { type RedirectAction } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import type * as z from "zod";
import { applicationSchema } from "./validation";

export const useFormConfig = (redirect: RedirectAction, id: number) => {
  const { ...form } = useForm<z.infer<typeof applicationSchema>>({
    resolver: zodResolver(applicationSchema),
    refineCoreProps: {
      autoSave: {
        enabled: true,
      },
      resource: "application",
      redirect,
    },
    warnWhenUnsavedChanges: true,
  });
  return { form };
};
