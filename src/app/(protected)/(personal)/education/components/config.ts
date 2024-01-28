import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import { graduationSchema } from "../lib/validation";
import { type z } from "zod";


interface FormConfigParams {
  setCurrentStep: ((step: number) => void) | undefined
}
const step = 5;

export const useFormConfig = ({ setCurrentStep }: FormConfigParams) => {
  const { ...form } = useForm<z.infer<typeof graduationSchema>>({
    resolver: zodResolver(graduationSchema),
    refineCoreProps: {
      resource: "education",
      autoSave: {
        enabled: true,
      },
      redirect: false,
      onMutationSuccess: (data) => {
        (setCurrentStep != null) && setCurrentStep(step);
      },
    },
    warnWhenUnsavedChanges: true,
  });
  return { form };
};
