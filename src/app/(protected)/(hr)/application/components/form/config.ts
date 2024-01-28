import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import { applicationSchema } from "./validation";
import type { IApplication } from "../../interface";

interface FormConfigParams {
  setCurrentStep?: ((step: number) => void) | undefined
  state?: {
    profileId: number
  }
  dispatch: any
}

const step = 5;
export const useFormConfig = ({ setCurrentStep, state, dispatch}: FormConfigParams) => {
  const { ...form } = useForm<IApplication>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      profileId: state?.profileId,
      applicationStatus: "New",
    },
    refineCoreProps: {
      resource: "application",
      redirect: false,
      onMutationSuccess: (data) => {
        dispatch({ type: "setApplicationId", payload: data?.data?.id ?? 0 });
        (setCurrentStep != null) && setCurrentStep(step);
      },
    },
    warnWhenUnsavedChanges: true,
  });
  return { form };
};
