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
        let id: number;
        if (Array.isArray(data?.data)) {
          id = data?.data[0]?.id ?? 0;
        } else {
          id = data?.data?.id ?? 0;
        }
        dispatch({ type: "setWorkExperienceId", payload: id });
        (setCurrentStep != null) && setCurrentStep(step);
      },
    },
    warnWhenUnsavedChanges: true,
  });
  return { form };
};
