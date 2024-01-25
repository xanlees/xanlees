import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import type * as z from "zod";
import { WorkExperienceSchema } from "./validation";

interface FormConfigParams {
  setCurrentStep: ((step: number) => void) | undefined
}
const step = 6;

export const useFormConfig = ({ setCurrentStep }: FormConfigParams) => {
  const { ...form } = useForm<z.infer<typeof WorkExperienceSchema>>({
    resolver: zodResolver(WorkExperienceSchema),
    refineCoreProps: {
      resource: "work_experience",
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
