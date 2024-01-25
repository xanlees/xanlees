import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import { personalAddressSchema } from "./validation";
import { useProfileContext } from "@src/app/(protected)/(personal)/context/context";

interface PersonalAddressFormValues {
  bornDistrictId: number
  currentDistrictId: number
  bornVillage: string
  currentVillage: string
  id?: number
}
interface FormConfigParams {
  setCurrentStep: ((step: number) => void) | undefined
}
const step = 1;

export const useFormConfig = ({ setCurrentStep }: FormConfigParams) => {
  const { dispatch } = useProfileContext();
  const { ...form } = useForm<PersonalAddressFormValues>({
    resolver: zodResolver(personalAddressSchema),
    refineCoreProps: {
      resource: "personal_address",
      redirect: false,
      onMutationSuccess: (data) => {
        dispatch({ type: "setPersonalAddressId", payload: data?.data?.id ?? 0 });
        (setCurrentStep != null) && setCurrentStep(step);
      },
    },
    warnWhenUnsavedChanges: true,
  });
  return { form };
};
