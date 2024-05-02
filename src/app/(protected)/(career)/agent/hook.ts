import { useForm } from "@refinedev/react-hook-form";
import { profileSchema } from "./containers/form/profileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { getErrorMessageNotification } from "@src/common/lib/errorNotification";
import { useProfileContext } from "@personal";
import { type ErrorMapMessage, FormMultipart, type IMessages } from "@src/common/interface";

const defaultMessage = "";
export const useFormAgent = () => {
  const { state, dispatch } = useProfileContext();
  const { ...form } = useForm<{ id?: number }>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
    defaultValues: {
      fullname: "",
      nickname: "",
      phoneNumber: "",
      gender: "MALE",
      type: "AGENT",
      typeOfUniqueNumber: "MACHINE",
    },
    refineCoreProps: {
      resource: "profile",
      meta: FormMultipart,
      onMutationSuccess: (data) => {
        dispatch({ type: "setProfileId", payload: data?.data?.id ?? 0 });
      },
      errorNotification: (data: any) => {
        const responseData = (data as IMessages)?.response?.data;
        return getErrorMessageNotification({ responseData, errorMessages, defaultMessage });
      },
      successNotification: (data) => {
        return { message: "ສ້າງຂໍ້ມູນສ່ວນບຸກຄົນສໍາເລັດ", type: "success", description: "" };
      },
      redirect: false,
    },
    warnWhenUnsavedChanges: true,
  });
  return { form, state };
};

export const errorMessages: ErrorMapMessage[] = [
  {
    val: "Profile with this fullname already exists.",
    message: "ຊື່ຂອງທ່ານມີໃນລະບົບແລ້ວ",
  },
  {
    val: "Profile with this phone number already exists.",
    message: "ເບີໂທນີ້ມີໃນລະບົບແລ້ວ",
  },
];

