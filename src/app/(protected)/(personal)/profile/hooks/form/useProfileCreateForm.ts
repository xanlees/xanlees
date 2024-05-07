import { useForm } from "@refinedev/react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormMultipart } from "@src/common/interface";
import { profileSchema } from "./profileSchema";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { useUpdate } from "@refinedev/core";
import { useRouter } from "next/navigation";

export const useProfileCreateForm = ({ user, userProfile }: { user: number, userProfile: number }) => {
  const router = useRouter();
  const [profile, setProfile] = useState<number>(0);
  const [shouldCreateProfile, setShouldCreateProfile] = useState(false);
  const { ...form } = useForm<{ id?: number }>({
    resolver: zodResolver(profileSchema),
    defaultValues: { fullname: "", nickname: "", phoneNumber: "", gender: "", birthday: "", maritalStatus: "", typeOfUniqueNumber: "IDENTIFY", uniqueNumber: [{ uniqueNumber: undefined }], type: "EMPLOYEE", captcha: "" },
    refineCoreProps: {
      resource: "profile",
      action: "create",
      meta: FormMultipart,
      onMutationSuccess: (data) => {
        setProfile(data?.data?.id ?? 0);
        setShouldCreateProfile(true);
        router.back();
      },
      successNotification: () => {
        return { message: "ສ້າງຂໍ້ມູນສ່ວນບຸກຄົນ", type: "success" };
      },
      redirect: false,
    },
    warnWhenUnsavedChanges: true,
  });
  useCreateUserProfile({ profile, user, userProfile, shouldCreateProfile, setShouldCreateProfile });
  return { form };
};

export interface CreateUserProfileProps {
  user: number
  profile: number
  shouldCreateProfile: boolean
  userProfile: number
  setShouldCreateProfile: Dispatch<SetStateAction<boolean>>
}
const useCreateUserProfile = ({ user, profile, userProfile, shouldCreateProfile, setShouldCreateProfile }: CreateUserProfileProps) => {
  const { mutate } = useUpdate();
  useEffect(() => {
    if (user && shouldCreateProfile) {
      mutate({
        resource: "profile/user-profile",
        id: userProfile,
        values: {
          user,
          profile,
        },
      });
      setShouldCreateProfile(false);
    }
  }, [mutate, user, profile, shouldCreateProfile, setShouldCreateProfile]);
};

