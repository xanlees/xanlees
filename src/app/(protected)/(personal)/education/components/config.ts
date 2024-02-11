import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import { graduationSchema } from "../lib/validation";
import { useProfileContext } from "../../context";

interface FormConfigParams {
  setCurrentStep: ((step: number) => void) | undefined
}
const step = 5;
interface IEducationFromValue {
  id: number
}
export const useFormConfig = ({ setCurrentStep }: FormConfigParams) => {
  const { dispatch } = useProfileContext();
  const { ...form } = useForm<IEducationFromValue>({
    resolver: zodResolver(graduationSchema),
    refineCoreProps: {
      resource: "education",
      autoSave: {
        enabled: true,
      },
      redirect: false,
      onMutationSuccess: (data) => {
        let id: number;
        if (Array.isArray(data?.data) && data?.data.length > 0) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          id = data.data[0].id ?? 0;
        } else {
          id = data?.data?.id ?? 0;
        }
        dispatch({ type: "setEducationId", payload: id });
        (setCurrentStep != null) && setCurrentStep(step);
      },
    },
    warnWhenUnsavedChanges: true,
  });
  return { form };
};
