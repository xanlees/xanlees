import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import { applicationSchema } from "./validation";
import type { IApplication } from "../../interface";
import { useProfileContext } from "@src/app/(protected)/(personal)/context";
import { useApplicationContext } from "../../context";

interface FormConfigParams {
  setCurrentStep?: ((step: number) => void) | undefined
}

const step = 6;
export const useFormConfig = ({ setCurrentStep }: FormConfigParams) => {
  const { dispatch } = useApplicationContext();
  const { state } = useProfileContext();
  const { ...form } = useForm<IApplication>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      profileId: 2,
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
