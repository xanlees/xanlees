import { documentFormSchema } from "./validation";
import { useForm } from "@refinedev/react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";

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
      meta: {
        headers: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          "content-type": "multipart/form-data",
        },
      },
      onMutationSuccess: (data) => {
        (setCurrentStep != null) && setCurrentStep(step);
      },
    },
    warnWhenUnsavedChanges: true,
  });
  return { form };
};
