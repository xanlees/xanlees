import { zodResolver } from "@hookform/resolvers/zod";
import { type RedirectAction } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { useProfileContext } from "../../context/context";
import { personalAddressSchema } from "@src/app/(protected)/(career)/employee/validation/validation";

interface PersonalAddressFormValues {
  bornDistrictId: number
  currentDistrictId: number
  bornVillage: string
  currentVillage: string
  id?: number
}

export const useFormConfig = (redirect: RedirectAction, setCurrentStep: any) => {
  const { dispatch } = useProfileContext();
  const { ...form } = useForm<PersonalAddressFormValues>({
    resolver: zodResolver(personalAddressSchema),
    refineCoreProps: {
      resource: "personal_address",
      autoSave: {
        enabled: true,
      },
      redirect,
      onMutationSuccess: (data) => {
        dispatch({ type: "PERSONAL_ADDRESS", payload: data?.data?.id ?? 0 });
        setCurrentStep(1);
      },
    },
    warnWhenUnsavedChanges: true,
  });
  return { form };
};
