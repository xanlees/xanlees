import { zodResolver } from "@hookform/resolvers/zod";
import type { RedirectAction } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import type * as z from "zod";
import { WorkExperienceSchema } from "./validation";
import { useApplicationContext } from "@src/app/(protected)/(hr)/context/context";

export const useFormConfig = (redirect: RedirectAction, setCurrentStep: any) => {
  const { state } = useApplicationContext();
  const { ...form } = useForm<z.infer<typeof WorkExperienceSchema>>({
    resolver: zodResolver(WorkExperienceSchema),
    defaultValues: {
      applicationId: state.applicationId,
    },
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
