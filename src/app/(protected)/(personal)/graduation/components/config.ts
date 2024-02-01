import { zodResolver } from "@hookform/resolvers/zod";
import { type RedirectAction } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import type * as z from "zod";
import { graduationSchema } from "../../education/lib/validation";

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
