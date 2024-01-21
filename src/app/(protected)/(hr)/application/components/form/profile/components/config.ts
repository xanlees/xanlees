import { zodResolver } from "@hookform/resolvers/zod";
import { type RedirectAction } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { profileSchema } from "./validation";
import type { ProfileFormValues } from "../interface";
import { useApplicationContext } from "@src/app/(protected)/(hr)/application/context/context";

interface FormConfigParams {
  redirect: RedirectAction
  setCurrentStep?: ((step: number) => void) | undefined
}

export const useFormConfig = ({ setCurrentStep }: FormConfigParams) => {
  const { state, dispatch } = useApplicationContext();
  const { ...form } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
    defaultValues: {
      personalAddressId: state.personalAddressId,
    },
    refineCoreProps: {
      resource: "profile",
      meta: {
        headers: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          "content-type": "multipart/form-data",
        },
      },
      autoSave: {
        enabled: true,
      },
      onMutationSuccess: (data) => {
        dispatch({ type: "setProfileId", payload: data?.data?.id ?? 0 });
        (setCurrentStep != null) && setCurrentStep(2);
      },
      redirect: false,
    },
    warnWhenUnsavedChanges: true,
  });
  return { form };
};
