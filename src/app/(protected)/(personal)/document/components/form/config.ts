/* eslint-disable @typescript-eslint/naming-convention */
import { zodResolver } from "@hookform/resolvers/zod";
import { type RedirectAction } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { documentFormSchema } from "./validation";
import { type z } from "zod";

const step = 3;
export const useFormConfig = (redirect: RedirectAction, setCurrentStep: any) => {
  const { ...form } = useForm<z.infer<typeof documentFormSchema>>({
    resolver: zodResolver(documentFormSchema),
    refineCoreProps: {
      resource: "document",
      redirect: false,
      meta: {
        headers: {
          "content-type": "multipart/form-data",
        },
      },
      onMutationSuccess: () => {
        setCurrentStep(step);
      },
    },
    warnWhenUnsavedChanges: true,
  });
  return { form };
};
