/* eslint-disable @typescript-eslint/naming-convention */
import { zodResolver } from "@hookform/resolvers/zod";
import { type RedirectAction } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { useProfileContext } from "../../context/context";
import { profileSchema } from "./validation";
import type { ProfileFormValues } from "../interface";

interface FormConfigParams {
  redirect: RedirectAction
  setCurrentStep?: ((step: number) => void) | undefined
  setProfileID?: ((id: number) => void) | undefined
}

export const useFormConfig = ({
  redirect,
  setCurrentStep,
  setProfileID,
}: FormConfigParams) => {
  const { state, dispatch } = useProfileContext();
  const { ...form } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
    defaultValues: {
      personalAddressId: state.profileId,
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
