import { type Dispatch, type SetStateAction, useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { type IUserProfile } from "@personal";
import { useCustomMutation } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { type ErrorMapMessage, FormMultipart, type IMessages } from "@src/common/interface";
import { getErrorMessageNotification } from "@src/common/lib/errorNotification";

import { useProfileContext } from "../../..";
import { profileSchema } from "./profileSchema";

const defaultMessage = "ບໍ່ສາມາດສ້າງຂໍ້ມູນສ່ວນບຸຄົນໄດ້";

export const useProfileForm = ({ createUserProfile, type, user, isRequireImage = false }: { createUserProfile?: boolean, type: string, user: number, isRequireImage?: boolean }) => {
  const { state, dispatch } = useProfileContext();
  const [profile, setProfile] = useState<number>(0);
  const [shouldCreateProfile, setShouldCreateProfile] = useState(false);
  const { ...form } = useForm<{ id?: number }>({
    resolver: zodResolver(profileSchema({ isRequireImage })),
    defaultValues: { fullname: "", nickname: "", phoneNumber: "", gender: "", birthday: "", maritalStatus: "", typeOfUniqueNumber: "", uniqueNumber: [{ uniqueNumber: undefined }], type, captcha: "" },
    refineCoreProps: {
      resource: "profile",
      meta: FormMultipart,
      onMutationSuccess: (data) => {
        dispatch({ type: "setProfileId", payload: data?.data?.id ?? 0 });
        setProfile(data?.data?.id ?? 0);
        if (createUserProfile) {
          setShouldCreateProfile(true);
        }
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
  if (createUserProfile) {
    useCreateUserProfile({ profile, user, shouldCreateProfile, setShouldCreateProfile });
  }
  return { form, state };
};

const errorMessages: ErrorMapMessage[] = [
  { val: "Profile with this fullname already exists.", message: "ຊື່ຂອງທ່ານມີໃນລະບົບແລ້ວ" },
  { val: "Profile with this phone number already exists.", message: "ເບີໂທນີ້ມີໃນລະບົບແລ້ວ" },
];

export interface CreateUserProfileProps {
  user: number
  profile: number
  shouldCreateProfile: boolean
  setShouldCreateProfile: Dispatch<SetStateAction<boolean>>
}

const useCreateUserProfile = ({ user, profile, shouldCreateProfile, setShouldCreateProfile }: CreateUserProfileProps) => {
  const { mutate } = useCustomMutation<IUserProfile>();
  useEffect(() => {
    if (user && shouldCreateProfile) {
      mutate({
        url: "profile/user-profile",
        method: "post",
        values: {
          user,
          profile,
        },
      });
      setShouldCreateProfile(false);
    }
  }, [mutate, user, profile, shouldCreateProfile, setShouldCreateProfile]);
};

