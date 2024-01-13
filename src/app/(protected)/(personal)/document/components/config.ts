import { zodResolver } from "@hookform/resolvers/zod";
import { type RedirectAction } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { documentFormSchema } from "../lib/validation";
import { type z } from "zod";

export const useFormConfig = (redirect: RedirectAction) => {
  const { ...form } = useForm<z.infer<typeof documentFormSchema>>({
    resolver: zodResolver(documentFormSchema),
    refineCoreProps: {
      resource: "document",
      autoSave: {
        enabled: true,
      },
      redirect: false,
    },
    warnWhenUnsavedChanges: true,
  });
  return { form };
};
