import { zodResolver } from "@hookform/resolvers/zod";
import type { RedirectAction } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import type * as z from "zod";
import { WorkExperienceSchema } from "./validation";

export const useFormConfig = (redirect: RedirectAction, setCurrentStep: any) => {
  const { ...form } = useForm<z.infer<typeof WorkExperienceSchema>>({
    resolver: zodResolver(WorkExperienceSchema),
    refineCoreProps: {
      resource: "work_experience",
      autoSave: {
        enabled: true,
      },
      redirect: false,
    },
    warnWhenUnsavedChanges: true,
  });
  return { form };
};
