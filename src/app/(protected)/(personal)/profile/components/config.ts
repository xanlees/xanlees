import { useForm } from "@refinedev/react-hook-form";
import { profileSchema } from "./validation";
import { useProfileContext } from "../../context";
import { zodResolver } from "@hookform/resolvers/zod";
import type * as z from "zod";
import { getErrorMessageNotification } from "@src/common/lib/errorNotification";
import { errorMessages } from "./constant";

const defaultMessage = "ບໍ່ສາມາດສ້າງຂໍ້ມູນສ່ວນບຸຄົນໄດ້";

export const useFormConfig = ({ setCurrentStep, }: { setCurrentStep?: ((step: number) => void) | undefined }) => {
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
        dispatch({ type: "setProfileId", payload: data?.data?.id ?? 0 });
        if (setCurrentStep) setCurrentStep(2);
      },
      errorNotification: (data: any) => {
        const responseData = data.response.data;
        return getErrorMessageNotification({ responseData, errorMessages, defaultMessage });
      },
      successNotification: false,
      redirect: false,
    },
    warnWhenUnsavedChanges: true,
  });
  return { form };
};
