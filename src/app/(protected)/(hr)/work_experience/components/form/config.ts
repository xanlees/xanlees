import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import { WorkExperienceSchema } from "./validation";

interface FormConfigParams {
  setCurrentStep: ((step: number) => void) | undefined
  dispatch: any
}
interface WorkExperienceProps {
  id: number
}
const step = 6;


export const useFormConfig = ({ setCurrentStep, dispatch }: FormConfigParams) => {
  const { ...form } = useForm<WorkExperienceProps>({
    resolver: zodResolver(WorkExperienceSchema),
    refineCoreProps: {
      resource: "work_experience",
      autoSave: {
        enabled: true,
      },
      redirect: false,
      onMutationSuccess: (data) => {
        dispatch({ type: "setWorkExperienceId", payload: data?.data?.id ?? 0 });
        (setCurrentStep != null) && setCurrentStep(step);
      },
    },
    warnWhenUnsavedChanges: true,
  });
  return { form };
};
