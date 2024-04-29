import { useForm } from "@refinedev/react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getErrorMessageNotification } from "@src/common/lib/errorNotification";
import { useProfileContext } from "../../..";
import { FormMultipart, type IMessages, type ErrorMapMessage } from "@src/common/interface";
import { profileSchema } from "./profileSchema";
const defaultMessage = "ບໍ່ສາມາດສ້າງຂໍ້ມູນສ່ວນບຸຄົນໄດ້";

export const useProfileForm = (type: string) => {
  const { state, dispatch } = useProfileContext();
  const { ...form } = useForm<{ id?: number }>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullname: "",
      nickname: "",
      phoneNumber: "",
      gender: "",
      birthday: "",
      maritalStatus: "",
      typeOfUniqueNumber: "IDENTIFY",
      uniqueNumber: [{ uniqueNumber: undefined }],
      type,
      captcha: "",
    },
    refineCoreProps: {
      resource: "profile",
      meta: FormMultipart,
      onMutationSuccess: (data) => {
        dispatch({ type: "setProfileId", payload: data?.data?.id ?? 0 });
      },
      successNotification: () => {
        return { message: "ສ້າງຂໍ້ມູນສ່ວນບຸກຄົນ", type: "success" };
      },
      errorNotification: (data: any) => {
        const responseData = (data as IMessages).response.data;
        return getErrorMessageNotification({ responseData, errorMessages, defaultMessage });
      },
      redirect: false,
    },
    warnWhenUnsavedChanges: true,
  });
  return { form, state };
};
const errorMessages: ErrorMapMessage[] = [
  { val: "Profile with this fullname already exists.", message: "ຊື່ຂອງທ່ານມີໃນລະບົບແລ້ວ" },
  { val: "Profile with this phone number already exists.", message: "ເບີໂທນີ້ມີໃນລະບົບແລ້ວ" },
];

