import { zodResolver } from "@hookform/resolvers/zod";
import { type RedirectAction } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { graduationSchema } from "@src/app/(protected)/(career)/employee/validation/validation";
import type * as z from "zod";

export const useFormConfig = (redirect: RedirectAction) => {
  const { ...form } = useForm<z.infer<typeof graduationSchema>>({
    resolver: zodResolver(graduationSchema),
    refineCoreProps: {
      resource: "graduation",
      autoSave: {
        enabled: true,
      },
      redirect,
    },
    warnWhenUnsavedChanges: true,
  });
  return { form };
};
