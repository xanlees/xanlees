import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import { PhysicalProfileSchema } from "./validation";
import { useProfileContext } from "@src/app/(protected)/(personal)/context";
import { useApplicationContext } from "@src/app/(protected)/(hr)/application/context";
import { type IFormConfig } from "@src/common/interface";
import { useEffect, useRef } from "react";

interface PersonalAddressFormValues {
  id?: number
}

interface FormConfigParams {
  setCurrentStep: ((step: number) => void) | undefined
}
const step = 3;

export const useFormConfig = ({ setCurrentStep }: FormConfigParams) => {
  const { state } = useProfileContext();
  const { state: stateApplication, dispatch } = useApplicationContext();
  const profile = state.profileId ?? 0;
  const { ...form } = useForm<PersonalAddressFormValues>({
    resolver: zodResolver(PhysicalProfileSchema),
    defaultValues: {
      profileId: state?.profileId,
    },
    refineCoreProps: {
      resource: "physical_profile",
      redirect: false,
      onMutationSuccess: (data) => {
        dispatch({ type: "setPhysicalProfileId", payload: data?.data?.id ?? 0 });
        (setCurrentStep != null) && setCurrentStep(step);
      },
    },
    warnWhenUnsavedChanges: true,
  });
  useUpdateDefaultValues(form, profile);
  return { form, state: stateApplication };
};

const useUpdateDefaultValues = (form: IFormConfig, profile: number) => {
  const profileRef = useRef(profile);
  useEffect(() => {
    if (profileRef.current !== profile) {
      form.setValue?.("profileId", profile);
      profileRef.current = profile;
    }
  }, [profile]);
};
