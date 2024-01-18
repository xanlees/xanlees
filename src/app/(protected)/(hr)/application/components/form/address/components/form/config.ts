import { zodResolver } from "@hookform/resolvers/zod";
import { type RedirectAction } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { useApplicationContext } from "@src/app/(protected)/(hr)/context/context";
import { personalAddressSchema } from "./validation";

interface PersonalAddressFormValues {
  bornDistrictId: number
  currentDistrictId: number
  bornVillage: string
  currentVillage: string
  id?: number
}

export const useFormConfig = (
  redirect: RedirectAction,
  setCurrentStep: any,
) => {
  const { dispatch } = useApplicationContext();
  const { ...form } = useForm<PersonalAddressFormValues>({
    resolver: zodResolver(personalAddressSchema),
    refineCoreProps: {
      resource: "personal_address",
      autoSave: {
        enabled: true,
      },
      redirect: false,
      onMutationSuccess: (data) => {
        dispatch({ type: "setPersonalAddressId", payload: data?.data?.id ?? 0 });
        setCurrentStep(1);
      },
    },
    warnWhenUnsavedChanges: true,
  });
  return { form };
};
