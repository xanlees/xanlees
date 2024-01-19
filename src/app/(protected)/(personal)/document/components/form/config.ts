import { documentFormSchema } from "./validation";
import { useForm } from "@refinedev/react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { formHeadersConfig } from "@src/common/interface";

const step = 3;
interface FormConfigParams {
  setCurrentStep: ((step: number) => void) | undefined
}

export const useFormConfig = ({ setCurrentStep }: FormConfigParams) => {
  const { ...form } = useForm<z.infer<typeof documentFormSchema>>({
    resolver: zodResolver(documentFormSchema),
    refineCoreProps: {
      resource: "document",
      redirect: false,
      meta: formHeadersConfig,
      onMutationSuccess: (data) => {
        (setCurrentStep != null) && setCurrentStep(step);
      },
    },
    warnWhenUnsavedChanges: true,
  });
  return { form };
};
