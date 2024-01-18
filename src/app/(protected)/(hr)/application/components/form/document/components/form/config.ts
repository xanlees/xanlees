import { zodResolver } from "@hookform/resolvers/zod";
import { type RedirectAction } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { formConfig } from "@src/common/interface";
import { type z } from "zod";

import { documentFormSchema } from "./validation";

const step = 3;

export const useFormConfig = (redirect: RedirectAction, setCurrentStep: any) => {
  const { ...form } = useForm<z.infer<typeof documentFormSchema>>({
    resolver: zodResolver(documentFormSchema),
    refineCoreProps: {
      resource: "document",
      redirect: false,
      meta: formConfig,
      onMutationSuccess: () => {
        setCurrentStep(step);
      },
    },
    warnWhenUnsavedChanges: true,
  });
  return { form };
};
