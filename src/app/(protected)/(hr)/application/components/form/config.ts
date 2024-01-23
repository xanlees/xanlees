import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import { applicationSchema } from "./validation";
import { useApplicationContext } from "../../context/context";
import type { IApplication } from "../../interface";

interface FormConfigParams {
  setCurrentStep?: ((step: number) => void) | undefined
}

const step = 4;
export const useFormConfig = ({ setCurrentStep }: FormConfigParams) => {
  const { state, dispatch } = useApplicationContext();
  const { ...form } = useForm<IApplication>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      profileId: state.profileId,
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
