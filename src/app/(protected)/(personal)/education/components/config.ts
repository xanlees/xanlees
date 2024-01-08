import { zodResolver } from "@hookform/resolvers/zod";
import { type RedirectAction } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { graduationSchema } from "../lib/validation";
import { type z } from "zod";

export const useFormConfig = (redirect: RedirectAction) => {
  const { ...form } = useForm<z.infer<typeof graduationSchema>>({
    resolver: zodResolver(graduationSchema),
    refineCoreProps: {
      resource: "education",
      autoSave: {
        enabled: true,
      },
      redirect,
    },
    warnWhenUnsavedChanges: true,
  });
  return { form };
};
