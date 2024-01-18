import { zodResolver } from "@hookform/resolvers/zod";
import { type RedirectAction } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { applicationSchema } from "./validation";
import { useApplicationContext } from "../../../context/context";
import type { IApplication } from "../../interface";

const step = 4;
export const useFormConfig = (redirect: RedirectAction, setCurrentStep: any) => {
  const { state, dispatch } = useApplicationContext();
  const { ...form } = useForm<IApplication>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      profileId: state.profileId,
    },
    refineCoreProps: {
      resource: "application",
      redirect: false,
      onMutationSuccess: (data) => {
        dispatch({ type: "setApplicationId", payload: data?.data?.id ?? 0 });
        setCurrentStep(step);
      },
    },
    warnWhenUnsavedChanges: true,
  });
  return { form };
};
