/* eslint-disable @typescript-eslint/naming-convention */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import { profileSchema } from "./validation";
import type { ProfileFormValues } from "../interface";

interface FormConfigParams {
  setCurrentStep?: ((step: number) => void) | undefined
  setProfileID?: ((id: number) => void) | undefined
  dispatch: any,
  state?: {
    personalAddressId?: number
  },
}

export const useFormConfig = ({
  setCurrentStep, dispatch, state
}: FormConfigParams) => {
  const { ...form } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
    defaultValues: {
      personalAddressId: state?.personalAddressId,
    },
    refineCoreProps: {
      resource: "profile",
      meta: {
        headers: {
          "content-type": "multipart/form-data",
        },
      },
      autoSave: {
        enabled: true,
      },
      onMutationSuccess: (data) => {
        dispatch({ type: "setPersonalAddressId", payload: data?.data?.id ?? 0 });
        (setCurrentStep != null) && setCurrentStep(2);
      },
      redirect: false,
    },
    warnWhenUnsavedChanges: true,
  });
  return { form };
};
