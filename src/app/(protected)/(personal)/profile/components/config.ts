/* eslint-disable @typescript-eslint/naming-convention */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import { useProfileContext } from "../../context";
import { profileSchema } from "./validation";
import type { ProfileFormValues } from "../interface";
import type * as z from "zod";
interface FormConfigParams {
  setCurrentStep?: ((step: number) => void) | undefined
  setProfileID?: ((id: number) => void) | undefined
}

interface ErrorMapMessage {
  val: string
  message: string
}

const mapErrorMessage: ErrorMapMessage[] = [
  {
    val: "Exceeded maximum claims for this prize's rank.",
    message: "ລາງວັນຫມົດແລ້ວ",
  },
];
export const useFormConfig = ({
  setCurrentStep,
}: FormConfigParams) => {
  const { state, dispatch } = useProfileContext();
  const { ...form } = useForm<z.infer<typeof profileSchema>>({
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
        dispatch({ type: "setProfileId", payload: data?.data?.id ?? 0});
        (setCurrentStep != null) && setCurrentStep(2);
      },
      errorNotification: (data: any) => {
        console.log(data);
        console.log(data.response.data);
        let errorName: string = data.response.data?.error || "";
        const errorMap = mapErrorMessage.find((e) => e.val === errorName);
        if (errorMap != null) {
          errorName = errorMap.message;
        } else {
          errorName = "Error API";
        }
        return { message: errorName, description: "", type: "error" };
      },
      redirect: false,
    },
    warnWhenUnsavedChanges: true,
  });
  return { form };
};
