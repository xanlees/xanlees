import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import { WorkExperienceSchema } from "./validation";
import { useApplicationContext } from "../../../application/context";

interface FormConfigParams {
  setCurrentStep: ((step: number) => void) | undefined
}
interface WorkExperienceProps {
  id: number
}
const step = 8;
export const useFormConfig = ({ setCurrentStep }: FormConfigParams) => {
  const { dispatch } = useApplicationContext();
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
