import { useCustomMutation } from "@refinedev/core";
import { useEffect, useState } from "react";
import { useForm } from "@refinedev/react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type CreateUserProfileProps, type UserProfile } from "../interface/interface";
import { type IMessages } from "@src/common/interface";
import { getErrorMessageNotification } from "@src/common/lib/errorNotification";
import { errorMessages, userSchema, userSchemaEdit } from "../userSchema";
import { useRouter } from "next/navigation";

export const useUserForm = (profile: number, navigates: string) => {
  const idEdit = profile <= 0;
  const router = useRouter();
  const [user, setUser] = useState<number>(0);
  const [shouldCreateProfile, setShouldCreateProfile] = useState(false);
  const form = useForm<{ id: number }>({
    resolver: zodResolver(idEdit ? userSchemaEdit : userSchema),
    defaultValues: { username: "", isActive: true, password: "", confirmPassword: "", groups: "" },
    refineCoreProps: {
      resource: "user",
      redirect: false,
      onMutationSuccess: (data) => {
        if (navigates === "profile") {
          setUser(data.data.id ?? 0);
        }
        setShouldCreateProfile(true);
        router.back();
      },
      errorNotification: (data: any) => {
        const responseData = (data as IMessages)?.response?.data;
        return getErrorMessageNotification({ responseData, errorMessages, defaultMessage: "ບໍ່ສາມາດສ້າງບັນຊີໃໝ່ໄດ້" });
      },
      successNotification: () => {
        return { message: "User account created successfully", type: "success", description: "" };
      },
    },
    warnWhenUnsavedChanges: true,
  });
  if (navigates === "profile") {
    useCreateUserProfile({ user, profile, shouldCreateProfile, setShouldCreateProfile });
  }
  return { form };
};

const useCreateUserProfile = ({ user, profile, shouldCreateProfile, setShouldCreateProfile }: CreateUserProfileProps) => {
  const { mutate } = useCustomMutation<UserProfile>();
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

