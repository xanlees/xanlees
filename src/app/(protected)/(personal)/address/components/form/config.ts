import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import { personalAddressSchema } from "./validation";

interface PersonalAddressFormValues {
  bornDistrictId: number
  currentDistrictId: number
  bornVillage: string
  currentVillage: string
  id?: number
}
interface FormConfigParams {
  setCurrentStep?: ((step: number) => void) | undefined
  dispatch: any
}
const step = 1;

export const useFormConfig = ({ setCurrentStep, dispatch }: FormConfigParams) => {
  const { ...form } = useForm<PersonalAddressFormValues>({
    resolver: zodResolver(personalAddressSchema),
    refineCoreProps: {
      resource: "personal_address",
      redirect: false,
      onMutationSuccess: (data) => {
        dispatch({ type: "setPersonalAddressId", payload: data?.data?.id ?? 0 });
        if (setCurrentStep) { setCurrentStep(step) }
      },
    },
    warnWhenUnsavedChanges: true,
  });
  return { form };
};
