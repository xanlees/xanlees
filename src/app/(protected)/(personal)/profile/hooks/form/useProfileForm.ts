/* eslint-disable @typescript-eslint/naming-convention */
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "@refinedev/react-hook-form";
import { getErrorMessageNotification } from "@src/common/lib/errorNotification";

import { useProfileContext } from "../../../context";
import { errorMessages } from "../../containers/form/constant";
import { profileSchema } from "../../containers/form/validation";

const defaultMessage = "ບໍ່ສາມາດສ້າງຂໍ້ມູນສ່ວນບຸຄົນໄດ້";
export interface ProfileFormValues {
  id?: number
}
interface IMessages {
  response: {
    data: Record<string, any>
  }
}

export const useFormConfig = ({ setCurrentStep }: { setCurrentStep?: ((step: number) => void) | undefined }) => {
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
        dispatch({ type: "setProfileId", payload: data?.data?.id ?? 0 });
        (setCurrentStep != null) && setCurrentStep(2);
      },
      errorNotification: (data: any) => {
        const responseData = (data as IMessages).response.data;
        return getErrorMessageNotification({ responseData, errorMessages, defaultMessage });
      },
      successNotification: false,
      redirect: false,
    },
    warnWhenUnsavedChanges: true,
  });
  return { form };
};
