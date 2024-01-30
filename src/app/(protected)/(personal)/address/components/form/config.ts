import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import { personalAddressSchema } from "./validation";
import { useProfileContext } from "@src/app/(protected)/(personal)/context";

interface PersonalAddressFormValues {
  bornDistrictId: number
  currentDistrictId: number
  bornVillage: string
  currentVillage: string
  houseNo: string
  id?: number
}
interface FormConfigParams {
  setCurrentStep: ((step: number) => void) | undefined
  showHouseNo?: boolean
}
const step = 1;

export const useFormConfig = ({ setCurrentStep, showHouseNo }: FormConfigParams) => {
  const { dispatch } = useProfileContext();
  const defaultValues: Partial<PersonalAddressFormValues> = {};
  if (showHouseNo) {
    defaultValues.houseNo = "0000";
  }
  const { ...form } = useForm<PersonalAddressFormValues>({
    resolver: zodResolver(personalAddressSchema),
    defaultValues,
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
