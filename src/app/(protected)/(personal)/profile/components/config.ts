/* eslint-disable @typescript-eslint/naming-convention */
import { zodResolver } from "@hookform/resolvers/zod";
import { type RedirectAction } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { profileSchema } from "@src/app/(protected)/(career)/employee/components/form/validation";
import { useProfileContext } from "../../context/context";

interface ProfileFormValues {
  fullname: string
  nickname: string
  phoneNumber: string
  gender: string
  maritalStatus: string
  id?: number
}

export const useFormConfig = (
  redirect: RedirectAction,
  setCurrentStep: any,
  setProfileID: any,
) => {
  const { state, dispatch } = useProfileContext();
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
          "content-type": "multipart/form-data",
        },
      },
      autoSave: {
        enabled: true,
      },
      onMutationSuccess: (data) => {
        dispatch({ type: "SET_PROFILE_ID", payload: data?.data?.id ?? 0 });
        setCurrentStep(2);
        setProfileID(data?.data?.id ?? 0);
      },
      redirect,
    },
    warnWhenUnsavedChanges: true,
  });
  return { form };
};
