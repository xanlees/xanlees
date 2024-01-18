/* eslint-disable @typescript-eslint/naming-convention */
import { zodResolver } from "@hookform/resolvers/zod";
import { type RedirectAction } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { profileSchema } from "./validation";
import type { ProfileFormValues } from "../interface";
import { useApplicationContext } from "@src/app/(protected)/(hr)/context/context";

interface FormConfigParams {
  redirect: RedirectAction
  setCurrentStep?: ((step: number) => void) | undefined
  setProfileID?: ((id: number) => void) | undefined
}

export const useFormConfig = ({
  setCurrentStep,
  setProfileID,
}: FormConfigParams) => {
  const { state, dispatch } = useApplicationContext();
  const { ...form } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
    defaultValues: {
      personalAddressId: 1,
      // personalAddressId: state.personalAddressId,
      typeOfUniqueNumber: "IDENTIFY",
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
        dispatch({ type: "setProfileId", payload: data?.data?.id ?? 0 });
        (setCurrentStep != null) && setCurrentStep(2);
        (setProfileID != null) && setProfileID(data?.data?.id ?? 0);
      },
      redirect: false,
    },
    warnWhenUnsavedChanges: true,
  });
  return { form };
};
