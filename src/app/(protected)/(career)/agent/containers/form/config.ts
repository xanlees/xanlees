/* eslint-disable @typescript-eslint/naming-convention */
import { useForm } from "@refinedev/react-hook-form";
import { profileSchema } from "./validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { getErrorMessageNotification } from "@src/common/lib/errorNotification";
import { errorMessages } from "./constant";
import { useProfileContext } from "@src/app/(protected)/(personal)";

const defaultMessage = "ບໍ່ສາມາດສ້າງຂໍ້ມູນສ່ວນບຸຄົນໄດ້";
export interface ProfileFormValues {
  id?: number
}
interface IMessages {
  response: {
    data: Record<string, any>
  }
}

export const useFormConfig = () => {
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
