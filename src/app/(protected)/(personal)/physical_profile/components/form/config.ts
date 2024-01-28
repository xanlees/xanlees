import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import { PhysicalProfileSchema } from "./validation";
import { useProfileContext } from "@src/app/(protected)/(personal)/context";

interface PersonalAddressFormValues {
  id?: number
}

interface FormConfigParams {
  setCurrentStep: ((step: number) => void) | undefined
  state?: {
    profileId: number
  },
  dispatch: React.Dispatch<any>
}
const step = 3;

export const useFormConfig = ({ setCurrentStep }: FormConfigParams) => {
  const { state } = useProfileContext();
  const { ...form } = useForm<PersonalAddressFormValues>({
    resolver: zodResolver(PhysicalProfileSchema),
    defaultValues: {
      profileId: state?.profileId,
    },
    refineCoreProps: {
      resource: "physical_profile",
      redirect: false,
      onMutationSuccess: (data) => {
        (setCurrentStep != null) && setCurrentStep(step);
      },
    },
    warnWhenUnsavedChanges: true,
  });
  return { form };
};
